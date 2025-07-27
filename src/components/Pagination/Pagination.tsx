import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import './Pagination.scss';
import { Link, useLocation, useParams } from 'react-router';

interface PaginationProps {
  pageCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const [isPaginationVisible, setIsPaginationVisible] = useState(!!pageCount);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const { page } = useParams<{page: string}>();
  const location = useLocation();
  const currentPage = page ? +page : 1;

  useEffect(() => {
    if (currentPage < 1 || (currentPage > pageCount && pageCount !== 0)) {
      setIsPaginationVisible(false);
      return;
    }

    setIsPaginationVisible(!!pageCount);

    if (pageCount <= 4) {
      setVisiblePages(Array.from({ length: pageCount }, (_, i) => i + 1));
      return;
    }

    if (!location.state?.fromPagination) {
      setVisiblePages(Array.from({ length: 4 }, (_, i) => currentPage + i));
      return;
    }
    
    setVisiblePages(prevPages => {
      const newVisiblePages = prevPages.length ? [...prevPages] : Array.from({ length: 4 }, (_, i) => currentPage + i);

      if (currentPage > prevPages[3]) {
        return newVisiblePages.map((page) => page + 1);
      }

      if (currentPage < prevPages[0]) {
        return newVisiblePages.map((page) => page - 1);
      }

      return newVisiblePages;
    });
  }, [pageCount, currentPage, location]);

  if (!isPaginationVisible) {
    return null;
  }

  return (
    <footer className="pagination">
      <Link to={`/${currentPage - 1}`} state={{ fromPagination: true }}>
        <Button isDisabled={currentPage === 1}>
          &#60;
        </Button>
      </Link>
      <div className="pagination__pages">
        {visiblePages.map(pageNumber => (
          <Link key={pageNumber} to={`/${pageNumber}`} state={{ fromPagination: true }}>
            <Button isCurrentButton={pageNumber === currentPage}>
              {pageNumber}
            </Button>
          </Link>
        ))}
      </div>
      <Link to={`/${currentPage + 1}`} state={{ fromPagination: true }}>
        <Button isDisabled={currentPage === pageCount}>
          &#62;
        </Button>
      </Link>
    </footer>
  );
}
