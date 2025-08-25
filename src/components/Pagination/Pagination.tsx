'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '../Button/Button';
import './Pagination.scss';

interface PaginationProps {
  pageCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const [isPaginationVisible, setIsPaginationVisible] = useState(!!pageCount);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const params = useParams<{ locale: string; page: string }>();
  const currentPage = params?.page ? +params?.page : 1;

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
  }, [pageCount, currentPage]);

  if (!isPaginationVisible) {
    return <footer className="pagination"></footer>;
  }

  return (
    <footer className="pagination">
      <Link href={`/${currentPage - 1}`}>
        <Button isDisabled={currentPage === 1}>
          &#60;
        </Button>
      </Link>
      <div className="pagination__pages">
        {visiblePages.map(pageNumber => (
          <Link key={pageNumber} href={`/${pageNumber}`}>
            <Button isCurrentButton={pageNumber === currentPage}>
              {pageNumber}
            </Button>
          </Link>
        ))}
      </div>
      <Link href={`/${currentPage + 1}`}>
        <Button isDisabled={currentPage === pageCount}>
          &#62;
        </Button>
      </Link>
    </footer>
  );
}
