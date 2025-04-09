import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../Button/Button';
import { PageContext } from '../../providers/Page/PageContext';
import './Pagination.scss';

interface PaginationProps {
  pageCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const [isPaginationVisible, setIsPaginationVisible] = useState(false);
  const [availablePages, setAvailablePages] = useState<number[]>([]);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  useEffect(() => {
      const pages = Array.from(
        {length: pageCount > 4 ? 4 : pageCount},
        (_, index) => index + 1,
      );

      setCurrentPage(1);
      setAvailablePages(pages);
      setIsPaginationVisible(pageCount > 0);
  }, [pageCount, setCurrentPage]);

  const handleChoosePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const handlePreviousPage = () => {
    if ((currentPage - 1) < availablePages[0]) {
      setAvailablePages(availablePages.map(pageNumber => pageNumber - 1));
    }

    setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    if ((currentPage + 1) > availablePages[availablePages.length - 1]) {
      setAvailablePages(availablePages.map(pageNumber => pageNumber + 1));
    }

    setCurrentPage(currentPage + 1);
  }

  let content;

  if (isPaginationVisible) {
    const paginationButtons = availablePages.map(pageNumber => (
      <Button
        key={pageNumber}
        onButtonClick={() => handleChoosePage(pageNumber)}
        isCurrentButton={pageNumber === currentPage}
      >
        {pageNumber}
      </Button>
    ));

    content = (
      <>
        <Button onButtonClick={handlePreviousPage} isDisabled={currentPage === 1}>
          &#60;
        </Button>
        <div className="pagination__pages">
          {paginationButtons}
        </div>
        <Button onButtonClick={handleNextPage} isDisabled={currentPage === pageCount}>
          &#62;
        </Button>
      </>
    );
  } else {
    content = null;
  }

  return (
    <div className="pagination">
      {content}
    </div>
  );
}
