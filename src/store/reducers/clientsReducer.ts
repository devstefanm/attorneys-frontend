import {
  EClientsActionType,
  IAddClientForm,
  IEditClientForm,
  IEditedClientFormData,
} from '../../types/clientsTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  IEditEntityStateUpdate,
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
  editClientModalOpen: boolean;
  editClientForm: IEditClientForm;
  editedClientFormData: IEditedClientFormData;
  editClientId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface IClientsAction {
  type: ETableActionType | EClientsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | boolean
    | number;
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
    case EClientsActionType.editClientModalOpen:
      return { ...state, editClientModalOpen: action.payload as boolean };
    case EClientsActionType.addClientForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addClientForm: {
          ...state.addClientForm,
          [name]: fieldValue,
        },
      };
    case EClientsActionType.setClientFormData:
      return {
        ...state,
        editClientForm: action.payload as IEditClientForm,
      };
    case EClientsActionType.editClientForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editClientForm: {
          ...state.editClientForm,
          [editName]: fieldEditValue,
        },
        editedClientFormData: {
          ...state.editedClientFormData,
          [editName]: fieldEditValue,
        },
      };
    case EClientsActionType.editClientId:
      return { ...state, editClientId: action.payload as number };
    case EClientsActionType.resetClientFormData:
      return {
        ...state,
        addClientForm: addClientsInitialFormData,
        editClientForm: addClientsInitialFormData,
        editClientId: null,
        editedClientFormData: {},
      };
    case EClientsActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case EClientsActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case EClientsActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { clientsReducer };
