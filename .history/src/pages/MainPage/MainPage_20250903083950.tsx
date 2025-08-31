import { useContext, useState } from 'react';
import { List } from '../../components/List/List';
import { Button } from '../../components/Button/Button';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { ModalColumns } from '../../modals/ModalColumns/ModalColumns';
import { ColumnsContext } from '../../context/ColumnsContext';
import { getColumnDisplayName } from '../../controllers/getColumnDisplayName';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [columns, setColumns] = useContext(ColumnsContext);
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(2023);
  const [sortAttribute, setSortAttribute] = useState('country');
  const [sortOrder, setSortOrder] = useState('ascending');

  const COLUMN_NAMES = [
    'cement_co2',
    'cement_co2_per_capita',
    'cumulative_cement_co2',
    'methane',
    'methane_per_capita',
    'nitrous_oxide_per_papita',
    'nitrous_oxide',
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
          <input className="header__name-field" id="country" name="country" type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
          <select className="header__year-field" name="year" onChange={(e) => setYear(+e.target.value)}>
            {Array.from({ length: 2023 - 1750 + 1 }, (_, i) => 2023 - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="header__sort-controller">
          <span className="header__sort-label">Sort:</span>
          <select className="header__attribute-field" name="sort-attribute" onChange={(e) => setSortAttribute(e.target.value)}>
            <option value="country">Country</option>
            <option value="population">Population</option>
          </select>
          <select className="header__order-field" name="sort-order" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>

        <Button onButtonClick={() => setIsModalOpen(true)}>Select columns</Button>
      </header>

      <List
        additionColumns={Object.keys(columns).filter(key => columns[key])}
        country={country}
        year={year}
        sortAttribute={sortAttribute}
        sortOrder={sortOrder}
      />

      <ModalColumns isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal__content">
          {COLUMN_NAMES.map(id => (
            <Checkbox
              key={id}
              id={id}
              isChecked={columns[id]}
              onCheckboxClick={handleCheckboxClick}
            >
              {getColumnDisplayName(id)}
            </Checkbox>
          ))}
        </div>
      </ModalColumns>
    </div>
  );
};
