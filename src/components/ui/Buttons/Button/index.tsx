type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export const Button = ({
  children,
  disabled,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center p-2 border-[1px] rounded-lg ${!disabled ? 'hover:opacity-80 hover: cursor-pointer' : ''} bg-black text-white min-w-[120px] font-bold disabled:bg-gray-300 disabled:cursor-not-allowed ${className || ''}`}
    >
      {children}
    </button>
  );
};
