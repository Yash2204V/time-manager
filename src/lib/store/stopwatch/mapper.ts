const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;
const SECONDS_IN_AN_HOUR = SECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR;

function padWithZero(number) {
    return String(number).padStart(2, '0');
}

export function formatSecondsToTime(totalSeconds) {
    if (typeof totalSeconds != 'number' || totalSeconds < 0) return "00:00:00";

    const hours = Math.floor(totalSeconds / SECONDS_IN_AN_HOUR);
    const minutes = Math.floor((totalSeconds % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE);
    const seconds = totalSeconds % SECONDS_IN_A_MINUTE;

    const formattedHours = padWithZero(hours);
    const formattedMinutes = padWithZero(minutes);
    const formattedSeconds = padWithZero(seconds);

    if(hours <= 0) return `${formattedMinutes}:${formattedSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
