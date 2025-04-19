import React from "react";

type SubTitleProps = {
  subTitle?: string;
  className?: string;
};

const SubTitle: React.FC<SubTitleProps> = ({ subTitle, className }) => {
  return (
    <h1 className={`${className} font-extrabold text-2xl font-compforta mb-5`}>
      {subTitle}
    </h1>
  );
};

export default SubTitle;
