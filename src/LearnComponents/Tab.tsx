type TabProps = {
  isSelected: boolean;
  onTabClick: () => void;
  children: React.ReactNode;
  value: string;
};

const Tab = ({ onTabClick, isSelected, children, value }: TabProps) => {
  return (
    <button
      aria-controls={`panel-${value}`}
      aria-selected={isSelected}
      id={`tab-${value}`}
      onClick={onTabClick}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      type="button"
      className="p-2 hover:bg-gray-500 aria-selected:text-kick-brand"
    >
      {children}
    </button>
  );
};

export default Tab;
