"use client"

import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ id, label, ...rest }, ref) => {
    return (
        <div className="w-full flex flex-col items-start justify-center space-y-4">
            <label htmlFor={id} className="text-lg">{label}</label>
            <input
                type="text"
                id={id}
                className="w-full h-12 bg-neutral-900 border-2 border-neutral-800 px-4 rounded-lg !ring-0 !outline-none focus-visible:border-neutral-500"
                {...rest}
            />
        </div>
    )
})

Input.displayName + "Input";