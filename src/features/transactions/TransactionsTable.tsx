import { TableComponent } from '../../components/TableComponent';
import {
  ITransactionsTableData,
  ITransactionsListQueryParams,
  ITransactionsTableHeader,
} from '../../types/transactionsTypes';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetTransactionsListQuery from '../../hooks/queries/transactions/useGetTransactionsListQuery';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import { mapSearchToQueryParam } from '../../utils/transformData';

const transactionsTableHeaders: ITransactionsTableHeader = {
  type: 'type',
  amount: 'amount',
  postingMethod: 'postingMethod',
  paymentDate: 'paymentDate',
  caseNumber: 'caseNumber',
  excerptNumber: 'excerptNumber',
};

const TransactionsTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateTransactionsState,
  } = useTransactions();

  let queryParams: ITransactionsListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetTransactionsListQuery({
    ...queryParams,
    ...searchParams,
  });

  const columns = React.useMemo<ColumnDef<ITransactionsTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.caseNumber,
        id: transactionsTableHeaders.caseNumber,
        header: () => (
          <span>{t(`entities.${[transactionsTableHeaders.caseNumber]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.excerptNumber,
        id: transactionsTableHeaders.excerptNumber,
        header: () => (
          <span>
            {t(`entities.${[transactionsTableHeaders.excerptNumber]}`)}
          </span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.amount,
        id: transactionsTableHeaders.amount,
        header: () => (
          <span>{t(`entities.${[transactionsTableHeaders.amount]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.type,
        id: transactionsTableHeaders.type,
        header: () => (
          <span>{t(`entities.${[transactionsTableHeaders.type]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      {
        accessorFn: (row) => row.postingMethod,
        id: transactionsTableHeaders.postingMethod,
        header: () => (
          <span>
            {t(`entities.${[transactionsTableHeaders.postingMethod]}`)}
          </span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.paymentDate,
        id: transactionsTableHeaders.paymentDate,
        header: () => (
          <span>{t(`entities.${[transactionsTableHeaders.paymentDate]}`)}</span>
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
      data={data?.data.data?.transactions}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      updateState={updateTransactionsState}
      refetch={refetch}
    />
  ) : (
    <>Loading...</>
  );
};

export { TransactionsTable };
