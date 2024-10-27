import React from "react";
import { Music } from "lucide-react";

const ErrorState = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <Music className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-400">{message}</p>
    </div>
);

export default ErrorState;
