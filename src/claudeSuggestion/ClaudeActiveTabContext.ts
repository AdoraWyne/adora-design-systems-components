import { createContext } from "react";

const ActiveTabContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

export default ActiveTabContext;
