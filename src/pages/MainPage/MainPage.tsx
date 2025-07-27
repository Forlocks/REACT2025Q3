import React from 'react';
import { useParams, useLocation, Navigate } from 'react-router';
import { Routes, Route } from "react-router";
import { useShipLoader } from '../../hooks/useShipLoader';
import { DetailsLayout } from '../../layouts/DetailsLayout/DetailsLayout';
import { Header } from '../../components/Header/Header';
import { Form } from '../../components/Form/Form';
import { CardsContainer } from '../../components/CardsContainer/CardsContainer';
import { Pagination } from '../../components/Pagination/Pagination';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './MainPage.scss';
import spinner from '../../assets/images/spinner.webp';

export const MainPage: React.FC = () => {
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

  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  if (isNaN(currentPage) || (pathParts.length > 1)) {
    return <NotFoundPage />
  }
  
  if (!page) {
    return <Navigate to="/1" replace />
  }

  let content;

  if (ships === null) {
    content = (
      <div className="main__error-message">
        An error has occurred
        <br />
        Check your network connection, you may need a VPN.
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="main__spinner">
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
    content = <div className="main__error-message">No results found</div>;
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
      {content}
      <Pagination pageCount={pageCount} />
    </div>
  );
};
