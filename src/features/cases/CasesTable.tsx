import { TableComponent } from '../../components/TableComponent';
import {
  ECasesActionType,
  ICasesFirstRowData,
  ICasesQueryParams,
  ICasesTableHeader,
} from '../../types/casesTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetCasesListQuery from '../../hooks/queries/cases/useGetCasesListQuery';
import { useCases } from '../../store/contexts/CasesContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapStatusToBorderColor } from './helpers/casesHelpers';

const casesFirstRowHeaders: ICasesTableHeader = {
  name: 'name',
  jmbg_pib: 'jmbg_pib',
  caseNumber: 'caseNumber',
  contractNumber: 'contractNumber',
  cession: 'cession',
  executors: 'executors',
  lawyer: 'lawyer',
  ssn: 'ssn',
  package: 'package',
  state: 'state',
  businessNumbers: 'businessNumbers',
  principal: 'principal',
  interest: 'interest',
};

const CasesTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
      filterable,
      filterableByClient,
    },
    dispatch: updateCasesState,
  } = useCases();

  let queryParams: ICasesQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetCasesListQuery({
    ...queryParams,
    ...searchParams,
    filter: filterable,
    clientsFilter: filterableByClient,
  });

  const handleRowClick = (row: Row<ICasesFirstRowData>) => {
    const { id } = row.original;

    if (id) {
      updateCasesState({
        type: ECasesActionType.editCaseId,
        payload: id,
      });

      updateCasesState({
        type: ECasesActionType.editCaseModalOpen,
        payload: true,
      });
    }
  };

  const columns = React.useMemo<ColumnDef<ICasesFirstRowData>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: casesFirstRowHeaders.name,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.name]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.jmbg_pib,
        id: casesFirstRowHeaders.jmbg_pib,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.jmbg_pib]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.caseNumber,
        id: casesFirstRowHeaders.caseNumber,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.caseNumber]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.contractNumber,
        id: casesFirstRowHeaders.contractNumber,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.contractNumber]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.businessNumbers,
        id: casesFirstRowHeaders.businessNumbers,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.businessNumbers]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.executors,
        id: casesFirstRowHeaders.executors,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.executors]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.lawyer,
        id: casesFirstRowHeaders.lawyer,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.lawyer]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.ssn,
        id: casesFirstRowHeaders.ssn,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.ssn]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.package,
        id: casesFirstRowHeaders.package,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.package]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
    ],
    [],
  );

  return !isLoading ? (
    <TableComponent
      columns={columns}
      data={data?.data.data?.cases}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="state"
      updateState={updateCasesState}
      refetch={refetch}
      mapBorderColors={mapStatusToBorderColor}
      onRowClick={handleRowClick}
    />
  ) : (
    <>Loading...</>
  );
};

export { CasesTable };
