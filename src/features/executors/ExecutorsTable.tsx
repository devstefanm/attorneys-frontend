import { TableComponent } from '../../components/TableComponent';
import {
  IExecutorsTableData,
  IExecutorsListQueryParams,
  IExecutorsTableHeader,
} from '../../types/executorsTypes';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetExecutorsListQuery from '../../hooks/queries/executors/useGetExecutorsListQuery';
import { useExecutors } from '../../store/contexts/ExecutorsContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapExecutorsToBorderColors } from './executorsHelpers';

const executorsTableHeaders: IExecutorsTableHeader = {
  name: 'name',
  city: 'city',
  displayPhoneNumber: 'displayPhoneNumber',
  phoneNumber: 'phoneNumber',
  numberOfCases: 'numberOfCases',
};

const ExecutorsTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateExecutorsState,
  } = useExecutors();

  let queryParams: IExecutorsListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetExecutorsListQuery({
    ...queryParams,
    ...searchParams,
  });

  const columns = React.useMemo<ColumnDef<IExecutorsTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: executorsTableHeaders.name,
        header: () => (
          <span>{t(`entities.${[executorsTableHeaders.name]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.displayPhoneNumber,
        id: executorsTableHeaders.displayPhoneNumber,
        header: () => (
          <span>{t(`entities.${[executorsTableHeaders.phoneNumber]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      {
        accessorFn: (row) => row.city,
        id: executorsTableHeaders.city,
        header: () => (
          <span>{t(`entities.${[executorsTableHeaders.city]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfCases,
        id: executorsTableHeaders.numberOfCases,
        header: () => (
          <span>{t(`entities.${[executorsTableHeaders.numberOfCases]}`)}</span>
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
      data={data?.data.data?.executors}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updateExecutorsState}
      refetch={refetch}
      mapBorderColors={mapExecutorsToBorderColors}
    />
  ) : (
    <>Loading...</>
  );
};

export { ExecutorsTable };
