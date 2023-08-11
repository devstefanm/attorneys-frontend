import { TableComponent } from '../../components/TableComponent';
import {
  ILawyersTableData,
  ILawyersListQueryParams,
  ILawyersTableHeader,
} from '../../types/lawyersTypes';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetLawyersListQuery from '../../hooks/queries/lawyers/useGetLawyersListQuery';
import { useLawyers } from '../../store/contexts/LawyersContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapLawyersToBorderColors } from './lawyersHelpers';

const lawyersTableHeaders: ILawyersTableHeader = {
  name: 'name',
  officeName: 'officeName',
  email: 'email',
  address: 'address',
  city: 'city',
  displayPhoneNumber: 'displayPhoneNumber',
  phoneNumber: 'phoneNumber',
  numberOfCases: 'numberOfCases',
};

const LawyersTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateLawyersState,
  } = useLawyers();

  let queryParams: ILawyersListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetLawyersListQuery({
    ...queryParams,
    ...searchParams,
  });

  const columns = React.useMemo<ColumnDef<ILawyersTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: lawyersTableHeaders.name,
        header: () => (
          <span>{t(`entities.${[lawyersTableHeaders.name]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.officeName,
        id: lawyersTableHeaders.officeName,
        header: () => (
          <span>{t(`entities.${[lawyersTableHeaders.officeName]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.email,
        id: lawyersTableHeaders.email,
        header: () => (
          <span>{t(`entities.${[lawyersTableHeaders.email]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.displayPhoneNumber,
        id: lawyersTableHeaders.displayPhoneNumber,
        header: () => (
          <span>{t(`entities.${[lawyersTableHeaders.phoneNumber]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      {
        accessorFn: (row) => row.address,
        id: lawyersTableHeaders.address,
        header: () => (
          <span>{t(`entities.${[lawyersTableHeaders.address]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.city,
        id: lawyersTableHeaders.city,
        header: () => (
          <span>{t(`entities.${[lawyersTableHeaders.city]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfCases,
        id: lawyersTableHeaders.numberOfCases,
        header: () => (
          <span>{t(`entities.${[lawyersTableHeaders.numberOfCases]}`)}</span>
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
      data={data?.data.data?.lawyers}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updateLawyersState}
      refetch={refetch}
      mapBorderColors={mapLawyersToBorderColors}
    />
  ) : (
    <>Loading...</>
  );
};

export { LawyersTable };
