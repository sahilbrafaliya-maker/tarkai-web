"use client";

import React from "react";

interface BackgroundTextProps {
    text: string;
    className?: string;
}

export default function BackgroundText({ text, className = "" }: BackgroundTextProps) {
    return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] leading-none font-black tracking-tighter text-brand-darkest/10 select-none pointer-events-none whitespace-nowrap z-0 ${className}`}>
            {text}
        </div>
    );
}
