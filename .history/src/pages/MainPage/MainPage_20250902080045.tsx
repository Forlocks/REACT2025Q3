import { useContext, useState } from 'react';
import { List } from '../../components/List/List';
import { Button } from '../../components/Button/Button';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { ModalColumns } from '../../modals/ModalColumns/ModalColumns';
import { ColumnsContext } from '../../context/ColumnsContext';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [columns, setColumns] = useContext(ColumnsContext);

  const COLUMNS = [
    cement_co2,
    cementCo2PerCapita,
    cumulativeCementCo2,
    methane,
    methanePerCapita,
    nitrousOxidePerCapita,
    nitrousOxide,
  ];

  const handleCheckboxClick = (id: string) => {
    setColumns(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className={isModalOpen ? "main main--blurred" : "main"} onClick={() => isModalOpen && setIsModalOpen(false)}>
      <h1 className="main__title">CO2 Emissions</h1>
      <header className="header">
        <div className="header__search-controller">
          <span className="header__search-label">Search:</span>
          <input className="header__name-field" id="country" name="country" type="text" placeholder="Country" />
          <select className="header__year-field" name="year">
            <option value="2025">2025</option>
          </select>
        </div>

        <div className="header__sort-controller">
          <span className="header__sort-label">Sort:</span>
          <select className="header__attribute-field" name="sort-attribute">
            <option value="country">Country</option>
            <option value="population">Population</option>
          </select>
          <select className="header__order-field" name="sort-order">
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>

        <Button onButtonClick={() => setIsModalOpen(true)}>Select columns</Button>
      </header>

      <List visibleColumns={columns.filter(Boolean)} />

      <ModalColumns isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal__content">
          {Object.entries(COLUMNS).map(([id, displayName]) => (
            <Checkbox
              key={id}
              id={id}
              isChecked={columns[id]}
              onCheckboxClick={handleCheckboxClick}
            >
              {displayName}
            </Checkbox>
          ))}
        </div>
      </ModalColumns>
    </div>
  );
};
