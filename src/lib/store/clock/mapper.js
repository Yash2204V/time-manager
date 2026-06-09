const timeFormatter = new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
});

export function formatRealTime(dateObject) {
    if (!(dateObject instanceof Date)) {
        return "";
    }
    return timeFormatter.format(dateObject);
}