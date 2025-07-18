import React from "react";

type SubTitleProps = {
  subTitle?: string;
  className?: string;
};

const SubTitle: React.FC<SubTitleProps> = ({ subTitle, className }) => {
  return (
    <h1 className={`${className} font-compforta font-bold `}>
      {subTitle}
    </h1>
  );
};

export default SubTitle;
