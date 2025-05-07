
  import React, { useState } from "react";
  
  import {
    UseFormRegister,
    FieldValues,
    Path,
    Merge,
    FieldError,
    FieldErrorsImpl,
  } from "react-hook-form";
import { PasswordEyeCloseIcon, PasswordEyeOpenIcon } from "../assets/svg";
  
  export type InputPropsClassName = {
    className?: string;
  };
  
  export type FieldType =
    | "text"
    | "email"
    | "password"
    | "radio"
    | "checkbox"
    | "date"
    | "number"
    | "mask_input"
    | "input"
    | "textarea"
    | "select"
    | "dateAndTime"
    | "asyncSelect"
    | "creatableAsyncSelect"
    | "creatableSelect"
    | "color"
    | "time"
    | "richTextEditor"
    | "currency_format"
    | "CreatableAsyncSelectFormFieldForSearch"
    | "search";
  
  export type InputProps<TFormValues extends FieldValues> = {
    label?: string | React.ReactNode;
    id?: string;
    name: Path<TFormValues>;
    className?: string;
    parentClassName?: string;
    type?: FieldType;
    value?: string;
    register?: UseFormRegister<TFormValues>;
    error?:
    | Merge<FieldError, (FieldError | undefined)[]>
    | Merge<FieldError, (Merge<FieldError, FieldErrorsImpl> | undefined)[]>
    | undefined;
    disabled?: boolean;
    fieldLimit?: number;
    labelClass?: string;
    variant?: boolean;
    extraText?: string;
    extraTextClass?: string;
    extraTextLeft?: boolean;
    autoComplete?: string;
    minNumber?: number;
    maxNumber?: number;
    step?: string;
    autofocus?: boolean;
    requireField?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  };
  
  const temperaturePattern = /^-?\d*\.?\d*$/;
  const Input = <TFormValues extends Record<string, unknown>>(
    fieldProps: InputProps<TFormValues>
  ) => {
    const {
      id,
      label,
      type,
      name,
      className,
      parentClassName,
      register,
      disabled,
      error,
      fieldLimit,
      variant = false,
      labelClass,
      extraText,
      extraTextClass,
      value,
      step,
      extraTextLeft,
      minNumber,
      maxNumber,
      autoComplete = "off",
      autofocus,
      requireField,
      onBlur,
      ...rest
    } = fieldProps;
    
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const onHnadlePasswordVisible = () => {
      setPasswordVisible(!passwordVisible);
    };
    
    const onWheelPreventChange = (e: any) => {
      e.target.blur()
      e.stopPropagation()
      setTimeout(() => {
          e.target.focus()
      }, 0)
    }
  
  
    return (
      <>
        <div
          className={`input-wrap relative ${parentClassName ? parentClassName : ""
            }`}
        >
          {label ? (
            <div className="flex items-center">
              <label
                className={`${variant
                  ? "text-base block text-black leading-6 mb-9px font-medium"
                  : "block text-sm leading-5 text-black mb-[6px] font-medium"
                  } ${labelClass ? labelClass : ""}`}
                htmlFor={name}
              >
                {label}
                {requireField ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
            </div>
          ) : (
            ""
          )}
          <input
            id={id || ""}
            disabled={disabled || false}
            type={
              type === "password" ? (passwordVisible ? "text" : "password") : type
            }
            value={value}
            step={step}
            className={`${variant
              ? "relative w-full focus:shadow-input focus:ring-2 focus:ring-black20 focus:ring-offset-2 hover:ring-2 hover:ring-black20 font-medium text-base leading-7 text-black/60 bg-white py-11px px-4 rounded-9 placeholder:font-normal placeholder:text-black/40 transition-all duration-300"
              : "relative px-15px rounded-6 py-2.5 text-sm w-full bg-offwhite focus:shadow-input focus:ring-2 focus:ring-black20 focus:ring-offset-2 hover:ring-2 hover:ring-black20 placeholder:font-normal placeholder:text-black40 transition-all duration-300"
              } 
      ${className ? className : ""} ${type === "password" ? "pr-12" : ""} 
      ${extraTextLeft ? "pl-6" : ""}`}
            {...(register &&
              register(name, {
                setValueAs: (value) =>
                  typeof value === "string" ? value?.trim() : value,
              }))}
            min={minNumber}
            max={maxNumber}
            {...rest}
            autoComplete={autoComplete}
            maxLength={fieldLimit || 100}
            aria-autocomplete="none"
            autoFocus={autofocus}
            onBlur={onBlur}
            onWheel={onWheelPreventChange}
          />
  
          {extraText ? (
            <span
              className={`inline-block absolute text-xs opacity-50 font-medium top-[38px]
              ${extraTextLeft ? " left-2 " : " right-2 "}
               ${extraTextClass ? extraTextClass : ""}`}
            >
              {extraText}
            </span>
          ) : (
            ""
          )}
          {type === "password" ? (
            <span
              onClick={onHnadlePasswordVisible}
              className={`inline-block absolute  right-4 w-5 h-5 cursor-pointer opacity-80 ${variant ? "top-12" : " top-35px"
                }`}
            >
              {passwordVisible ? (
                <PasswordEyeOpenIcon className="!fill-none" />
              ) : (
                <PasswordEyeCloseIcon className="!fill-none" />
              )}
            </span>
          ) : (
            ""
          )}
          {error && (
            <p className="text-sm text-red font-medium mt-1 inline-block">
              {error.message}
            </p>
          )}
         
        </div>
      </>
    );
  };
  
  export default Input;
  