import {
  ESSNNumbersActionType,
  IAddSSNNumberForm,
  IEditSSNNumberForm,
  IEditedSSNNumberFormData,
} from '../../types/ssnNumbersTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  IEditEntityStateUpdate,
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
  editSSNNumberModalOpen: boolean;
  editSSNNumberForm: IEditSSNNumberForm;
  editedSSNNumberFormData: IEditedSSNNumberFormData;
  editSSNNumberId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface ISSNNumbersAction {
  type: ETableActionType | ESSNNumbersActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | IEditSSNNumberForm
    | boolean
    | number;
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
    case ESSNNumbersActionType.editSSNNumberModalOpen:
      return { ...state, editSSNNumberModalOpen: action.payload as boolean };
    case ESSNNumbersActionType.addSSNNumberForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addSSNNumberForm: {
          ...state.addSSNNumberForm,
          [name]: fieldValue,
        },
      };
    case ESSNNumbersActionType.setSSNNumberFormData:
      return {
        ...state,
        editSSNNumberForm: action.payload as IEditSSNNumberForm,
      };
    case ESSNNumbersActionType.editSSNNumberForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editSSNNumberForm: {
          ...state.editSSNNumberForm,
          [editName]: fieldEditValue,
        },
        editedSSNNumberFormData: {
          ...state.editedSSNNumberFormData,
          [editName]: fieldEditValue,
        },
      };
    case ESSNNumbersActionType.editSSNNumberId:
      return { ...state, editSSNNumberId: action.payload as number };
    case ESSNNumbersActionType.resetSSNNumberFormData:
      return {
        ...state,
        addSSNNumberForm: addSSNNumbersInitialFormData,
        editSSNNumberForm: addSSNNumbersInitialFormData,
        editSSNNumberId: null,
        editedSSNNumberFormData: {},
      };
    case ESSNNumbersActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case ESSNNumbersActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case ESSNNumbersActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { ssnNumbersReducer };
