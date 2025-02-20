import clsx from "clsx";
import { useState } from "react";

interface TextFieldProps {
  placeholder: string;
  value: string;
  name: string;
  type?: "text" | "email" | "tel";
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  isRequired?: boolean;
  inputValid?: boolean;
  additionalClassname?: string;
  inputClass?: string;
  emailInput?: boolean;
  leftIcon?: any;
}

const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  onChange = () => {},
  onBlur = () => {},
  value,
  label,
  placeholder,
  name,
  disabled = false,
  error,
  isRequired = false,
  inputValid,
  additionalClassname,
  inputClass,
  emailInput,
  leftIcon,
}) => {
  const [inputFocused, setInputFocued] = useState(false);

  return (
    <div
      className={`relative w-full h-[3.5rem] flex flex-col  ${additionalClassname}`}
    >
      <div
        className={clsx({
          "w-full h-full rounded-[0.5rem] flex items-center border bg-white py-[0.6rem] px-0":
            true,
          // "border-[#D0D5DD]": !inputFocused && !value,
          // "border-[#BBDFF2]": inputFocused || value,
        })}
        onMouseDown={() => setInputFocued(true)}
        onMouseOut={() => setInputFocued(false)}
      >
        {leftIcon && <div className="pl-2">{leftIcon}</div>}
        <input
          id={`grid-${name}`}
          className={clsx(
            "w-full bg-transparent outline-0 px-3 text-[0.875rem] font-normal pt-1.5 top-1 placeholder-transparent",
            inputClass
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={isRequired}
          autoComplete="off"
        />
        {/* {emailInput && (
          <div className="w-[3rem] h-full bg-transparent flex justify-center items-center">
            <Image src={auth_email_icon} alt="" className="cursor-pointer" />
          </div>
        )} */}
      </div>
      {label && (
        <label
          htmlFor={`grid-${name}`}
          className={clsx(
            "absolute left-[0.875rem] transition-all text-sm font-medium pointer-events-none text-[#344054]",
            {
              "top-[0.75rem] text-[#98A2B3]": !value && !inputFocused,
              "top-[0.3125rem] text-xs text-[#8D8D8D] uppercase":
                value || inputFocused,
            }
          )}
        >
          {label}
        </label>
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
