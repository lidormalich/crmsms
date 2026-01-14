import { useState, useRef, useEffect } from "react";

export interface SelectOption {
  label: string;
  value: string;
  avatar?: string;
  color?: string; // tailwind bg color (optional)
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (option: SelectOption) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`
      h-4 w-4 text-slate-500
      transition-transform duration-200 ease-out
      ${open ? "rotate-180" : ""}
    `}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className = "",
  error,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasError = Boolean(error);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        className={`
          group flex items-center justify-between
          rounded-xl border bg-white px-4 py-2.5
          cursor-pointer text-sm
          transition-all duration-200
          shadow-sm outline-none
          ${
            hasError
              ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-slate-200 hover:shadow-md hover:shadow-blue-500/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          }
        `}
      >
  <div className="flex items-center gap-3">
    {value?.avatar && (
      <img
        src={value.avatar}
        className="h-8 w-8 rounded-full"
      />
    )}
    <span className="text-slate-900 font-medium">
      {value?.label || placeholder}
    </span>
  </div>

  <ChevronIcon open={open} />
</div>


      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            rounded-2xl border border-slate-200
            bg-white p-2
            shadow-lg shadow-blue-500/10
            animate-in fade-in zoom-in-95
          "
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="
                flex items-center gap-3
                rounded-xl px-3 py-2
                hover:bg-slate-100
                transition-all cursor-pointer
              "
            >
              {option.avatar && (
                <img
                  src={option.avatar}
                  alt={option.label}
                  className="h-7 w-7 rounded-full"
                />
              )}

              <span className="text-slate-800 font-medium">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
          <i className="fa-solid fa-circle-exclamation" />
          {error}
        </p>
      )}
    </div>
  );
}
