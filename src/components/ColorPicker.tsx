 'use client'

import React, { useState, useEffect } from 'react';
 
 export const ColorPicker: React.FC<{
    label: string
    value: string;
    onChange: (value: string) => void;
 }> = ({
    label,
    value,
    onChange,
 }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return(
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border-2 border-gray-600 bg-gray-700" />
                    <div className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-mono flex-1 h-10" />
                </div>
            </div>
        );
    }

    return(
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <div className="flex items-center gap-3">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-600 cursor-pointer bg-transparent"
                />
                <input
                    type="text"
                    value={value.toUpperCase()}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-mono flex-1 focus:outline-none focus:ring-blue-500 focus:border-transparent"
                    placeholder="#000000"
                />
            </div>
        </div>
    )
 }