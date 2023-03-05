export function getSpreadChoices() {
    const spreads = localStorage.getItem('chosenSpreads');
    return (spreads) ? JSON.parse(spreads) : [0, 0, 0];
}

// check session for an item
export function getItemFromSession(item: string) {
    const storageItem = sessionStorage.getItem(item);
    if (storageItem === null || storageItem === undefined) {
        return '';
    } else {
        return JSON.parse(storageItem);
    }
}