import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ccc",
    boxShadow: "none",
    height: "2.5rem",
    "&:hover": {
      border: "1px solid #aaa"
    }
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    marginTop: "0.25rem"
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
    color: "black",
    "&:active": {
      backgroundColor: "#d0d0d0"
    }
  })
};

interface CustomDropdownProps {
  value: { label: string; value: string | number } | string | null;
  name: string;
  onChange: (value: any) => void;
  optionsList: { label: string; value: string | number }[];
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  noOptionText?: string;
  multipleFields?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  onChange,
  value,
  name,
  optionsList,
  isDisabled = false,
  label,
  placeholder = "Select an option",
  noOptionText = "",
  multipleFields
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectChange = (selectedOption: any) => {
    onChange({ target: { name, value: selectedOption?.value } });
  };

  return (
    <div className="relative w-full h-full">
      <div
        className={`relative w-full h-full rounded bg-white ${
          isFocused || value ? "border-gray-500" : "border-gray-300"
        }`}
      >
        <Select
          isMulti={multipleFields}
          name={name}
          value={optionsList.find(option => option?.value === value)}
          onChange={handleSelectChange}
          options={optionsList}
          isDisabled={isDisabled}
          className="w-full h-full"
          placeholder={placeholder}
          isClearable
          styles={customStyles}
          noOptionsMessage={() => noOptionText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {label && (
          <label
            className={`absolute left-3 transition-all text-sm pointer-events-none ${
              isFocused || value
                ? "top-1 text-xs text-[#344054]"
                : "top-3.5 text-[#98A2B3]"
            }`}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
