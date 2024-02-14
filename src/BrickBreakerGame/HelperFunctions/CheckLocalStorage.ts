export const checkLocalStorageForLevel = () => {
	const arrayFromLocalStorage = localStorage.getItem("exportedLevel");
	if (arrayFromLocalStorage) {
		const array = JSON.parse(arrayFromLocalStorage);
		return Array.isArray(array) && array.length > 0;
	} else {
		return false;
	}
};

export const checkLocalStorageForSettings = () => {
	const settingsFromLocalStorage = localStorage.getItem("brickSettings");
	if (settingsFromLocalStorage) {
		return true;
	} else {
		return false;
	}
};
