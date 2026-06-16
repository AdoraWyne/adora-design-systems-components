import { useContext } from "react";
import ActiveTabContext from "./ClaudeActiveTabContext";

type ClaudeTabProps = {
  //   onTabClick: () => void;
  //   isSelected: boolean;
  tabLabel: string;
  value: string;
};

const ClaudeTab = ({
  //   onTabClick,
  //   isSelected,
  tabLabel,
  value,
}: ClaudeTabProps) => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext)!;
  const isSelected = activeTab === value;

  return (
    <button
      role="tab"
      type="button"
      tabIndex={isSelected ? 0 : -1}
      id={`tab-${value}`}
      aria-controls={`panel-${value}`}
      onClick={() => setActiveTab(value)}
      aria-selected={isSelected}
      className="p-2 hover:bg-gray-500 aria-selected:text-kick-brand"
    >
      {tabLabel}
    </button>
  );
};

export default ClaudeTab;
