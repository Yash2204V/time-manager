export function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const formattedM = String(m).padStart(2, '0');
    const formattedS = String(s).padStart(2, '0');

    if (h > 0) {
        return `${h}:${formattedM}:${formattedS}`;
    }
    return `${formattedM}:${formattedS}`;
}