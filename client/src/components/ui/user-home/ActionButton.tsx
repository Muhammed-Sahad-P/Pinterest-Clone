import React from "react";
import { ButtonProps } from "@/lib/types";

const ActionButton: React.FC<ButtonProps> = ({ className, children, icon: Icon, onClick }) => {
    return (
        <button onClick={onClick} className={`inline-flex items-center ${className}`}>
            {children}
            {Icon && <Icon className="inline-block ml-1" />}
        </button>
    );
};

export default ActionButton;