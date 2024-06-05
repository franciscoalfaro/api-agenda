export const validateTimeFormat = (time) => {
    return /^\d{2}:\d{2}$/.test(time);
};