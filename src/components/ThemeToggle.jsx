"use client";

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/slices/uiSlice';
import { useEffect } from 'react';

export default function ThemeToggle() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.ui.theme);

    // Sync theme with document element
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.style.setProperty('--background', '#151515');
            root.style.setProperty('--foreground', '#ffffff');
            // update hardcoded body styles
            document.body.style.backgroundColor = '#151515';
            document.body.style.color = '#ffffff';
            document.body.classList.remove('text-black');
            document.body.classList.add('text-white');
        } else {
            root.classList.remove('dark');
            root.style.setProperty('--background', '#ffffff');
            root.style.setProperty('--foreground', '#151515');
            // update hardcoded body styles
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#151515';
            document.body.classList.remove('text-white');
            document.body.classList.add('text-black');
        }
    }, [theme]);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <button
                onClick={() => dispatch(toggleTheme())}
                className="w-[4.2rem] h-9 bg-[#2A2A2A] rounded-full flex items-center p-1 relative cursor-pointer shadow-lg outline-none"
                aria-label="Toggle Theme"
            >
                <div className="w-full absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
                    <span className="text-neutral-500 w-[1.3rem] h-[1.3rem] flex items-center justify-center">
                        <Sun className="w-full h-full" />
                    </span>
                    <span className="text-neutral-400 w-[1.3rem] h-[1.3rem] flex items-center justify-center">
                        <Moon className="w-full h-full text-white" />
                    </span>
                </div>
                <motion.div
                    className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md relative z-10"
                    layout
                    transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30
                    }}
                    animate={{
                        x: theme === "dark" ? 31 : 0
                    }}
                >
                    {theme === 'dark' ? <Moon className="w-4 h-4 text-black" /> : <Sun className="w-4 h-4 text-black" />}
                </motion.div>
            </button>
        </div>
    );
}
