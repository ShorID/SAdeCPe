const read = (key, defaultValue = "") => {
  if (!(typeof window !== "undefined")) return defaultValue;
  return sessionStorage.getItem(key) || defaultValue;
};

const write = (key, value, defaultValue = "") => {
  if (!(typeof window !== "undefined")) return defaultValue;
  sessionStorage.setItem(key, value || defaultValue);
};

const clear = () => sessionStorage.clear();

const deleteItem = (key) => sessionStorage.removeItem(key);

const sessionStorageManagment = { read, write, clear, deleteItem };

export default sessionStorageManagment;
