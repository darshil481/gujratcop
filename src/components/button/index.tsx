import React, { SVGAttributes, forwardRef } from "react";
export type ButtonVariants =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "default";

type ButtonTheme = "light" | "dark";

const VARIANT_STYLES: Record<ButtonVariants, string> = {
  "1": "border-2 border-solid border-tomato hover:border-tomatoHover bg-tomato hover:bg-tomatoHover focus:ring-tomato text-white",
  "2": "border-2 border-solid border-sky hover:border-skyHover bg-sky hover:bg-skyHover focus:ring-sky text-white",
  "3": "bg-PrimaryBlue border-2 border-solid border-PrimaryBlue hover:bg-PrimaryBlueLight text-white font-semibold hover:text-PrimaryBlue focus:ring-PrimaryBlueLight hover:border-transparent shadow-none",
  "4": "bg-PrimaryBlueLight border-2 border-solid border-PrimaryBlueLight hover:border-PrimaryBlue hover:bg-PrimaryBlue text-PrimaryBlue font-semibold hover:text-white focus:ring-PrimaryBlue shadow-none",
  "5": "bg-LinkBlue10 border-2 border-solid border-LinkBlue10 hover:bg-LinkBlue hover:border-LinkBlue text-LinkBlue font-semibold hover:text-white focus:ring-LinkBlue shadow-none",
  "6": "bg-purple10 border-2 border-solid border-purple10 hover:bg-purple hover:border-purple text-purple font-semibold hover:text-white focus:ring-purple shadow-none",
  "7": "bg-BoxTomato border-2 border-solid border-transparent hover:bg-tomato hover:border-tomato text-tomato font-semibold hover:text-white focus:ring-tomato shadow-none",
  "8": "bg-PrimaryGreen border-2 border-solid border-PrimaryGreen hover:bg-PrimaryGreenLight hover:border-PrimaryGreenLight text-PrimaryBlue font-semibold focus:ring-PrimaryGreenLight shadow-none",
  "9": "bg-PrimaryGreenLight border-2 border-solid border-PrimaryGreenLight hover:bg-PrimaryGreen hover:border-PrimaryGreen text-PrimaryBlue font-semibold focus:ring-PrimaryGreen shadow-none",
  "10": "bg-BlueLight border-2 border-solid border-BlueLight hover:bg-PrimaryBlue hover:border-PrimaryBlue text-PrimaryBlue font-semibold hover:text-white focus:ring-PrimaryBlue shadow-none",
  "11": "bg-themeColor border-2 border-solid border-themeColor text-white font-semibold focus:ring-themeColor shadow-none hover:opacity-80",
  default:
    "bg-offwhite border-2 border-solid border-offwhite text-black60 font-semibold focus:ring-black10 shadow-none hover:bg-black10 hover:text-black",
  "12": "bg-[#5eff89] text-black border-2 border-solid border-themeColor font-semibold focus:ring-themeColor shadow-none hover:opacity-80",
};

const colorMappings: Record<string, Record<string, string>> = {
  "#344966": { dark: "8", light: "10" },
  "#bfcc94": { dark: "3", light: "10" },
  "#b4cded": { dark: "8", light: "3" },
  default: { dark: "3", light: "10" }, // CUSTOM THEME
};

export interface ButtonProps extends SVGAttributes<SVGElement> {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  parentClassName?: string;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: ButtonVariants;
  smallBtn?: boolean;
  onClick?: React.MouseEventHandler;
  key?: number;
  tooltipId?: string;
  showTooltip?: boolean;
  tooltipContent?: string;
  buttonTheme?: ButtonTheme;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      isDisabled,
      type,
      className,
      parentClassName,
      onClick: onHandleClick,
      variant,
      children,
      smallBtn,
      isLoading = false,
      buttonTheme,
    } = props;

    const userBgColor = "#B4CDED";

    const buttonVariants = (variant: ButtonVariants = "default") => {
      if (buttonTheme) {
        const userBgColorKey = userBgColor?.toLocaleLowerCase();
        const variantKey =
          colorMappings[userBgColorKey]?.[buttonTheme] ||
          colorMappings["default"]?.[buttonTheme];
        return VARIANT_STYLES[variantKey as ButtonVariants];
      }
      return VARIANT_STYLES[variant] || VARIANT_STYLES.default;
    };

    return (
      <>
        <div
          className={`${parentClassName ? parentClassName : ""}`}
        >
          <button
            ref={ref}
            onClick={(e) => {
              // e.preventDefault();
              onHandleClick && onHandleClick(e);
            }}
            type={type}
            className={`btn inline-flex whitespace-nowrap h-fit justify-center items-center min-w-[70px] font-medium focus:ring-2 focus:ring-offset-2 transition-all duration-300 rounded-8 
              ${buttonVariants(variant)}
              ${
                smallBtn
                  ? "text-xs leading-[18px] py-1.5 px-10px"
                  : "py-[6px] px-[18px] text-15px leading-23px"
              }
              ${className ? className : ""} 
              ${isDisabled || isLoading ? "cursor-not-allowed opacity-80" : ""}
             `}
            disabled={isDisabled || isLoading || false}
          >
            {children}
            {isLoading && (
              <span
                className="animate-spin inline-block ml-2 w-5 h-5 rounded-full relative before:absolute before:content-[''] before:w-full before:h-full before:top-0 before:left-0 before:border-4 before:border-solid before:border-current before:rounded-full before:opacity-30
           after:absolute after:content-[''] after:w-full after:h-full after:top-0 after:left-0 after:border-4 after:border-transparent after:border-solid after:border-r-current after:rounded-full"
              ></span>
            )}
          </button>
        </div>
      </>
    );
  }
);

Button.displayName = "Button";

export default Button;
