'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetShipClassQuery } from "../../api/shipClassApi";

export function useShipClassLoader() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isEmptyDetails, setIsEmptyDetails] = useState(true);
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, error, isError, isLoading,  isFetching } = useGetShipClassQuery(
    { uid: query },
    { skip: !query }
  );

  useEffect(() => {
    async function toggleDetails() {
      const detailsParameter = searchParams?.get('details');

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
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.delete('details');

    router.replace(`?${newSearchParams.toString()}`);

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
