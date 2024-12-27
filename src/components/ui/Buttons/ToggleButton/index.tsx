type ToggleButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

export const ToggleButton = ({
  children,
  className,
  active,
  onClick,
  disabled,
}: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center p-4 border-[1px] border-slate-300 rounded-lg  ${active ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100 hover:cursor-pointer active:bg-black active:text-white '} disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black ${className || ''}`}
    >
      {children}
    </button>
  );
};
