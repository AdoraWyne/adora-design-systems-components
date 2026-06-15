type BorderLayoutProps = {
  children: React.ReactNode;
};

const BorderLayout = ({ children }: BorderLayoutProps) => {
  return <div className="border w-lg px-6 py-4">{children}</div>;
};

export default BorderLayout;
