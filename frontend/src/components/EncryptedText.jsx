import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EncryptedText = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split("").map((char, index) => {
                    if (char === " ") return " "; // Preserve spaces
                    if (index < iteration) {
                        return text[index]; // Show actual character
                    }
                    return characters[Math.floor(Math.random() * characters.length)]; // Random character
                }).join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Speed of reveal (higher = faster)
        }, 30); // Animation speed in ms (lower = faster)

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.span>
    );
};

export default EncryptedText;
