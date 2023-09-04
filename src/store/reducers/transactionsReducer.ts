import {
  ETransactionTypeFilter,
  ETransactionsActionType,
  IAddTransactionAutocompleteInputChange,
  IAddTransactionAutocompleteValues,
  IAddTransactionForm,
  IAddTransactionStateUpdate,
} from '../../types/transactionsTypes';
import {
  ETableActionType,
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
  addTransactionAutocompleteValues: IAddTransactionAutocompleteValues;
}

interface ITransactionsAction {
  type: ETableActionType | ETransactionsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | ETransactionTypeFilter
    | boolean
    | IAddTransactionStateUpdate
    | IAddTransactionAutocompleteInputChange;
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
    case ETransactionsActionType.addTransactionForm:
      const { name, fieldValue } = action.payload as IAddTransactionStateUpdate;
      return {
        ...state,
        addTransactionForm: {
          ...state.addTransactionForm,
          [name]: fieldValue,
        },
      };
    case ETransactionsActionType.addTransactionAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddTransactionAutocompleteInputChange;
      return {
        ...state,
        addTransactionAutocompleteValues: {
          ...state.addTransactionAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case ETransactionsActionType.resetTransactionFormData:
      return {
        ...state,
        addTransactionAutocompleteValues:
          addTransactionAutocompleteInitialValues,
        addTransactionForm: addTransactionsInitialFormData,
      };
    case ETableActionType.filterable:
      return {
        ...state,
        filterable: action.payload as ETransactionTypeFilter,
      };
    default:
      return state;
  }
};

export { transactionsReducer };
