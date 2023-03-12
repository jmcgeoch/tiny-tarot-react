export const getCurrentDate = () => Date.now().toString();

export const prettyDateTimeNow = () => {
    const now = new Date();
    const monthName = new Intl.DateTimeFormat("en-US", { month: 'long' }).format(now);
    return (monthName + ' ' + now.getDate() + ' ' + now.getFullYear());
}

export const parseEntryDate = (rawDate: string) => {
    const humanDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
                            .format(parseInt(rawDate));
    return humanDate.replace(',', '');
}