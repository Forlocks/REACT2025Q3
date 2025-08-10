import React from 'react';
import { useParams, useLocation, Navigate, Routes, Route } from 'react-router-dom';
import { useShipLoader } from '../../hooks/useShipLoader/useShipLoader';
import { DetailsLayout } from '../../layouts/DetailsLayout/DetailsLayout';
import { SelectedPanelLayout } from '../../layouts/SelectedPanelLayout/SelectedPanelLayout';
import { Header } from '../../components/Header/Header';
import { Form } from '../../components/Form/Form';
import { CardsContainer } from '../../components/CardsContainer/CardsContainer';
import { Pagination } from '../../components/Pagination/Pagination';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './MainPage.scss';
import spinner from '../../assets/images/spinner.webp';

export const MainPage: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const currentPage = page ? +page : 1;

  const {
    inputValue,
    handleInputChange,
    handleSearch,
    error,
    isError,
    isLoading,
    isFetching,
    ships,
    pageCount,
  } = useShipLoader(currentPage);

  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  if (isNaN(currentPage) || (pathParts.length > 1)) {
    return <NotFoundPage />;
  }

  if (!page) {
    return <Navigate to="/1" replace />;
  }

  let content;

  if (isLoading || isFetching) {
    content = (
      <div className="main__spinner">
        <img src={spinner} alt="Loading spinner" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="main__error-message">
        {
          error && ('status' in error)
            ? `Error: ${error.status} — ${(error.data as { message?: string })?.message}`
            : 'An unknown error occurred'
        }
      </div>
    );
  } else if (ships.length === 0) {
    content = <div className="main__error-message">No results found</div>;
  } else {
    content = <CardsContainer ships={ships} />;
  }

  return (
    <div className="main">
      <Header>
        <Form
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSearch={() => handleSearch()}
        />
      </Header>
      <Routes>
        <Route path="/" element={<DetailsLayout />}>
          <Route element={<SelectedPanelLayout />}>
            <Route index element={content} />
          </Route>
        </Route>
      </Routes>
      <Pagination pageCount={pageCount} />
    </div>
  );
};
