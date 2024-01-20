import { useState } from 'react';

const useMultiSelect = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleOptionClick = (option: string) => {
        // Clear the previous selection
        setSelectedOptions([option]);
        setInputValue(option); // Set the selected option as the input value
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setSelectedOptions([inputValue]);
            setInputValue('');
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return {
        selectedOptions,
        isOpen,
        inputValue,
        handleOptionClick,
        handleInputChange,
        handleKeyDown,
        toggleDropdown,
    };
};

export default useMultiSelect;
