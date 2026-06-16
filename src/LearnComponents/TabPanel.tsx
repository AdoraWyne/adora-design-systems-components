type TabPanelProps = {
  children: React.ReactNode;
  value: string;
  activeTab: string;
};

const TabPanel = ({ children, value, activeTab }: TabPanelProps) => {
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

export default TabPanel;
