/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useState } from 'react';

function useLocalStorage(initialKey = '', initialValue = '') {

    const [key, setKey] = useState(initialKey)

    // Function to get the stored value from localStorage.
    const getStoredValue = () => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initialValue
    };

    // Retrieve the stored value using the getStoredValue function.
    const storedValue = getStoredValue()

    // Create state to hold the current value.
    const [value, setValue] = useState(storedValue)

    // Function to set a new value in localStorage and update the state.
    const setStoredValue = (newValue) => {
        // Update the state.
        setValue(newValue);
        // Store the new value in localStorage.
        localStorage.setItem(key, JSON.stringify(newValue))
    };

    // Function to remove the item from localStorage and reset the state to the initial value.
    const removeStoredValue = () => {
        // Remove the item from localStorage.
        localStorage.removeItem(key)
        // Reset the state to the initial value.
        setValue(initialValue)
    };

    // Function to get all values in localStorage
    const getAllStoredValues = () => {
        const values = [];

        for (let i = 0; i < localStorage.length; i++) {
            const localStorageKey = localStorage.key(i)
            if (localStorageKey !== '') {
                const localStorageValue = localStorage.getItem(localStorageKey)
                values.push({ key: localStorageKey, value: JSON.parse(localStorageValue) })
            }
        }

        return values
    }

    // Function to set value for custom key
    const setValueForKey = (customKey, customValue) => {
        localStorage.setItem(customKey, JSON.stringify(customValue))
    }

    // Function to get value for custom key
    const getValueForKey = (customKey) => {
        const storedValue = localStorage.getItem(customKey)
        return storedValue ? JSON.parse(storedValue) : ''
    }

    // Function to delete given key
    const deleteKey = (customKey) => {
        localStorage.removeItem(customKey)
    }

    return [key, value, setKey, setStoredValue, getStoredValue, removeStoredValue, getAllStoredValues, setValueForKey, getValueForKey, deleteKey]
}

export default useLocalStorage
