import React from "react";

interface ButtonProps {
  label?: React.ReactNode | string;
  onClick?: (arg: any) => void;
  type?: "button" | "submit";
  icon?: string;
  iconRight?: string;
  loading?: boolean;
  disabled?: boolean;
  textColor?: string;
  capitalized?: boolean;
  btnStyleId?: string;
  additionalClassname?: any;
  iconPosition?: "left" | "right" | "both";
  children?: React.ReactNode;
  iconSpace?: number | string;
}

const Button: React.FC<ButtonProps> = ({
  btnStyleId,
  label,
  onClick = () => {},
  type = "button",
  icon = "",
  iconRight = "",
  loading = false,
  disabled = false,
  capitalized,
  additionalClassname,
  iconPosition = "left",
  iconSpace = "2px",
}) => {
  return (
    <button
      className={`flex items-center text-sm justify-center rounded-[4px] font-[600] w-full h-full px-[1rem] py-[0.75rem] transition duration-200 ease-in-out focus:outline-none focus:ring-0 ${capitalized} ${additionalClassname} ${
        disabled ? "text-[#98A2B3] bg-[#F0F2F5] cursor-not-allowed " : ""
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      id={btnStyleId}
    >
      {icon && iconPosition === "left" && (
        <>
          <img src={icon} alt="icon" className="mr-2" />
          <div className={`w-[${iconSpace}]`} />
        </>
      )}

      {icon && iconPosition === "both" && (
        <>
          <img src={icon} alt="icon" className="mr-2" />
          <div className={`w-[${iconSpace}]`} />
        </>
      )}

      {!loading ? (
        <div className="">{label}</div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <div className="animate-pulse" >...</div>
        </div>
      )}
      {(iconRight && iconPosition === "right") ||
        (iconRight && iconPosition === "both" && (
          <>
            <div className={`w-[${iconSpace}]`} />
            <img src={iconRight} alt="icon" className="ml-2" />
          </>
        ))}
    </button>
  );
};

export default Button;
