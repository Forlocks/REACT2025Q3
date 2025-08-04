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
            <Route index element={
              <>
                {isLoading || ships === null ? (
                  <div className="main__spinner">
                    <img src={spinner} alt="Loading spinner" />
                  </div>
                ) : ships.length ? (
                  <CardsContainer ships={ships} />
                ) : (
                  <div className="main__error-message">No results found</div>
                )}
              </>
            }/>
          </Route>
        </Route>
      </Routes>
      
      <Pagination pageCount={pageCount} />
    </div>
  );
};
