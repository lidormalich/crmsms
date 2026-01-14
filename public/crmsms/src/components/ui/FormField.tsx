import { FunctionComponent, InputHTMLAttributes, ReactNode } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
}

const FormField: FunctionComponent<FormFieldProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = "",
  id,
  ...rest
}) => {
  const fieldId = id || rest.name;
  const hasError = Boolean(error);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leftIcon}
          </span>
        )}
        <input
          id={fieldId}
          className={`block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-transparent transition-all duration-200 ${
            leftIcon ? "pl-9" : ""
          } ${
            hasError
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
          } ${className}`}
          {...rest}
        />
      </div>
      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;



