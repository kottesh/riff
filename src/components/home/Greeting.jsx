export const GreetingSection = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-700 to-blue-900 p-8 mb-8">
            <div className="relative z-10">
                <h1 className="text-4xl font-bold text-white mb-2">
                    {getGreeting()}
                </h1>
                <p className="text-gray-200">Welcome to your music stream</p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-3xl transform rotate-45" />
        </div>
    );
};
