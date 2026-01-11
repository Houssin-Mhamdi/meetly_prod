function generateSlots(start, end, duration, startPause, endPause, disabledSlots = []) {
    const slots = [];
    let [h, m] = start.split(":").map(Number);
    let current = h * 60 + m;

    const [eh, em] = end.split(":").map(Number);
    const endMinutes = eh * 60 + em;

    let pauseStartMinutes = null;
    let pauseEndMinutes = null;

    if (startPause && endPause) {
        const [psH, psM] = startPause.split(":").map(Number);
        const [peH, peM] = endPause.split(":").map(Number);
        pauseStartMinutes = psH * 60 + psM;
        pauseEndMinutes = peH * 60 + peM;
    }

    const safeDuration = duration > 0 ? duration : 30;

    while (current + safeDuration <= endMinutes) {
        const startH = String(Math.floor(current / 60)).padStart(2, "0");
        const startM = String(current % 60).padStart(2, "0");
        const timeStr = `${startH}:${startM}`;

        // Skip if this slot falls within the pause OR is in disabledSlots
        let shouldSkip = false;
        if (pauseStartMinutes !== null && pauseEndMinutes !== null) {
            if (current >= pauseStartMinutes && current < pauseEndMinutes) {
                shouldSkip = true;
            }
        }

        if (!shouldSkip && disabledSlots && disabledSlots.includes(timeStr)) {
            shouldSkip = true;
        }

        if (shouldSkip) {
            current += safeDuration;
            continue;
        }

        const endMin = current + safeDuration;
        const endH = String(Math.floor(endMin / 60)).padStart(2, "0");
        const endM = String(endMin % 60).padStart(2, "0");

        slots.push({
            start: timeStr,
            end: `${endH}:${endM}`
        });

        current += safeDuration;
    }

    return slots;
}

module.exports = generateSlots;
