import { TableComponent } from '../../components/TableComponent';
import {
  ICasesFirstRowData,
  ICasesQueryParams,
  ICasesTableHeader,
} from '../../types/casesTypes';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetCasesListQuery from '../../hooks/queries/cases/useGetCasesListQuery';
import { useCases } from '../../store/contexts/CasesContext';
import { mapSearchToQueryParam } from '../../utils/transformData';

const casesFirstRowHeaders: ICasesTableHeader = {
  name: 'name',
  jmbg_pib: 'jmbg_pib',
  caseNumber: 'caseNumber',
  contractNumber: 'contractNumber',
  cession: 'cession',
  lawyer: 'lawyer',
  ssn: 'ssn',
  package: 'package',
  status: 'status',
  client: 'client',
  court: 'court',
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
  });

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
        accessorFn: (row) => row.cession,
        id: casesFirstRowHeaders.cession,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.cession]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.ssn,
        id: casesFirstRowHeaders.ssn,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.ssn]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.package,
        id: casesFirstRowHeaders.package,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.package]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.client,
        id: casesFirstRowHeaders.client,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.client]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.court,
        id: casesFirstRowHeaders.court,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.court]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.principal,
        id: casesFirstRowHeaders.principal,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.principal]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
        meta: {
          isNumeric: true,
        },
      },
      {
        accessorFn: (row) => row.interest,
        id: casesFirstRowHeaders.interest,
        header: () => (
          <span>{t(`entities.${[casesFirstRowHeaders.interest]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: false,
        isSortable: true,
        meta: {
          isNumeric: true,
        },
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
      updateState={updateCasesState}
      refetch={refetch}
    />
  ) : (
    <>Loading...</>
  );
};

export { CasesTable };
