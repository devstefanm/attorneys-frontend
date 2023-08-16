import * as React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import {
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import {
  SearchOff,
  Search,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import {
  ETableActionType,
  IApiResponse,
  ISortingDirectionOptions,
} from '../types/universalTypes';
import debounce from 'lodash.debounce';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';
import i18n from '../libs/i18next/i18n';
import moment from 'moment';
import 'moment/src/locale/en-gb';
import 'moment/src/locale/sr';

interface ITableData {
  [key: string]: any;
}

type Props = {
  data: ITableData[] | undefined;
  columns: ColumnDef<any>[];
  hasSearch: boolean;
  sort: string;
  sortBy: string;
  page: number;
  size: number;
  totalNumber: number | undefined;
  borderKeyword: string;
  updateState: React.Dispatch<any>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<IApiResponse<any>, unknown>>;
  mapBorderColors: (status: string) => string;
};

type CustomColumnDef = ColumnDef<any> & {
  isSearchable?: boolean;
  isSortable?: boolean;
};

const asCustomColumnDef = <D extends object>(
  column: ColumnDef<D>,
): CustomColumnDef => column;

const TableComponent = (props: Props) => {
  const {
    data = [],
    columns,
    hasSearch,
    sort,
    sortBy,
    page,
    size,
    totalNumber,
    borderKeyword,
    updateState,
    refetch,
    mapBorderColors,
  } = props;

  const { t } = useTranslation();

  React.useEffect(() => {
    let language: string = 'sr';

    switch (i18n.language) {
      case 'us':
        language = 'en-gb';
        break;
      case 'sr-RS':
        language = 'sr';
        break;
      default:
        language = 'sr';
        break;
    }
    moment.locale(language);

    if (!initialRender.current) {
      refetch();
    } else {
      initialRender.current = false;
    }
  }, [i18n.language]);

  const initialRender = React.useRef(true);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: true,
  });

  const sortingDirectionOptions: ISortingDirectionOptions[] = [
    {
      previous: 'asc',
      next: 'desc',
    },
    {
      previous: 'desc',
      next: '',
    },
    {
      previous: '',
      next: 'asc',
    },
  ];

  const toggleSorting = (
    headerName: string | undefined,
    sortDirection: string,
    isSortable: boolean | undefined,
  ) => {
    if (isSortable) {
      sortingDirectionOptions.map((item) => {
        if (item.previous === sortDirection) {
          updateState({
            type: ETableActionType.sortable,
            payload: {
              sortBy: item.next === '' ? '' : headerName,
              sort: item.next,
            },
          });
        }
      });
    }
  };

  const sortingArrow = (header: string | undefined) => {
    if (header === sortBy) {
      if (sort) {
        return sort !== 'desc' ? (
          <ArrowDownward className="text-gray-500 w-4 ml-2" />
        ) : (
          <ArrowUpward className="text-gray-500 w-4 ml-2" />
        );
      }
    }
  };

  const handleSearch = (
    headerName: string | undefined,
    searchTerm: string,
    isSearchable: boolean | undefined,
  ) => {
    if (isSearchable) {
      updateState({
        type: ETableActionType.searchable,
        payload: {
          key: headerName,
          value: searchTerm,
        },
      });
      updateState({
        type: ETableActionType.pageable,
        payload: {
          page: 1,
          size,
          totalNumber,
        },
      });
    }
  };

  return (
    <ErrorBoundary>
      <React.Suspense>
        <Box className="w-full">
          <TableContainer
            className="shadow w-full h-[calc(100vh-132px)]"
            component={Paper}
          >
            <Table
              className="relative"
              sx={{ minWidth: 400 }}
              aria-label="table"
            >
              <TableHead className="sticky top-0 z-10 bg-[rgba(255,255,255,0.9)]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow className="h-12" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const customColumn = asCustomColumnDef(
                        header.column.columnDef,
                      );
                      return (
                        <TableCell
                          className="cursor-pointer pl-2 pb-1 text-[10px] 2xl:text-xs text-gray-500 uppercase shadow-sm unselectable"
                          key={header.id}
                          colSpan={header.colSpan}
                          onClick={() =>
                            toggleSorting(
                              header.id ?? header.column.columnDef.id,
                              sort,
                              customColumn.isSortable,
                            )
                          }
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {customColumn.isSortable &&
                                sortingArrow(
                                  header.id ?? header.column.columnDef.id,
                                )}
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                <TableRow>
                  {columns.map((column) => {
                    const customColumn = asCustomColumnDef(column);
                    return (
                      <TableCell className="p-2" key={column.id}>
                        {customColumn.isSearchable && hasSearch ? (
                          <TextField
                            variant="outlined"
                            size="small"
                            className="[&>*]:text-xs [&>div>input]:py-1 [&>div]:pl-2"
                            placeholder={`${t('search')}...`}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Search className="w-5" />
                                </InputAdornment>
                              ),
                            }}
                            onChange={debounce((event) => {
                              handleSearch(
                                column.id,
                                event.target.value,
                                customColumn.isSearchable,
                              );
                            }, 300)}
                          />
                        ) : (
                          <Box className="flex justify-start">
                            <SearchOff color="disabled" />
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody className="h-full overflow-auto">
                {data?.length !== 0 &&
                  table?.getRowModel().rows?.map((row) => {
                    return (
                      <TableRow
                        className="odd:bg-[#FBEBE9] border-l-4"
                        style={{
                          borderLeftColor: mapBorderColors(
                            row.original[borderKeyword],
                          ),
                        }}
                        key={row.id}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <TableCell
                              className="py-3 font-semibold text-gray-600 text-[11px] 2xl:text-sm"
                              key={cell.id}
                            >
                              {cell.column.id.toLowerCase().includes('date')
                                ? moment(
                                    flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    ) as string,
                                  ).format('MMMM D, YYYY HH:MM')
                                : flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            labelRowsPerPage={<span>{t('rowsPerPage')}</span>}
            labelDisplayedRows={({ from, to, count }) => {
              return `${from}-${to} ${t('of')} ${count}`;
            }}
            count={totalNumber ?? 0}
            rowsPerPage={size}
            page={page - 1}
            onPageChange={(_, page) => {
              console.log('page', page);
              updateState({
                type: ETableActionType.pageable,
                payload: {
                  page: page + 1,
                  size,
                  totalNumber,
                },
              });
            }}
            onRowsPerPageChange={(event) => {
              const size = event.target.value ? Number(event.target.value) : 25;
              updateState({
                type: ETableActionType.pageable,
                payload: {
                  page,
                  size,
                  totalNumber,
                },
              });
            }}
          />
        </Box>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { TableComponent };
