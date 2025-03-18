import React from "react";

type ResetButtonComponentProps = {
  clearMap: () => void;
};

export const ResetButtonComponent: React.FC<ResetButtonComponentProps> = ({
  clearMap,
}) => {
  return (
    <button
      onClick={clearMap}
      className="p-2 w-full bg-red-500 text-primary rounded-lg mt-4"
    >
      Ulangi
    </button>
  );
};
