import React, { useState } from "react";
import { useEffect } from "react";
import { useAppData } from "../../contexts/AppDataContext";
import useForceUpdate from "../../hooks/useForceUpdate";

export default function Paginator(props) {
  const MAX_PAGE_BUTTONS = props.maxPerPage;
  /**
   * Prop Level assignments
   */
  const maxRecordsPerPage = props.maxRecordsPerPage
  const parentStates = props.parentStates;
  const [currentPage, setCurrentPage] = [parentStates.page, parentStates.setPage];

  /**
   * Component Level Assignments
   */
  const [dataSet, setDataSet] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageNumberOffset, setPageNumberOffset] = useState(0);
  const pageButtonsEl = [];
  const {appData} = useAppData()
  const forceUpdate = useForceUpdate();
  
  useEffect(function(){
    parentStates.setPaginatorRerenderer(forceUpdate);
  },[]);

  const pageCount = Math.ceil(appData.totalTradeCount/maxRecordsPerPage) < MAX_PAGE_BUTTONS ? Math.ceil(appData.totalTradeCount/maxRecordsPerPage) : MAX_PAGE_BUTTONS
  for (let i = 0; i < pageCount; i++) {
    const num = i + 1 + pageNumberOffset;
    pageButtonsEl.push(
      <li key={num} class={`page-item ${num === currentPage ? "active" : ""}`}>
        <a class="page-link" href="#">
          {num}
        </a>
      </li>
    );
  }

  const nextClickHandler = function (e) {
    if(currentPage <= pageCount){
      if (MAX_PAGE_BUTTONS + pageNumberOffset - currentPage === 0) {
        setPageNumberOffset(pageNumberOffset + 1);
      }
      setCurrentPage(currentPage + 1);
    }
  };
  const prevClickHandler = function (e) {
    if (currentPage !== 1) {
      if (currentPage === pageNumberOffset + 1) {
        if (currentPage - (pageNumberOffset + 1) === 0) {
          setPageNumberOffset(pageNumberOffset - 1);
        }
      }   
      setCurrentPage(currentPage - 1);
    }else{
      //disable prev here..
    }
  };
  return (
    <ul class="pagination pagination-sm m-0">
      <li class="page-item prev" onClick={prevClickHandler}>
        <a class="page-link" href="#trade-logs">
          Previous
        </a>
      </li>
      {pageButtonsEl}
      <li class="page-item next" onClick={nextClickHandler}>
        <a class="page-link" href="#trade-logs">
          Next
        </a>
      </li>
    </ul>
  );
}

Paginator.defaultProps = {
  total: 0,
  maxPerPage: 5,
};
