import { Search } from "lucide-react";
import React from "react";

type SearchProps = {
  placeholder?: string;
};

const SearchInput: React.FC<SearchProps> = ({ placeholder = "cari data" }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-text peer-focus:text-biru transition-colors duration-200">
        <Search size={18}/>
      </span>
      <input
        type="text"
        className="pl-10 text-text bg-secondary text-sm py-1 px-5 border focus:border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-biru peer"
        placeholder={`cari ${placeholder}`}
      />
    </div>
  );
};

export default SearchInput;
