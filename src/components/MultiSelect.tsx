import { useEffect, useRef } from "react";
import useMultiSelect from "../hooks/useMultiSelect";
enum Options {
  Art = "🎨",
  Education = "📚",
  Sport = "🏀",
  Games = "🎮",
  Health = "🏥",
  Science = "🔬",
}

const MultiSelect = () => {
  const {
    selectedOptions,
    isOpen,
    inputValue,
    handleOptionClick,
    handleInputChange,
    handleKeyDown,
    toggleDropdown,
  } = useMultiSelect();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      toggleDropdown();
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      handleOutsideClick(event);
    };
  
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="multiselect-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={toggleDropdown}
        placeholder="Select"
      />
      {isOpen && (
        <div className="dropdown-options" ref={dropdownRef}>
          {Object.keys(Options).map((optionKey) => {
            const option = Options[optionKey as keyof typeof Options];
            return (
              <div
                key={optionKey}
                onClick={() => handleOptionClick(optionKey)}
                className={
                  selectedOptions.includes(optionKey)
                    ? "option-item selected"
                    : "option-item"
                }
              >
                <span role="img" aria-label="Emoji">
                  {option}
                </span>{" "}
                {optionKey}{" "}
                {selectedOptions.includes(optionKey) && (
                  <span className="check-icon">&#10003;</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
