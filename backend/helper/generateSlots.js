function generateSlots(start, end, duration) {
    const slots = [];
    let [h, m] = start.split(":").map(Number);
    let current = h * 60 + m;

    const [eh, em] = end.split(":").map(Number);
    const endMinutes = eh * 60 + em;

    while (current + duration <= endMinutes) {
        const startH = String(Math.floor(current / 60)).padStart(2, "0");
        const startM = String(current % 60).padStart(2, "0");

        const endMin = current + duration;
        const endH = String(Math.floor(endMin / 60)).padStart(2, "0");
        const endM = String(endMin % 60).padStart(2, "0");

        slots.push({
            start: `${startH}:${startM}`,
            end: `${endH}:${endM}`
        });

        current += duration;
    }

    return slots;
}

module.exports = generateSlots;
