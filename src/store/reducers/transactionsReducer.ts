import { initialState } from './../contexts/TransactionsContext';
import { Moment } from 'moment';
import {
  ETransactionTypeFilter,
  ETransactionsActionType,
  IAddTransactionAutocompleteValues,
  IAddTransactionForm,
  IEditTransactionForm,
  IEditedTransactionFormData,
} from '../../types/transactionsTypes';
import {
  ETableActionType,
  IAddEntityAutocompleteInputChange,
  IAddNewEntityStateUpdate,
  IEditEntityAutocompleteInputChange,
  IEditEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import {
  addTransactionAutocompleteInitialValues,
  addTransactionsInitialFormData,
} from '../contexts/data/transactionsInitialData';

export interface ITransactionsState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  filterable: ETransactionTypeFilter;
  addTransactionForm: IAddTransactionForm;
  addTransactionModalOpen: boolean;
  editTransactionModalOpen: boolean;
  addTransactionAutocompleteValues: IAddTransactionAutocompleteValues;
  editTransactionAutocompleteValues: IAddTransactionAutocompleteValues;
  editTransactionForm: IEditTransactionForm;
  editedTransactionFormData: IEditedTransactionFormData;
  editTransactionId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
  exportFileType: 'excel' | 'csv';
  downloadFile: boolean;
  totalAmount: string;
  transactionsFileForUpload: File | null;
  importTransactionsDialogOpen: boolean;
  exportTransactionsDialogOpen: boolean;
  filterableDate: Moment | null;
}

interface ITransactionsAction {
  type: ETableActionType | ETransactionsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | ETransactionTypeFilter
    | IAddEntityAutocompleteInputChange
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | IEditTransactionForm
    | boolean
    | number
    | 'excel'
    | 'csv'
    | string
    | File
    | Moment
    | null;
}

const transactionsReducer = (
  state: ITransactionsState,
  action: ITransactionsAction,
): ITransactionsState => {
  switch (action.type) {
    case ETableActionType.sortable:
      return { ...state, sortable: action.payload as ITableSortable };
    case ETableActionType.pageable:
      return { ...state, pageable: action.payload as ITablePageable };
    case ETableActionType.searchable:
      const { key, value } = action.payload as ITableSearchable;
      const newState = state.searchable?.map((item) => {
        if (item.key === key) {
          return { ...item, value };
        }
        return item;
      });

      if (!state.searchable.some((item) => item.key === key)) {
        newState.push({ key, value });
      }

      return { ...state, searchable: newState };
    case ETransactionsActionType.addTransactionModalOpen:
      return { ...state, addTransactionModalOpen: action.payload as boolean };
    case ETransactionsActionType.editTransactionModalOpen:
      return { ...state, editTransactionModalOpen: action.payload as boolean };
    case ETransactionsActionType.addTransactionForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addTransactionForm: {
          ...state.addTransactionForm,
          [name]: fieldValue,
        },
      };
    case ETransactionsActionType.addTransactionAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddEntityAutocompleteInputChange;
      return {
        ...state,
        addTransactionAutocompleteValues: {
          ...state.addTransactionAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case ETransactionsActionType.editTransactionAutocompleteValues:
      const { inputName: inputEditName, inputValue: inputEditValue } =
        action.payload as IEditEntityAutocompleteInputChange;
      return {
        ...state,
        editTransactionAutocompleteValues: {
          ...state.editTransactionAutocompleteValues,
          [inputEditName]: inputEditValue,
        },
      };
    case ETransactionsActionType.setTransactionFormData:
      return {
        ...state,
        editTransactionForm: action.payload as IEditTransactionForm,
      };
    case ETransactionsActionType.editTransactionForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editTransactionForm: {
          ...state.editTransactionForm,
          [editName]: fieldEditValue,
        },
        editedTransactionFormData: {
          ...state.editedTransactionFormData,
          [editName]: fieldEditValue,
        },
      };
    case ETransactionsActionType.editTransactionId:
      return { ...state, editTransactionId: action.payload as number };
    case ETransactionsActionType.resetTransactionFormData:
      return {
        ...state,
        addTransactionAutocompleteValues:
          addTransactionAutocompleteInitialValues,
        addTransactionForm: addTransactionsInitialFormData,
        editTransactionForm: addTransactionsInitialFormData,
        editTransactionAutocompleteValues:
          addTransactionAutocompleteInitialValues,
        editTransactionId: null,
        editedTransactionFormData: {},
      };
    case ETableActionType.filterable:
      return {
        ...state,
        filterable: action.payload as ETransactionTypeFilter,
      };
    case ETransactionsActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case ETransactionsActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case ETransactionsActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    case ETransactionsActionType.totalAmount:
      return { ...state, totalAmount: action.payload as string };
    case ETransactionsActionType.exportFileType:
      return { ...state, exportFileType: action.payload as 'excel' | 'csv' };
    case ETransactionsActionType.downloadFile:
      return { ...state, downloadFile: action.payload as boolean };
    case ETransactionsActionType.transactionsFileForUpload:
      return {
        ...state,
        transactionsFileForUpload: action.payload as File,
      };
    case ETransactionsActionType.importTransactionsDialogOpen:
      return {
        ...state,
        importTransactionsDialogOpen: action.payload as boolean,
      };
    case ETransactionsActionType.exportTransactionsDialogOpen:
      return {
        ...state,
        exportTransactionsDialogOpen: action.payload as boolean,
      };
    case ETransactionsActionType.filterableDate:
      return {
        ...state,
        filterableDate: action.payload as Moment | null,
      };
    case ETransactionsActionType.resetTransactionStates:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export { transactionsReducer };
