'use strict';
export const saveData = (key, value) => {
  try {
    const savedStringifyValue = JSON.stringify(value);
    localStorage.setItem(key, savedStringifyValue);
  } catch (error) {
    console.error("Save data failed: ", error.message);
  }
};

export const loadData = key => {
  try {
    const loadedStringifyValue = localStorage.getItem(key);
    return loadedStringifyValue === null ? undefined : JSON.parse(loadedStringifyValue);
  } catch (error) {
    console.error("Load data failed: ", error.message);
  }
};

export const removeData = key => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Remove data failed: ", error.message)
    }
};