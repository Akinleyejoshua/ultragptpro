export const get = (key) => window?.localStorage.getItem(key);
export const save = (key, value) => window?.localStorage.setItem(key, value);