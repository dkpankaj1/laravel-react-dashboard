const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export {setLocalStorageItem,getLocalStorageItem}