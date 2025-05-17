import React from "react";

type TitleProps = {
  title: string;
};

const TitleComponent: React.FC<TitleProps> = ({ title }) => {
  return <h1 className="text-4xl font-bold py-5 font-compforta">{title}</h1>;
};

export default TitleComponent;
