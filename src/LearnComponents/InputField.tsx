import type { InputHTMLAttributes } from "react";

type TextInputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMsg?: string;
  helperText?: string;
  id: string;
  label: string;
  type?: TextInputType; // optional, browser default to "text" if dont pass in
};

const InputField = ({
  errorMsg,
  helperText,
  id,
  label,
  required,
  ...props
}: InputFieldProps) => {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={id}
        required={required}
        aria-invalid={!!errorMsg}
        aria-describedby={
          errorMsg ? errorId : helperText ? helperId : undefined
        }
        className={`
            bg-neutral-800 rounded-md px-3 py-2
            focus:outline-none focus:ring-2
            disabled:opacity-50 disabled:cursor-not-allowed
            `}
        {...props}
      />
      {errorMsg && (
        <p id={errorId} role="alert" className="text-red-600">
          {errorMsg}
        </p>
      )}
      {!errorMsg && helperText && (
        <p id={helperId} className="text-sm text-gray-400 ml-2">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
