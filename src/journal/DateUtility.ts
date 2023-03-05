function prettyDateTimeNow() {
    const now = new Date();
    const monthName = new Intl.DateTimeFormat("en-US", { month: 'long' }).format(now);
    return (monthName + ' ' + now.getDate() + ' ' + now.getFullYear());
}

function parseJSONDate(rawDate: string) {
    return '';
}

export default prettyDateTimeNow;