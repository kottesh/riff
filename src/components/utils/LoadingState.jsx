import React from "react";
import { Music } from "lucide-react";

const LoadingState = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin mr-2">
            <Music className="w-8 h-8" />
        </div>
        <span>Loading...</span>
    </div>
);

export default LoadingState;
