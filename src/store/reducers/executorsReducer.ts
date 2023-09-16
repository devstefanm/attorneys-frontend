import {
  EExecutorsActionType,
  IAddExecutorAutocompleteValues,
  IAddExecutorForm,
} from '../../types/executorsTypes';
import {
  ETableActionType,
  IAddEntityAutocompleteInputChange,
  IAddNewEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import {
  addExecutorAutocompleteInitialValues,
  addExecutorsInitialFormData,
} from '../contexts/data/executorsInitialData';

export interface IExecutorsState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addExecutorForm: IAddExecutorForm;
  addExecutorModalOpen: boolean;
  addExecutorAutocompleteValues: IAddExecutorAutocompleteValues;
}

interface IExecutorsAction {
  type: ETableActionType | EExecutorsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddNewEntityStateUpdate
    | IAddEntityAutocompleteInputChange;
}

const executorsReducer = (
  state: IExecutorsState,
  action: IExecutorsAction,
): IExecutorsState => {
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
    case EExecutorsActionType.addExecutorModalOpen:
      return { ...state, addExecutorModalOpen: action.payload as boolean };
    case EExecutorsActionType.addExecutorForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addExecutorForm: {
          ...state.addExecutorForm,
          [name]: fieldValue,
        },
      };
    case EExecutorsActionType.addExecutorAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddEntityAutocompleteInputChange;
      return {
        ...state,
        addExecutorAutocompleteValues: {
          ...state.addExecutorAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case EExecutorsActionType.resetExecutorFormData:
      return {
        ...state,
        addExecutorAutocompleteValues: addExecutorAutocompleteInitialValues,
        addExecutorForm: addExecutorsInitialFormData,
      };
    default:
      return state;
  }
};

export { executorsReducer };
