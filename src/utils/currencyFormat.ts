
export const currencyFormat = (quantity: number) => {
    if(!quantity || isNaN(+quantity)) return  
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(quantity);
}