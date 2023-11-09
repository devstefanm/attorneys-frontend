import { TableComponent } from '../../components/TableComponent';
import {
  ICitiesTableData,
  ICitiesListQueryParams,
  ICitiesTableHeader,
  ECitiesActionType,
} from '../../types/citiesTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetCitiesListQuery from '../../hooks/queries/cities/useGetCitiesListQuery';
import { useCities } from '../../store/contexts/CitiesContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapCitiesToBorderColors } from './helpers/citiesHelpers';
import { Box, CircularProgress } from '@mui/material';

const citiesTableHeaders: ICitiesTableHeader = {
  city: 'city',
  numberOfDebtors: 'numberOfDebtors',
  numberOfExecutors: 'numberOfExecutors',
  numberOfLawyers: 'numberOfLawyers',
};

const CitiesTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateCitiesState,
  } = useCities();

  let queryParams: ICitiesListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetCitiesListQuery({
    ...queryParams,
    ...searchParams,
  });

  const handleRowClick = (row: Row<ICitiesTableData>) => {
    const { id } = row.original;

    if (id) {
      updateCitiesState({
        type: ECitiesActionType.editCityId,
        payload: id,
      });

      updateCitiesState({
        type: ECitiesActionType.editCityModalOpen,
        payload: true,
      });
    }
  };

  const columns = React.useMemo<ColumnDef<ICitiesTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.city,
        id: citiesTableHeaders.city,
        header: () => <span>{t(`entities.${[citiesTableHeaders.city]}`)}</span>,
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfDebtors,
        id: citiesTableHeaders.numberOfDebtors,
        header: () => (
          <span>{t(`entities.${[citiesTableHeaders.numberOfDebtors]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfExecutors,
        id: citiesTableHeaders.numberOfExecutors,
        header: () => (
          <span>{t(`entities.${[citiesTableHeaders.numberOfExecutors]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfLawyers,
        id: citiesTableHeaders.numberOfLawyers,
        header: () => (
          <span>{t(`entities.${[citiesTableHeaders.numberOfLawyers]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
    ],
    [],
  );

  return !isLoading ? (
    <TableComponent
      columns={columns}
      data={data?.data.data?.cities}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updateCitiesState}
      refetch={refetch}
      mapBorderColors={mapCitiesToBorderColors}
      onRowClick={handleRowClick}
    />
  ) : (
    <Box className="flex justify-center items-center h-[80vh]">
      <CircularProgress />
    </Box>
  );
};

export { CitiesTable };
