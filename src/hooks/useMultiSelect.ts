import { useState } from "react";

const useMultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([
    "🎨 Art",
    "📚 Education",
    "🏀 Sport",
    "🎮 Games",
    "🏥 Health",
    "🔬 Science",
  ]);

  const handleOptionClick = (option: string) => {
    setSelectedOptions([option]);
    setInputValue(option);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputValue.trim() !== "" &&
      !options.includes(inputValue.trim())
    ) {
      const newOption = inputValue.trim();
      setOptions((prevOptions) => [...prevOptions, newOption]);
      setSelectedOptions([newOption]);
      setInputValue(newOption);
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
    options,
  };
};

export default useMultiSelect;
