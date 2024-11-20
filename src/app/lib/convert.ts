export function dateToFormatted(date: Date) {
    // Extract the individual components of the date
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed (0 = January, 11 = December)
    const day = String(date.getDate()).padStart(2, '0'); // Pad start to ensure single digit number use two characters
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes} UTC`
}