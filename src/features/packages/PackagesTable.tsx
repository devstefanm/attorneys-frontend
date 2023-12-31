import { TableComponent } from '../../components/TableComponent';
import {
  IPackagesTableData,
  IPackagesListQueryParams,
  IPackagesTableHeader,
  EPackagesActionType,
} from '../../types/packagesTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetPackagesListQuery from '../../hooks/queries/packages/useGetPackagesListQuery';
import { usePackages } from '../../store/contexts/PackagesContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapPackagesToBorderColors } from './helpers/packagesHelpers';
import { Box, CircularProgress } from '@mui/material';

const packagesTableHeaders: IPackagesTableHeader = {
  packageName: 'packageName',
  numberOfCases: 'numberOfCases',
};

const PackagesTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updatePackagesState,
  } = usePackages();

  let queryParams: IPackagesListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetPackagesListQuery({
    ...queryParams,
    ...searchParams,
  });

  const handleRowClick = (row: Row<IPackagesTableData>) => {
    const { id } = row.original;

    if (id) {
      updatePackagesState({
        type: EPackagesActionType.editPackageId,
        payload: id,
      });

      updatePackagesState({
        type: EPackagesActionType.editPackageModalOpen,
        payload: true,
      });
    }
  };

  const columns = React.useMemo<ColumnDef<IPackagesTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.packageName,
        id: packagesTableHeaders.packageName,
        header: () => (
          <span>{t(`entities.${[packagesTableHeaders.packageName]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfCases,
        id: packagesTableHeaders.numberOfCases,
        header: () => (
          <span>{t(`entities.${[packagesTableHeaders.numberOfCases]}`)}</span>
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
      data={data?.data.data?.packages}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updatePackagesState}
      refetch={refetch}
      mapBorderColors={mapPackagesToBorderColors}
      onRowClick={handleRowClick}
    />
  ) : (
    <Box className="flex justify-center items-center h-[80vh]">
      <CircularProgress />
    </Box>
  );
};

export { PackagesTable };
