export const formatToHundredPlus = (num: number): string => {
    const roundedDown = Math.floor(num / 100) * 100;
    return `${roundedDown}+`;
};
