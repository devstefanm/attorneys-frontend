import { TableComponent } from '../../components/TableComponent';
import {
  ICourtsTableData,
  ICourtsListQueryParams,
  ICourtsTableHeader,
} from '../../types/courtsTypes';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useGetCourtsListQuery from '../../hooks/queries/courts/useGetCourtsListQuery';
import { useCourts } from '../../store/contexts/CourtsContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { mapCourtsToBorderColors } from './courtsHelpers';

const courtsTableHeaders: ICourtsTableHeader = {
  court: 'court',
  numberOfCases: 'numberOfCases',
};

const CourtsTable = () => {
  const { t } = useTranslation();

  const {
    state: {
      sortable: { sort, sortBy },
      pageable: { page, size },
      searchable,
    },
    dispatch: updateCourtsState,
  } = useCourts();

  let queryParams: ICourtsListQueryParams = {
    page,
    size,
    sort,
    sortBy,
  };

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const { data, isLoading, refetch } = useGetCourtsListQuery({
    ...queryParams,
    ...searchParams,
  });

  const columns = React.useMemo<ColumnDef<ICourtsTableData>[]>(
    () => [
      {
        accessorFn: (row) => row.court,
        id: courtsTableHeaders.court,
        header: () => (
          <span>{t(`entities.${[courtsTableHeaders.court]}`)}</span>
        ),
        cell: (info) => info.getValue(),
        isSearchable: true,
        isSortable: true,
      },
      {
        accessorFn: (row) => row.numberOfCases,
        id: courtsTableHeaders.numberOfCases,
        header: () => (
          <span>{t(`entities.${[courtsTableHeaders.numberOfCases]}`)}</span>
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
      data={data?.data.data?.courts}
      hasSearch={true}
      sort={sort}
      sortBy={sortBy}
      totalNumber={data?.data.data?.meta.total_number}
      page={page}
      size={size}
      borderKeyword="type"
      updateState={updateCourtsState}
      refetch={refetch}
      mapBorderColors={mapCourtsToBorderColors}
    />
  ) : (
    <>Loading...</>
  );
};

export { CourtsTable };
