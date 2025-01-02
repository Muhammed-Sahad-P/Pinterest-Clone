import React from "react";
import { ButtonProps } from "@/lib/types";

const ActionButton: React.FC<ButtonProps> = ({ className, children, icon: Icon, onClick, title }) => {
    return (
        <button onClick={onClick} className={`inline-flex items-center ${className}`} title={title}>
            {children}
            {Icon && <Icon className="inline-block" />}
        </button>
    );
};

export default ActionButton;