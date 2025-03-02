import React from "react";
import Title from "../../components/Title";
import AddButton from "../../components/ButtonAdd";
import SearchInput from "../../components/Search";

function RentalPages() {
  return (
    <>
      <Title title={"Rental"} />
      <div className="flex justify-between">
        <AddButton name={'Rental'}/>
        <SearchInput placeholder="rental"/>
      </div>
    </>
  );
}

export default RentalPages;
