"use client"
import { useEffect, useRef } from "react";
import "./styles/AutoSizeTextArea.css"

export interface AutoSizeTextAreaProps {
    id: string,
    name: string,
    className?: string,
    placeholder?: string
}

export default function AutoSizeTextArea({id, name, className = "textarea-autosize", placeholder = "Text goes here"}: AutoSizeTextAreaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // Set up the event listener when the component mounts
    useEffect(() => {
        const textarea = textareaRef.current;

        if (textarea) {
            const handleInput = (e: Event) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto'; // Reset height before calculating scrollHeight
                target.style.height = `${target.scrollHeight + 4}px`; // Set height to scrollHeight
            };

            textarea.addEventListener('input', handleInput);

            // Cleanup event listener on unmount
            return () => {
                textarea.removeEventListener('input', handleInput);
            };
        }
    }, []);

    return (
        <textarea ref={textareaRef} 
            id={id} 
            name={name}
            className={className} 
            placeholder={placeholder}
            required
        />
    )
}