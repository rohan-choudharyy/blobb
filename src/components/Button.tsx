export const Button: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'success';
    disabled?: boolean;
    className?: string
}> = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
}) => {
    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600',
        secondary: 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600',
        success: 'bg-green-600 hover:bg-green-700 disabled:bg-gray-600',
    };
    
    return(
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${variantStyles[variant]} ${className}`}
            suppressHydrationWarning={true}
        >
            {children}
        </button>
    )
}