
export const formattDate = (date : Date) => date.toLocaleDateString('en-us', {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});