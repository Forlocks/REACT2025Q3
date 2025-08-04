import React from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { clearCards, selectAllSelectedCards } from '../../slices/selectedCardsSlice';
import { RootState } from '../../store';
import { Button } from "../../components/Button/Button";
import './SelectedPanelLayout.scss';

export const SelectedPanelLayout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => selectAllSelectedCards(state));
  const selectedCardsCount = selectedCards.length;

  const downloadSelectedCards = () => {
    const csvHeaders = "UID;Class ID;Name;Registry;Status;Date Status;Ship Class;Owner;Operator\n";
    const csvContent = csvHeaders + selectedCards.map(card => 
      `${card.uid};${card.classId};${card.name};${card.registry};${card.status};${card.dateStatus};${card.shipClass};${card.owner};${card.operator}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${selectedCardsCount}_selected_cards.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Outlet />
      <div className={selectedCardsCount ? 'selected-panel selected-panel_visible' : 'selected-panel'}>
        <div className="selected-panel__counter">Cards selected: {selectedCardsCount}</div>
        <Button onButtonClick={() => {dispatch(clearCards())}}>Reset selection</Button>
        <Button onButtonClick={downloadSelectedCards}>Download</Button>
      </div>
    </>
  );
}
