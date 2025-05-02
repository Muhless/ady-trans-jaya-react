import { Search } from "lucide-react";
import React from "react";

type SearchProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchProps> = ({
  label,
  value,
  type,
  placeholder = "cari data",
}) => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 flex items-center transition-colors duration-200 left-3">
        <Search size={18} />
      </span>
      <input
        type="text"
        className="px-5 py-2 pl-10 text-sm rounded-2xl bg-secondary focus:border-background focus:outline-none focus:ring-2 focus:ring-biru peer"
        placeholder={`Cari ${placeholder}`}
      />
    </div>
  );
};

export default SearchInput;
