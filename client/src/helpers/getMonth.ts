
const m: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getMonth = (num: number) => {
    return m[num - 1];
}