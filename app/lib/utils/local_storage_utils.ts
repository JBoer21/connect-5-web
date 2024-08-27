import { toast } from "~/components/ui/use-toast";

/**
 * Helper object for safe localStorage operations
 */
export const safeLocalStorage = {
  /**
   * Safely retrieves an item from localStorage
   * @param {string} key - The key of the item to retrieve
   * @returns {string | null} The value of the item, or null if not found or on error
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  },

  /**
   * Safely sets an item in localStorage
   * @param {string} key - The key of the item to set
   * @param {string} value - The value to set
   */
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
      // Remove the toast notification for localStorage errors
    }
  },

  /**
   * Safely clears all items from localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  },
};

/**
 * Retrieves a stored item from localStorage and parses it
 * @param {string} key - The key of the item to retrieve
 * @param {T} defaultValue - The default value to return if the item is not found
 * @returns {T} The parsed value of the item, or the default value if not found or on error
 */
export const getStoredItem = <T>(key: string, defaultValue: T): T => {
  const storedValue = safeLocalStorage.getItem(key);
  if (storedValue === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedValue) as T;
  } catch (error) {
    console.error(`Error parsing stored value for ${key}: ${error}`);
    return defaultValue;
  }
};

/**
 * Stores an item in localStorage after stringifying it
 * @param {string} key - The key of the item to store
 * @param {T} value - The value to store
 */
export const setStoredItem = <T>(key: string, value: T): void => {
  safeLocalStorage.setItem(key, JSON.stringify(value));
};

/**
 * Clears all items from localStorage and shows a toast notification
 */
export const clearStorage = (): void => {
  safeLocalStorage.clear();
  // Consider if this toast is necessary for users
  // If you decide to keep it, use more user-friendly language
  toast({
    title: "Data Cleared",
    description: "All locally saved data has been removed.",
    variant: "default",
  });
};
