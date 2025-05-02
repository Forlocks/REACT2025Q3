import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import './Pagination.scss';
import { Link, useParams } from 'react-router';

interface PaginationProps {
  pageCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const [isPaginationVisible, setIsPaginationVisible] = useState(false);
  const [availablePages, setAvailablePages] = useState<number[]>([]);
  const { page } = useParams<{page: string}>();
  const currentPage = page ? +page : 1;

  useEffect(() => {
      const pages = Array.from(
        {length: pageCount > 4 ? 4 : pageCount},
        (_, index) => index + 1,
      );

      setAvailablePages(pages);
      setIsPaginationVisible(pageCount > 0);
  }, [pageCount, currentPage]);

  const handlePreviousPage = () => {
    if ((currentPage - 1) < availablePages[0]) {
      setAvailablePages(availablePages.map(pageNumber => pageNumber - 1));
    }
  }

  const handleNextPage = () => {
    if ((currentPage + 1) > availablePages[availablePages.length - 1]) {
      setAvailablePages(availablePages.map(pageNumber => pageNumber + 1));
    }
  }

  let content;

  if (isPaginationVisible) {
    const paginationButtons = availablePages.map(pageNumber => (
      <Link key={pageNumber} to={`/${pageNumber}`}>
        <Button
          isCurrentButton={pageNumber === currentPage}
        >
          {pageNumber}
        </Button>
      </Link>
    ));

    content = (
      <>
        <Link to={`/${currentPage - 1}`}>
          <Button onButtonClick={handlePreviousPage} isDisabled={currentPage === 1}>
            &#60;
          </Button>
        </Link>
        <div className="pagination__pages">
          {paginationButtons}
        </div>
        <Link to={`/${currentPage + 1}`}>
          <Button onButtonClick={handleNextPage} isDisabled={currentPage === pageCount}>
            &#62;
          </Button>
        </Link>
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
