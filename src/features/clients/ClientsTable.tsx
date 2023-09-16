import { TableComponent } from '../../components/TableComponent';
import {
  IClientsTableData,
  IClientsListQueryParams,
  IClientsTableHeader,
} from '../../types/clientsTypes';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetClientsListQuery from '../../hooks/queries/clients/useGetClientsListQuery';
import { useClients } from '../../store/contexts/ClientsContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapClientsToBorderColors } from './helpers/clientsHelpers';

const clientsTableHeaders: IClientsTableHeader = {
  client: 'client',
  numberOfCases: 'numberOfCases',
};

const ClientsTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateClientsState,
  } = useClients();

  let queryParams: IClientsListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetClientsListQuery({
    ...queryParams,
    ...searchParams,
  });

  const columns = React.useMemo<ColumnDef<IClientsTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.client,
        id: clientsTableHeaders.client,
        header: () => (
          <span>{t(`entities.${[clientsTableHeaders.client]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfCases,
        id: clientsTableHeaders.numberOfCases,
        header: () => (
          <span>{t(`entities.${[clientsTableHeaders.numberOfCases]}`)}</span>
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
      data={data?.data.data?.clients}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updateClientsState}
      refetch={refetch}
      mapBorderColors={mapClientsToBorderColors}
    />
  ) : (
    <>Loading...</>
  );
};

export { ClientsTable };
