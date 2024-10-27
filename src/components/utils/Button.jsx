const Button = ({
    children,
    size = "md",
    className = "",
    variant = "primary",
    onClick,
}) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";

    const sizeClasses = {
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const variantClasses = {
        primary: "bg-purple-600 hover:bg-purple-700 text-white",
        secondary: "bg-white/10 hover:bg-white/20 text-white",
    };

    return (
        <button
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
