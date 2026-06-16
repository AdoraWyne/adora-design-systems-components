import { useContext } from "react";
import ActiveTabContext from "./ClaudeActiveTabContext";

type ClaudeTabPanelProps = {
  children: React.ReactNode;
  value: string;
};

const ClaudeTabPanel = ({ children, value }: ClaudeTabPanelProps) => {
  const { activeTab } = useContext(ActiveTabContext)!;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={activeTab !== value}
    >
      {children}
    </div>
  );
};

export default ClaudeTabPanel;
