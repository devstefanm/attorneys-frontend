import {
  EEmployersActionType,
  IAddEmployerForm,
} from '../../types/employersTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import { addEmployersInitialFormData } from '../contexts/data/employersInitialData';

export interface IEmployersState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addEmployerForm: IAddEmployerForm;
  addEmployerModalOpen: boolean;
}

interface IEmployersAction {
  type: ETableActionType | EEmployersActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddNewEntityStateUpdate;
}

const employersReducer = (
  state: IEmployersState,
  action: IEmployersAction,
): IEmployersState => {
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
    case EEmployersActionType.addEmployerModalOpen:
      return { ...state, addEmployerModalOpen: action.payload as boolean };
    case EEmployersActionType.addEmployerForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addEmployerForm: {
          ...state.addEmployerForm,
          [name]: fieldValue,
        },
      };
    case EEmployersActionType.resetEmployerFormData:
      return {
        ...state,
        addEmployerForm: addEmployersInitialFormData,
      };
    default:
      return state;
  }
};

export { employersReducer };
