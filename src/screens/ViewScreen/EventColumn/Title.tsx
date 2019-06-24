import React from "react";

type TitleProps = { children: React.ReactNode };

export const Title = ({ children }: TitleProps) => (
  <div
    style={{
      padding: 10,
      textAlign: "center",
      borderBottom: "1px solid #ccc",
      fontSize: "1.3em",
      fontWeight: "bold"
    }}
  >
    {children}
  </div>
);
