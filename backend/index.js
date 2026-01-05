require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { google } = require("googleapis");

const User = require("./models/User");
const Event = require("./models/Event");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { auth } = require("./middlewares/auth");
const Booking = require("./models/Booking");
const generateSlots = require("./helper/generateSlots");
const catchAsync = require("./utils/catchAsync");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { DateTime } = require("luxon");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { getSearchQuery, getPaginationOptions, formatPagedResponse } = require("./utils/queryHelper");

const app = express();

// Enable CORS
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        // In development, you might want to allow all localhost origins
        const allowedOrigins = [/^http:\/\/localhost:\d+$/];
        const isAllowed = allowedOrigins.some(pattern =>
            typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to all requests
app.use(limiter);

app.use(express.json());

// ------------------ MongoDB ------------------
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// ------------------ Google OAuth ------------------
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
];

// ------------------ USERS ------------------

// Register
app.post("/auth/register", catchAsync(async (req, res) => {
    const { fullName, email, password, role } = req.body;

    if (!email || !password || !fullName) {
        const error = new Error("Email, password and fullName required");
        error.statusCode = 400;
        throw error;
    }

    const exists = await User.findOne({ email });
    if (exists) {
        const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.create({
        fullName,
        email,
        password,
        role: role === "admin" ? "admin" : "user" // prevent random admin
    });

    res.json({ message: "User registered successfully", user });
}));

// Login
app.post("/auth/login", catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Email and password required");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.json({ user, token });
}));

// Get current user profile
app.get("/auth/me", auth, catchAsync(async (req, res) => {
    // req.user is already populated by the auth middleware
    res.json(req.user);
}));

app.get("/owner/events/:id/bookings", auth, catchAsync(async (req, res) => {
    const bookings = await Booking.find({ event: req.params.id })
        .populate("user", "email fullName")
        .populate("event")

    res.json(bookings);
}));

// List users
app.get("/users", auth, catchAsync(async (req, res) => {
    const { search, page, limit } = req.query;
    const query = {};

    if (search) {
        query.$or = getSearchQuery(search, ["fullName", "email"]);
    }

    const { skip, limit: limitNum, page: pageNum } = getPaginationOptions(page, limit);

    const [users, total] = await Promise.all([
        User.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 }),
        User.countDocuments(query)
    ]);

    res.json(formatPagedResponse(users, total, pageNum, limitNum));
}));

app.get("/profile/:slug", async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug })
        .select("fullName slug avatar cover bio location createdAt");

    if (!user) {
        return res.status(404).json({ error: "Profile not found" });
    }

    res.json(user);
});

// Check googleConnected status
app.get("/users/:id/google-status", catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    res.json({ googleConnected: user.googleConnected });
}));

// ------------------ GOOGLE AUTH ------------------

// Step 1: user clicks this to activate Google
app.get("/auth/google", catchAsync(async (req, res) => {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("Invalid user");
        error.statusCode = 400;
        throw error;
    }

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent", // ensures refresh token is returned
        scope: SCOPES,
        state: userId,
        redirect_uri: process.env.REDIRECT_URI
    });

    console.log("Using REDIRECT_URI:", process.env.REDIRECT_URI);
    console.log("Generated Auth URL:", url);
    res.redirect(url);
}));

// Step 2: OAuth callback
app.get("/oauth2callback", catchAsync(async (req, res) => {
    const { code, state: userId } = req.query;

    if (!code || !userId) {
        const error = new Error("Missing code or userId");
        error.statusCode = 400;
        throw error;
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    console.log("User data:", data);

    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
    }


    const googleDeatails = {
        googleId: data.id,
        email: data.email,
        name: data.name,
        image: data.picture
    }
    user.googleInfo = googleDeatails;
    if (tokens.refresh_token) {
        user.refreshToken = tokens.refresh_token; // store refresh token only first time
    }
    user.googleConnected = true;
    await user.save();

    res.send(`
    <html>
      <body style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
        <h2 style="color: #16a34a;">Google Connected ✅</h2>
        <p>User ID: ${user._id}</p>
        <p>This window will close automatically...</p>
        <script>
            if (window.opener) {
                window.opener.postMessage("GOOGLE_CONNECTED", "*");
                setTimeout(() => window.close(), 1500);
            }
        </script>
      </body>
    </html>
  `);
}));
// ------------------ EVENTS ------------------
app.get("/events/:id/availability", catchAsync(async (req, res) => {
    const { date } = req.query; // "2025-02-20"
    const event = await Event.findById(req.params.id);
    if (!event) {
        const error = new Error("Event not found");
        error.statusCode = 404;
        throw error;
    }

    const dayName = new Date(date)
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

    const dayAvailability = event.availability.find(a => a.day === dayName);
    if (!dayAvailability) return res.json([]);

    const slots = generateSlots(
        dayAvailability.start,
        dayAvailability.end,
        event.slotDuration
    );

    const bookedSlots = await Booking.find({
        event: event._id,
        date
    });

    const availableSlots = slots.filter(slot =>
        !bookedSlots.some(b => b.startTime === slot.start)
    );

    res.json(availableSlots);
}));

app.post("/events", auth, catchAsync(async (req, res) => {
    const { userId, title, description, availability, slotDuration, service,durationType, timezone } = req.body;

    if (!userId || !title) {
        const error = new Error("userId and title required");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(userId);
    if (!user || !user.googleConnected || !user.refreshToken) {
        const error = new Error("Google account not connected");
        error.statusCode = 400;
        throw error;
    }

    // Set refresh token before API call
    oauth2Client.setCredentials({ refresh_token: user.refreshToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
        summary: title,
        description,
        availability,
        slotDuration,
        durationType,
        start: { dateTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), timeZone: "UTC" },
        end: { dateTime: new Date(Date.now() + 35 * 60 * 1000).toISOString(), timeZone: "UTC" },
        conferenceData: {
            createRequest: {
                requestId: Math.random().toString(36).substring(2),
                conferenceSolutionKey: { type: "hangoutsMeet" }
            }
        }
    };

    const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1
    });

    const savedEvent = await Event.create({
        title,
        description,
        availability,
        slotDuration,
        durationType,
        service,
        timezone: timezone || "UTC",
        meetLink: response.data.hangoutLink,
        owner: user._id
    });

    res.json(savedEvent);
}));

app.get(
    "/events",
    auth,
    catchAsync(async (req, res) => {
        const { search, page, limit } = req.query;
        console.log("req", req.user)
        const query = {
            owner: req.user._id,
        };


        if (search) {
            query.$or = getSearchQuery(search, ["title", "description"]);
        }

        const { skip, limit: limitNum, page: pageNum } = getPaginationOptions(page, limit);

        const [events, total] = await Promise.all([
            Event.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 }),
            Event.countDocuments(query)
        ]);

        res.json(formatPagedResponse(events, total, pageNum, limitNum));
    })
);

app.get("/events/:id", auth, catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        const error = new Error("Event not found");
        error.statusCode = 404;
        throw error;
    }
    res.json(event);
}));

app.post("/events/:id/book", auth, catchAsync(async (req, res) => {
    const { date, startTime, endTime } = req.body;

    // 1. Find the event and populate the owner to get their Google credentials
    const event = await Event.findById(req.params.id).populate("owner");
    if (!event) {
        const error = new Error("Event not found");
        error.statusCode = 404;
        throw error;
    }

    const owner = event.owner;
    if (!owner || !owner.googleConnected || !owner.refreshToken) {
        const error = new Error("Event owner has not connected Google Calendar");
        error.statusCode = 400;
        throw error;
    }

    // 2. Create the Google Calendar event
    oauth2Client.setCredentials({ refresh_token: owner.refreshToken });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Use Luxon to handle timezones correctly
    const eventTimezone = event.timezone || "UTC";

    // Create DateTime object in the event's timezone, then convert to ISO for Google
    const startDT = DateTime.fromFormat(`${date} ${startTime}`, "yyyy-MM-dd HH:mm", { zone: eventTimezone });
    const endDT = DateTime.fromFormat(`${date} ${endTime}`, "yyyy-MM-dd HH:mm", { zone: eventTimezone });

    if (!startDT.isValid || !endDT.isValid) {
        const error = new Error("Invalid date or time format");
        error.statusCode = 400;
        throw error;
    }

    const gCalEvent = {
        summary: `Booking: ${event.title} with ${req.user.fullName}`,
        description: `Scheduled via scheduling app.\nGuest: ${req.user.fullName} (${req.user.email})\n\n${event.description || ""}`,
        start: { dateTime: startDT.toISO(), timeZone: eventTimezone },
        end: { dateTime: endDT.toISO(), timeZone: eventTimezone },
        location: event.meetLink,
        attendees: [
            { email: owner.email },
            { email: req.user.email }
        ],
        reminders: {
            useDefault: true
        }
    };

    const gResponse = await calendar.events.insert({
        calendarId: "primary",
        resource: gCalEvent
    });

    // 3. Save the booking in our database
    const booking = await Booking.create({
        event: req.params.id,
        user: req.user._id,
        date,
        startTime,
        endTime,
        googleCalendarEventId: gResponse.data.id
    });

    res.json({
        message: "Booked successfully and added to Google Calendar",
        booking,
        meetLink: event.meetLink
    });
}));
// Subscribe to event (get Meet link)
app.get("/events/:id/subscribe", catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        const error = new Error("Event not found");
        error.statusCode = 404;
        throw error;
    }

    res.json({ meetLink: event.meetLink });
}));

app.get("/profile/:slug/events", async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) return res.status(404).json({ error: "User not found" });

    const events = await Event.find({ owner: user._id })
        .select("title description availability slotDuration createdAt");

    res.json(events);
});

app.get("/profile/:slug/full", async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug })
        .select("fullName slug avatar cover bio location");

    if (!user) return res.status(404).json({ error: "Profile not found" });

    const events = await Event.find({ owner: user._id })
        .select("title description availability slotDuration");

    res.json({
        profile: user,
        events
    });
});

// ------------------ SERVER ------------------
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
