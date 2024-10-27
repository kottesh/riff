const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-gray-400 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
