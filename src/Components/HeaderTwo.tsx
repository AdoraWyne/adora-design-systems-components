import React from "react";

type Props = {
  children: React.ReactNode;
};

const HeaderTwo = ({ children }: Props) => {
  return (
    <h2 className="text-kick-brand text-3xl font-bold mb-4">{children}</h2>
  );
};

export default HeaderTwo;
