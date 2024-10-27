import React, { useState, useEffect } from "react";
import { Moon, Coffee, Sun, Sunset } from "lucide-react";

const Greeting = () => {
    const [greetingData, setGreetingData] = useState({ text: "", Icon: null });

    useEffect(() => {
        const getGreetingData = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12)
                return { text: "Good Morning", Icon: Coffee };
            if (hour >= 12 && hour < 17)
                return { text: "Good Afternoon", Icon: Sun };
            if (hour >= 17 && hour < 22)
                return { text: "Good Evening", Icon: Sunset };
            return { text: "Good Night", Icon: Moon };
        };

        setGreetingData(getGreetingData());
    }, []);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-transparent rounded-2xl backdrop-blur-md shadow-2xl border border-white/5">
            <div className="flex items-center gap-6">
                {greetingData.Icon && (
                    <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl backdrop-blur-sm ring-1 ring-white/10 shadow-xl">
                        <greetingData.Icon className="w-8 h-8 text-yellow-400" />
                    </div>
                )}
                <div className="flex flex-col items-start space-y-2">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500">
                        {greetingData.text}
                    </h1>
                    <p className="text-gray-400 text-lg">Welcome back!</p>
                </div>
            </div>
        </div>
    );
};

export default Greeting;