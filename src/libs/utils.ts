export const currencyFormatter = (number: number, currency: string = 'USD') => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    })

    return formatter.format(number);
}