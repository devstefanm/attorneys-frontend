import {
  IAddCaseAutocompleteInputChange,
  IAddCaseAutocompleteValues,
  IAddCaseForm,
  IAddCaseStateUpdate,
} from '../../types/casesTypes';
import {
  ETableActionType,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import {
  addCaseAutocompleteInitialValues,
  addCasesInitialFormData,
} from '../contexts/data/casesInitialData';

export interface ICasesState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addCaseModalOpen: boolean;
  isLegalEntity: boolean;
  addCaseForm: IAddCaseForm;
  addCaseAutocompleteValues: IAddCaseAutocompleteValues;
}

interface ICasesAction {
  type: ETableActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddCaseStateUpdate
    | IAddCaseAutocompleteInputChange;
}

const casesReducer = (
  state: ICasesState,
  action: ICasesAction,
): ICasesState => {
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
    case ETableActionType.isLegalEntity:
      return { ...state, isLegalEntity: action.payload as boolean };
    case ETableActionType.addCaseModalOpen:
      return { ...state, addCaseModalOpen: action.payload as boolean };
    case ETableActionType.addCaseForm:
      const { name, fieldValue } = action.payload as IAddCaseStateUpdate;
      return {
        ...state,
        addCaseForm: {
          ...state.addCaseForm,
          [name]: fieldValue,
        },
      };
    case ETableActionType.addCaseAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddCaseAutocompleteInputChange;
      return {
        ...state,
        addCaseAutocompleteValues: {
          ...state.addCaseAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case ETableActionType.resetCaseFormData:
      return {
        ...state,
        addCaseAutocompleteValues: addCaseAutocompleteInitialValues,
        addCaseForm: addCasesInitialFormData,
      };
    default:
      return state;
  }
};

export { casesReducer };
