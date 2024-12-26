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
        <div className="space-y-4">
            <div>
                <label className="text-sm text-black">{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        </div>
    );
};

export default PinFormField;
