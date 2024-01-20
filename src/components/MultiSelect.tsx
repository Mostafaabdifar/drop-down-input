import { useEffect, useRef, useCallback } from "react";
import useMultiSelect from "../hooks/useMultiSelect";

const MultiSelect = () => {
  const {
    selectedOptions,
    isOpen,
    inputValue,
    handleOptionClick,
    handleInputChange,
    handleKeyDown,
    toggleDropdown,
    options,
  } = useMultiSelect();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropdown();
      }
    },
    [isOpen, toggleDropdown]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const renderOptions = () => {
    return options.map((option) => (
      <div
        key={option}
        onClick={() => handleOptionClick(option)}
        className={`option-item ${
          selectedOptions.includes(option) ? "selected" : ""
        }`}
      >
        {option}{" "}
        {selectedOptions.includes(option) && (
          <span className="check-icon">&#10003;</span>
        )}
      </div>
    ));
  };

  return (
    <div className={`multiselect-container ${isOpen ? "open" : ""}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={toggleDropdown}
        placeholder="Select or type"
      />
      <div className="chevron">&#x2039;</div>
      {isOpen && (
        <div className="dropdown-options" ref={dropdownRef}>
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
