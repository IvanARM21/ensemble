
export const getLastSixMonthsData = (data: {
    month: string;
    value: number;
}[]) => {
    const currentMonthIndex = new Date().getMonth();

    // Calculate the start index for the last 6 months
    const startIndex = currentMonthIndex - 5;

    // If the month is different year
    if (startIndex < 0) {
        const previousYearData = data.slice(startIndex + 12);
        const currentYearData = data.slice(0, currentMonthIndex + 1);
        return [...previousYearData, ...currentYearData];
    } else {
        return data.slice(startIndex, currentMonthIndex + 1);
    }
}

export const getCurrentMonth = () => new Date().getMonth();

export const getStartMonth = () => {
    const currentMonth = getCurrentMonth();
    const startMonth = currentMonth - 5;
    
    return startMonth < 0 ? startMonth + 12 : startMonth;
};

export const getCurrentYear = () => new Date().getFullYear();

export const getStartYear = () => {
    const currentYear = getCurrentYear();
    const startMonth = getCurrentMonth()-5;

    return startMonth < 0 ? currentYear-1 : false;
}

export const compareToPreviousMonth = (previousValue : number, currentValue : number) => (((currentValue - previousValue) / previousValue) * 100).toFixed(2);