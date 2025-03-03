import React from "react";
import SearchInput from "../../components/Atom/Search";
import Title from "../../components/Atom/Title";
import AddButton from "../../components/Atom/ButtonAdd";

function RentalPages() {
  return (
    <>
      <Title title={"Rental"} />
      <div className="flex justify-between">
        <AddButton name={"Rental"} />
        <SearchInput placeholder="rental" />
      </div>
    </>
  );
}

export default RentalPages;
