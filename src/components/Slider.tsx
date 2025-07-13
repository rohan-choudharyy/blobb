import React from "react";

export const Slider: React.FC<{
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    leftLabel?: string;
    rightLabel?: string;
    displayValue?: string;
}> = ({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    leftLabel,
    rightLabel,
    displayValue,
}) =>{
    return(
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            {( leftLabel || rightLabel ) && (
                <div className="flex justify-between text-xs text-gray-500">
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>
            )}
            {displayValue && (
                <div className="text-center text-xs text-gray-500">
                    <span>{displayValue}</span>
                </div>
            )}
        </div>
    )
}