import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetShipClassQuery } from "../../api/shipClassApi";

export function useShipClassLoader() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isEmptyDetails, setIsEmptyDetails] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const { data, error, isError, isLoading,  isFetching } = useGetShipClassQuery(
    { uid: query },
    { skip: !query }
  );

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

      setQuery(detailsParameter);
    }

    toggleDetails();
  }, [searchParams]);

  const emptyShipClassData = {
    numberOfDecks: '',
    warpCapable: '',
    alternateReality: '',
    activeFrom: '',
    activeTo: '',
    species: '',
    affiliation: '',
  };

  const handleHideDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('details');
    setSearchParams(newSearchParams);

    setIsDetailsVisible(false);
  }

  return {
    isDetailsVisible,
    isEmptyDetails,
    handleHideDetails,
    error,
    isError,
    isLoading,
    isFetching,
    shipDetails: data ?? emptyShipClassData,
  }
}
