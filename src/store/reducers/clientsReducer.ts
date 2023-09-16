import { EClientsActionType, IAddClientForm } from '../../types/clientsTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import { addClientsInitialFormData } from '../contexts/data/clientsInitialData';

export interface IClientsState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addClientForm: IAddClientForm;
  addClientModalOpen: boolean;
}

interface IClientsAction {
  type: ETableActionType | EClientsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddNewEntityStateUpdate;
}

const clientsReducer = (
  state: IClientsState,
  action: IClientsAction,
): IClientsState => {
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
    case EClientsActionType.addClientModalOpen:
      return { ...state, addClientModalOpen: action.payload as boolean };
    case EClientsActionType.addClientForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addClientForm: {
          ...state.addClientForm,
          [name]: fieldValue,
        },
      };
    case EClientsActionType.resetClientFormData:
      return {
        ...state,
        addClientForm: addClientsInitialFormData,
      };
    default:
      return state;
  }
};

export { clientsReducer };
