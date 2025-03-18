import React from "react";

type TItleProps = {
  title: string;
};

const Title: React.FC<TItleProps> = ({ title }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text py-5">{title}</h1>
    </div>
  );
};

export default Title;
