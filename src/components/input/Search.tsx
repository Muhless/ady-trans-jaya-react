import { Search } from "lucide-react";
import React from "react";

type SearchProps = {
  placeholder?: string;
};

const SearchInput: React.FC<SearchProps> = ({ placeholder = "cari data" }) => {
  return (
    <div className="relative border border-black border-b-4 border-r-4">
      <span className="absolute inset-y-0 flex items-center transition-colors duration-200 left-3">
        <Search size={18} />
      </span>
      <input
        type="text"
        className="px-5 py-2 pl-10 text-sm bg-secondary focus:border-background focus:outline-none focus:ring-2 focus:ring-biru peer"
        placeholder={`cari ${placeholder}`}
      />
    </div>
  );
};

export default SearchInput;
