import { toast } from "~/components/ui/use-toast";

// Helper function for safe localStorage operations
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
      // Remove the toast notification for localStorage errors
    }
  },
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  },
};

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

export const setStoredItem = <T>(key: string, value: T): void => {
  safeLocalStorage.setItem(key, JSON.stringify(value));
};

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
