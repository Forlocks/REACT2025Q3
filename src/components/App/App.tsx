import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Routes, Route } from "react-router";
import { useShipLoader } from '../../hooks/useShipLoader';
import { DetailsLayout } from '../../layouts/DetailsLayout/DetailsLayout';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Header } from '../Header/Header';
import { CardsContainer } from '../CardsContainer/CardsContainer';
import { Pagination } from '../Pagination/Pagination';
import { NotFoundError } from '../NotFoundError/NotFoundError';
import './App.scss';
import spinner from '../../assets/images/spinner.webp';

export const App: React.FC = () => {
  const navigate = useNavigate();
  const { page } = useParams<{page: string}>();
  const currentPage = page ? +page : 1;

  const {
    inputValue,
    isLoading,
    ships,
    pageCount,
    handleInputChange,
    handleSearch,
  } = useShipLoader(currentPage);

  if (isNaN(currentPage)) {
    return <NotFoundError />
  }
  
  if (!page) {
    navigate("/1");
  }

  let content;

  if (ships === null) {
    content = (
      <div className="app__error-message">
        An error has occurred
        <br />
        Check your network connection, you may need a VPN.
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="details__spinner">
        <img src={spinner} alt="Loading spinner" />
      </div>
    );
  } else if (ships.length) {
    content = (
      <Routes>
        <Route path="/" element={<DetailsLayout />}>
          <Route index element={<CardsContainer ships={ships} />}/>
        </Route>
      </Routes>
    );
  } else {
    content = <div className="app__error-message">No results found</div>;
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Header
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSearch={() => handleSearch()}
        />
        {content}
        <Pagination pageCount={pageCount} />
      </div>
    </ErrorBoundary>
  );
};
