export function getSpreadChoices() {
    const spreads = localStorage.getItem('chosenSpreads');
    return (spreads) ? JSON.parse(spreads) : [0, 0, 0];
}