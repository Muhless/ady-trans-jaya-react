import React from "react";

type SubTitleProps = {
  subTitle?: string;
  className?: string;
};

const SubTitle: React.FC<SubTitleProps> = ({ subTitle, className }) => {
  return (
    <h1 className={`${className} font-poppins font-medium text-gray-600`}>
      {subTitle}
    </h1>
  );
};

export default SubTitle;
