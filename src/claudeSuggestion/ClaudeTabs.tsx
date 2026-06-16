import { useState } from "react";
import ActiveTabContext from "./ClaudeActiveTabContext";

type ClaudeTabsProps = {
  defaultValue: string;
  children: React.ReactNode;
};

const ClaudeTabs = ({ defaultValue, children }: ClaudeTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export default ClaudeTabs;
