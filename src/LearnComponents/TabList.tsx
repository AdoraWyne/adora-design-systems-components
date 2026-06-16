import React from "react";

type TabListProps = { children: React.ReactNode };

const TabList = ({ children }: TabListProps) => {
  return (
    <div role="tablist" className="flex">
      {children}
    </div>
  );
};

export default TabList;
