import React from "react";

type UserIconComponentProps = {
  src?: string;
  onClick?: () => void;
  className?: string;
};

const UserIconComponent: React.FC<UserIconComponentProps> = ({
  src = "/assets/images/profile/profile-picture.png",
  onClick,
  className,
}) => {
  return (
    <div onClick={onClick}>
      <img src={src} alt="" className={className} />
    </div>
  );
};

export default UserIconComponent;
