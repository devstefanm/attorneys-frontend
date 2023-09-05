import {
  ELawyersActionType,
  IAddLawyerAutocompleteInputChange,
  IAddLawyerAutocompleteValues,
  IAddLawyerForm,
  IAddLawyerStateUpdate,
} from '../../types/lawyersTypes';
import {
  ETableActionType,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import {
  addLawyerAutocompleteInitialValues,
  addLawyersInitialFormData,
} from '../contexts/data/lawyersInitialData';

export interface ILawyersState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addLawyerForm: IAddLawyerForm;
  addLawyerModalOpen: boolean;
  addLawyerAutocompleteValues: IAddLawyerAutocompleteValues;
}

interface ILawyersAction {
  type: ETableActionType | ELawyersActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddLawyerStateUpdate
    | IAddLawyerAutocompleteInputChange;
}

const lawyersReducer = (
  state: ILawyersState,
  action: ILawyersAction,
): ILawyersState => {
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
    case ELawyersActionType.addLawyerModalOpen:
      return { ...state, addLawyerModalOpen: action.payload as boolean };
    case ELawyersActionType.addLawyerForm:
      const { name, fieldValue } = action.payload as IAddLawyerStateUpdate;
      return {
        ...state,
        addLawyerForm: {
          ...state.addLawyerForm,
          [name]: fieldValue,
        },
      };
    case ELawyersActionType.addLawyerAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddLawyerAutocompleteInputChange;
      return {
        ...state,
        addLawyerAutocompleteValues: {
          ...state.addLawyerAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case ELawyersActionType.resetLawyerFormData:
      return {
        ...state,
        addLawyerAutocompleteValues: addLawyerAutocompleteInitialValues,
        addLawyerForm: addLawyersInitialFormData,
      };
    default:
      return state;
  }
};

export { lawyersReducer };
