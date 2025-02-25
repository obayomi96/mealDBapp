import { InputHTMLAttributes, ReactNode, forwardRef, useState } from "react";
import clsx from "clsx";
import { CloseOutlined } from "@mui/icons-material";

export interface SearchFieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  passwordInput?: boolean;
  emailInput?: boolean;
  prefixLabel?: string;
  suffixLabel?: string;
  name?: string;
  setValue?: (e?: any) => void;
  required?: boolean;
  label?: string;
  errorMessage?: any;
  icon?: ReactNode;
  iconClick?: () => void;
  prefix?: string;
  onClick?: (e: any) => void;
  rows?: number;
  inputWrapperClass?: string;
  isRequiredIconPosition?: "left" | "right";
  inputClass?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  handleClickSearch?: () => void;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value = "",
      onChange = () => {},
      onBlur = () => {},
      onClick,
      setValue,
      label,
      rows,
      name,
      prefixLabel,
      suffixLabel,
      iconClick,
      passwordInput,
      emailInput,
      type,
      required,
      errorMessage,
      icon,
      className,
      isRequiredIconPosition = "right",
      inputWrapperClass,
      inputClass,
      handleClickSearch = () => {},
      ...rest
    },
    ref
  ) => {
    const [inputFocused, setInputFocued] = useState(false);

    return (
      <div className={`${className}`}>
        {label && (
          <div className="w-full flex items-center mb-1">
            {required && isRequiredIconPosition === "left" && (
              <span className="text-col_ff0000 mr-[3px]"> * </span>
            )}
            {prefixLabel && <img src={prefixLabel} alt="" className="ml-2" />}
            <label className={`text-sm capitalize font-medium text-[#344054] `}>
              {label}
            </label>
            {suffixLabel && <img src={suffixLabel} alt="" className="ml-2" />}
            {required && isRequiredIconPosition !== "left" && (
              <span className="text-col_ff0000 ml-[3px]"> * </span>
            )}
          </div>
        )}

        <main
          onMouseDown={() => setInputFocued(true)}
          onMouseOut={() => setInputFocued(false)}
          className={clsx({
            "w-full rounded-[0.25rem] py-[0.6rem] px-1 flex items-center justify-between gap-[0.5rem] outline-none ring-0 h-full":
              true,
            "border-[#BBDFF2]": inputFocused,
          })}
        >
          <div className="w-full h-full flex">
            <input
              {...rest}
              type={"text"}
              ref={ref}
              name={name}
              onChange={onChange}
              value={value}
              autoComplete="off"
              className={`w-full h-full placeholder-[#98A2B3] placeholder:text-opacity-[65%] bg-transparent outline-0 px-3 text-[0.875rem] leading-normal font-normal ring-0 ${inputClass}`}
            />
            {value !== "" && (
              <CloseOutlined
                onClick={setValue}
                className="mr-2"
              />
            )}
          </div>
        </main>
        {errorMessage && (
          <div className="w-full ">
            <span className="text-col_ff0000 text-[0.75rem] ">
              {errorMessage}
            </span>
          </div>
        )}
      </div>
    );
  }
);

SearchField.displayName = "SearchField";

export default SearchField;
