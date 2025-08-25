'use client';

import React from 'react';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useShipLoader } from '../../hooks/useShipLoader/useShipLoader';
import { DetailsLayout } from '../../layouts/DetailsLayout/DetailsLayout';
import { SelectedPanelLayout } from '../../layouts/SelectedPanelLayout/SelectedPanelLayout';
import { Header } from '../../components/Header/Header';
import { Form } from '../../components/Form/Form';
import { CardsContainer } from '../../components/CardsContainer/CardsContainer';
import { Pagination } from '../../components/Pagination/Pagination';
import './MainPage.scss';
import spinner from '../../assets/images/spinner.webp';

export const MainPage: React.FC = () => {
  const params = useParams<{ locale: string; page: string }>();
  const currentPage = params?.page ? +params.page : 1;
  const t = useTranslations('MainPage');

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

  const router = useRouter();

  if (isNaN(currentPage)) {
    notFound();
  }

  if (!params?.page) {
    router.replace('/1');
    return;
  }

  let content;

  if (isLoading || isFetching) {
    content = (
      <div className="main__spinner">
        <Image src={spinner} alt="Loading spinner" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="main__error-message">
        {
          error && ('status' in error)
            ? `Error: ${error.status} — ${(error.data as { message?: string })?.message}`
            : t('error')
        }
      </div>
    );
  } else if (ships.length === 0) {
    content = <div className="main__error-message">{t('noResults')}</div>;
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
      <DetailsLayout>
        <SelectedPanelLayout>
          {content}
        </SelectedPanelLayout>
      </DetailsLayout>
      <Pagination pageCount={pageCount} />
    </div>
  );
};
