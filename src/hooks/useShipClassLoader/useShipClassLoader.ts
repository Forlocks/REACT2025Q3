import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getShipClass } from "../../controllers/getShipClass/getShipClass";
import { deleteTags } from "../../controllers/deleteTags/deleteTags";
import { ShipClass } from '../../models/ShipClass';

export function useShipClassLoader() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isEmptyDetails, setIsEmptyDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [shipDetails, setShipDetails] = useState<ShipClass>({
    numberOfDecks: '',
    warpCapable: '',
    alternateReality: '',
    activeFrom: '',
    activeTo: '',
    species: '',
    affiliation: '',
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function toggleDetails() {
      const detailsParameter = searchParams.get('details');
      setIsDetailsVisible(!!detailsParameter);

      if (!detailsParameter) return;

      if (detailsParameter === 'empty') {
        setIsEmptyDetails(true);
        return;
      }

      setIsEmptyDetails(false);
      setIsLoading(true);

      const shipClass = await getShipClass(detailsParameter);
      setShipDetails({
        numberOfDecks: deleteTags(shipClass.spacecraftClass.numberOfDecks) || 'unknown',
        warpCapable: deleteTags(shipClass.spacecraftClass.warpCapable) || 'unknown',
        alternateReality: deleteTags(shipClass.spacecraftClass.alternateReality) || 'unknown',
        activeFrom: deleteTags(shipClass.spacecraftClass.activeFrom) || 'unknown',
        activeTo: deleteTags(shipClass.spacecraftClass.activeTo) || 'unknown',
        species: deleteTags(shipClass.spacecraftClass.species?.name) || 'unknown',
        affiliation: deleteTags(shipClass.spacecraftClass.affiliation?.name) || 'unknown',
      });

      setIsLoading(false);
    }

    toggleDetails();
  }, [searchParams]);

  const handleHideDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('details');
    setSearchParams(newSearchParams);

    setIsDetailsVisible(false);
  }

  return {
    isDetailsVisible,
    isEmptyDetails,
    isLoading,
    shipDetails,
    handleHideDetails,
  }
}
