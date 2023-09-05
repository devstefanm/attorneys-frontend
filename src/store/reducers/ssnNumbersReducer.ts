import {
  ESSNNumbersActionType,
  IAddSSNNumberForm,
  IAddSSNNumberStateUpdate,
} from '../../types/ssnNumbersTypes';
import {
  ETableActionType,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import { addSSNNumbersInitialFormData } from '../contexts/data/ssnNumbersInitialData';

export interface ISSNNumbersState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addSSNNumberForm: IAddSSNNumberForm;
  addSSNNumberModalOpen: boolean;
}

interface ISSNNumbersAction {
  type: ETableActionType | ESSNNumbersActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddSSNNumberStateUpdate;
}

const ssnNumbersReducer = (
  state: ISSNNumbersState,
  action: ISSNNumbersAction,
): ISSNNumbersState => {
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
    case ESSNNumbersActionType.addSSNNumberModalOpen:
      return { ...state, addSSNNumberModalOpen: action.payload as boolean };
    case ESSNNumbersActionType.addSSNNumberForm:
      const { name, fieldValue } = action.payload as IAddSSNNumberStateUpdate;
      return {
        ...state,
        addSSNNumberForm: {
          ...state.addSSNNumberForm,
          [name]: fieldValue,
        },
      };
    case ESSNNumbersActionType.resetSSNNumberFormData:
      return {
        ...state,
        addSSNNumberForm: addSSNNumbersInitialFormData,
      };
    default:
      return state;
  }
};

export { ssnNumbersReducer };
