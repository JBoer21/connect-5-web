import { toast } from "~/components/ui/use-toast";
import Cookies from "js-cookie";

const storageType = {
  localStorage: "localStorage",
  cookies: "cookies",
};

function isLocalStorageAvailable() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
}

const preferredStorage = isLocalStorageAvailable()
  ? storageType.localStorage
  : storageType.cookies;

export function getItem<T>(
  key: string,
  defaultValue: T | null = null,
): T | null {
  try {
    if (preferredStorage === storageType.localStorage) {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } else {
      const item = Cookies.get(key);
      return item ? JSON.parse(item) : defaultValue;
    }
  } catch (error) {
    console.error(`Error reading from storage: ${error}`);
    return defaultValue;
  }
}

export function setItem(key: string, value: unknown) {
  try {
    const stringValue = JSON.stringify(value);
    if (preferredStorage === storageType.localStorage) {
      localStorage.setItem(key, stringValue);
    } else {
      Cookies.set(key, stringValue, { expires: 365 }); // Set cookie to expire in 1 year
    }
  } catch (error) {
    console.error(`Error writing to storage: ${error}`);
  }
}

export function removeItem(key: string) {
  try {
    if (preferredStorage === storageType.localStorage) {
      localStorage.removeItem(key);
    } else {
      Cookies.remove(key);
    }
  } catch (error) {
    console.error(`Error removing item from storage: ${error}`);
  }
}

export function clearStorage() {
  try {
    if (preferredStorage === storageType.localStorage) {
      localStorage.clear();
    } else {
      Object.keys(Cookies.get()).forEach((key) => Cookies.remove(key));
    }
    toast({
      title: "Data Cleared",
      description: "All saved data has been removed.",
      variant: "default",
    });
  } catch (error) {
    console.error(`Error clearing storage: ${error}`);
  }
}

// Keeping these for backwards compatibility
export const safeLocalStorage = {
  getItem: (key: string) => getItem(key),
  setItem: (key: string, value: string) => setItem(key, value),
  clear: clearStorage,
};

export const getStoredItem = getItem;
export const setStoredItem = setItem;
