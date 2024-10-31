export const truncateText = (maxLength: number, text: string) => {
    if (text.length > maxLength) return text.substring(0, maxLength) + ' ...';
    return text;
};