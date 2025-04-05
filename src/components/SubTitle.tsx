import React from "react";

type SubTitleProps = {
  subTitle?: string;
  className?: string;
};

const SubTitle: React.FC<SubTitleProps> = ({ subTitle, className }) => {
  return (
    <h1 className={`${className} font-extrabold underline text-xl font-compforta`}>
      {subTitle}
    </h1>
  );
};

export default SubTitle;
