'use client';

import React from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from 'react-redux';
import { clearCards, selectAllSelectedCards } from '../../slices/selectedCardsSlice';
import { RootState } from '../../store';
import { Button } from "../../components/Button/Button";
import { downloadCsv } from "../../actions/downloadCsv";
import './SelectedPanelLayout.scss';

interface SelectedPanelLayoutProps {
  children: React.ReactNode;
}

export const SelectedPanelLayout: React.FC<SelectedPanelLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => selectAllSelectedCards(state));
  const t = useTranslations('SelectedPanel');

  const selectedCardsCount = selectedCards.length;
  const plainSelectedCards = selectedCards.map(card => ({
  uid: card.uid,
  classId: card.classId,
  name: card.name,
  registry: card.registry,
  status: card.status,
  dateStatus: card.dateStatus,
  shipClass: card.shipClass,
  owner: card.owner,
  operator: card.operator
}));


  const downloadSelectedCards = async () => {
    const csvContent = await downloadCsv(plainSelectedCards);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${selectedCardsCount}_selected_cards.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {children}
      <div className={selectedCardsCount ? 'selected-panel selected-panel_visible' : 'selected-panel'}>
        <div className="selected-panel__counter">{t('counter')} {selectedCardsCount}</div>
        <Button onButtonClick={() => {dispatch(clearCards())}}>{t('resetButton')}</Button>
        <Button onButtonClick={downloadSelectedCards}>{t('downloadButton')}</Button>
      </div>
    </>
  );
}
