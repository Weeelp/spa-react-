import React from "react";
import MyInput from "../input/MyInput";
import { usePagination } from "../../../hooks/usePagination";

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = usePagination(totalPages);

  return (
    <div className="page__wrapper">
      <MyInput
        value={page}
        onChange={(p) => changePage(p.target.value)}
        type="number"
        placeholder="Введите страницу..."
        min={1}
        max={totalPages}
        style={{ width: "200px" }}
      ></MyInput>
    </div>
  );
};

export default Pagination;
