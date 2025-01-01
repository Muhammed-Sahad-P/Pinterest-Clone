import React from "react";

interface FormFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    className?: string;
}

const PinFormField: React.FC<FormFieldProps> = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    required,
    className,
}) => {
    return (
        <div className="flex flex-col w-full max-w-lg mx-auto space-y-2 px-4 sm:px-6">
            <label className="text-sm text-black sm:text-base">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`block w-full py-3 px-4 border border-gray-300 rounded-xl shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-700 placeholder-gray-400 sm:text-sm md:text-base ${className}`}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default PinFormField;
