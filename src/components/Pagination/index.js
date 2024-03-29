import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ListContext from "@/contexts/list-context";

const CustomPagination = (props) => {
  const listContext = useContext(ListContext);

  const handleChangePage = (newPage) => () => listContext.setPage(newPage);

  const renderPageLink = () => {
    const pages = [];
    for (let index = 0; index < listContext.listItems.pageCount; index++) {
      const currentPage = index + 1;
      pages.push(
        <PaginationItem
          key={index}
          active={
            currentPage === (listContext.lastFilters?.page || listContext.page)
          }
        >
          <PaginationLink
            onClick={handleChangePage(currentPage)}
            // href={`#${currentPage}`}
            type="button"
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };
  if (!listContext.listItems) return null;

  return (
    <Pagination>
      {/* <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" previous />
      </PaginationItem> */}
      {renderPageLink()}
      {/* <PaginationItem>
        <PaginationLink href="#" next />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" last />
      </PaginationItem> */}
    </Pagination>
  );
};

CustomPagination.propTypes = {
  totalPages: PropTypes.number,
};

export default CustomPagination;
