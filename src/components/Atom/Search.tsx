import { Search } from "lucide-react";
import React from "react";

type SearchProps = {
  placeholder?: string;
};

const SearchInput: React.FC<SearchProps> = ({ placeholder='cari ' }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-text">
        <Search />
      </span>
      <input
        type="text"
        className="pl-10 text-text bg-secondary text-sm py-2 px-5 border focus:border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-biru"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
