import React from "react";

type UserIconComponentProps = {
  onClick?: () => void;
};

const UserIconComponent: React.FC<UserIconComponentProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <img
        src="/assets/images/profile/1.jpg"
        alt=""
        className="box-content rounded-full size-9"
      />
    </div>
  );
};

export default UserIconComponent;
