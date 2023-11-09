import { TableComponent } from '../../components/TableComponent';
import {
  IEmployersTableData,
  IEmployersListQueryParams,
  IEmployersTableHeader,
  EEmployersActionType,
} from '../../types/employersTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetEmployersListQuery from '../../hooks/queries/employers/useGetEmployersListQuery';
import { useEmployers } from '../../store/contexts/EmployersContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapEmployersToBorderColors } from './helpers/employersHelpers';
import { Box, CircularProgress } from '@mui/material';

const employersTableHeaders: IEmployersTableHeader = {
  employer: 'employer',
  numberOfEmployees: 'numberOfEmployees',
};

const EmployersTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateEmployersState,
  } = useEmployers();

  let queryParams: IEmployersListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetEmployersListQuery({
    ...queryParams,
    ...searchParams,
  });

  const handleRowClick = (row: Row<IEmployersTableData>) => {
    const { id } = row.original;

    if (id) {
      updateEmployersState({
        type: EEmployersActionType.editEmployerId,
        payload: id,
      });

      updateEmployersState({
        type: EEmployersActionType.editEmployerModalOpen,
        payload: true,
      });
    }
  };

  const columns = React.useMemo<ColumnDef<IEmployersTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.employer,
        id: employersTableHeaders.employer,
        header: () => (
          <span>{t(`entities.${[employersTableHeaders.employer]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfEmployees,
        id: employersTableHeaders.numberOfEmployees,
        header: () => (
          <span>
            {t(`entities.${[employersTableHeaders.numberOfEmployees]}`)}
          </span>
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
      data={data?.data.data?.employers}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updateEmployersState}
      refetch={refetch}
      mapBorderColors={mapEmployersToBorderColors}
      onRowClick={handleRowClick}
    />
  ) : (
    <Box className="flex justify-center items-center h-[80vh]">
      <CircularProgress />
    </Box>
  );
};

export { EmployersTable };
