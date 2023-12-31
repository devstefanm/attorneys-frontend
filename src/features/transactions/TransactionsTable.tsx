import { TableComponent } from '../../components/TableComponent';
import {
  ITransactionsTableData,
  ITransactionsListQueryParams,
  ITransactionsTableHeader,
  ETransactionsActionType,
} from '../../types/transactionsTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetTransactionsListQuery from '../../hooks/queries/transactions/useGetTransactionsListQuery';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import {
  mapSearchToQueryParam,
  transformDateFormat,
} from '../../utils/transformData';
import { mapTypeToBorderColor } from './helpers/transactionsHelpers';
import { Box, CircularProgress } from '@mui/material';

const transactionsTableHeaders: ITransactionsTableHeader = {
  debtorsName: 'debtorsName',
  displayType: 'type',
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
      filterable,
      filterableDate,
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
    filter: filterable,
    filterableDate: filterableDate ? transformDateFormat(filterableDate) : null,
  });

  const handleRowClick = (row: Row<ITransactionsTableData>) => {
    const { id } = row.original;

    if (id) {
      updateTransactionsState({
        type: ETransactionsActionType.editTransactionId,
        payload: id,
      });

      updateTransactionsState({
        type: ETransactionsActionType.editTransactionModalOpen,
        payload: true,
      });
    }
  };

  React.useEffect(() => {
    updateTransactionsState({
      type: ETransactionsActionType.totalAmount,
      payload: data?.data.data?.total_amount,
    });
  }, [data?.data.data?.total_amount]);

  const columns = React.useMemo<ColumnDef<ITransactionsTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.debtorsName,
        id: transactionsTableHeaders.debtorsName,
        header: () => (
          <span>{t(`entities.${[transactionsTableHeaders.debtorsName]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
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
        accessorFn: (row) => row.displayType,
        id: transactionsTableHeaders.displayType,
        header: () => (
          <span>{t(`entities.${[transactionsTableHeaders.displayType]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSortable: true,
      },
      // {
      //   accessorFn: (row) => row.postingMethod,
      //   id: transactionsTableHeaders.postingMethod,
      //   header: () => (
      //     <span>
      //       {t(`entities.${[transactionsTableHeaders.postingMethod]}`)}
      //     </span>
      //   ),
      //   cell: (info) => info.getValue(),
      //   isSearchable: false,
      //   isSortable: true,
      // },
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
      borderKeyword="type"
      updateState={updateTransactionsState}
      refetch={refetch}
      mapBorderColors={mapTypeToBorderColor}
      onRowClick={handleRowClick}
    />
  ) : (
    <Box className="flex justify-center items-center h-[80vh]">
      <CircularProgress />
    </Box>
  );
};

export { TransactionsTable };
