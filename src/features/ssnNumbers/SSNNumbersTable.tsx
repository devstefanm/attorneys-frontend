import { TableComponent } from '../../components/TableComponent';
import {
  ISSNNumbersTableData,
  ISSNNumbersListQueryParams,
  ISSNNumbersTableHeader,
  ESSNNumbersActionType,
} from '../../types/ssnNumbersTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetSSNNumbersListQuery from '../../hooks/queries/ssnNumbers/useGetSSNNumbersListQuery';
import { useSSNNumbers } from '../../store/contexts/SSNNumbersContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapSSNNumbersToBorderColors } from './helpers/ssnNumbersHelpers';
import { Box, CircularProgress } from '@mui/material';

const ssnNumbersTableHeaders: ISSNNumbersTableHeader = {
  ssn: 'ssn',
  numberOfCases: 'numberOfCases',
};

const SSNNumbersTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateSSNNumbersState,
  } = useSSNNumbers();

  let queryParams: ISSNNumbersListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetSSNNumbersListQuery({
    ...queryParams,
    ...searchParams,
  });

  const handleRowClick = (row: Row<ISSNNumbersTableData>) => {
    const { id } = row.original;

    if (id) {
      updateSSNNumbersState({
        type: ESSNNumbersActionType.editSSNNumberId,
        payload: id,
      });

      updateSSNNumbersState({
        type: ESSNNumbersActionType.editSSNNumberModalOpen,
        payload: true,
      });
    }
  };

  const columns = React.useMemo<ColumnDef<ISSNNumbersTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.ssn,
        id: ssnNumbersTableHeaders.ssn,
        header: () => (
          <span>{t(`entities.${[ssnNumbersTableHeaders.ssn]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfCases,
        id: ssnNumbersTableHeaders.numberOfCases,
        header: () => (
          <span>{t(`entities.${[ssnNumbersTableHeaders.numberOfCases]}`)}</span>
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
      data={data?.data.data?.ssn_numbers}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updateSSNNumbersState}
      refetch={refetch}
      mapBorderColors={mapSSNNumbersToBorderColors}
      onRowClick={handleRowClick}
    />
  ) : (
    <Box className="flex justify-center items-center h-[80vh]">
      <CircularProgress />
    </Box>
  );
};

export { SSNNumbersTable };
