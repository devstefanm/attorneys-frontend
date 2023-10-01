import {
  EEmployersActionType,
  IAddEmployerForm,
  IEditEmployerForm,
  IEditedEmployerFormData,
} from '../../types/employersTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  IEditEntityStateUpdate,
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
  editEmployerModalOpen: boolean;
  editEmployerForm: IEditEmployerForm;
  editedEmployerFormData: IEditedEmployerFormData;
  editEmployerId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface IEmployersAction {
  type: ETableActionType | EEmployersActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | boolean
    | number;
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
    case EEmployersActionType.editEmployerModalOpen:
      return { ...state, editEmployerModalOpen: action.payload as boolean };
    case EEmployersActionType.addEmployerForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addEmployerForm: {
          ...state.addEmployerForm,
          [name]: fieldValue,
        },
      };
    case EEmployersActionType.setEmployerFormData:
      return {
        ...state,
        editEmployerForm: action.payload as IEditEmployerForm,
      };
    case EEmployersActionType.editEmployerForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editEmployerForm: {
          ...state.editEmployerForm,
          [editName]: fieldEditValue,
        },
        editedEmployerFormData: {
          ...state.editedEmployerFormData,
          [editName]: fieldEditValue,
        },
      };
    case EEmployersActionType.editEmployerId:
      return { ...state, editEmployerId: action.payload as number };
    case EEmployersActionType.resetEmployerFormData:
      return {
        ...state,
        addEmployerForm: addEmployersInitialFormData,
        editEmployerForm: addEmployersInitialFormData,
        editEmployerId: null,
        editedEmployerFormData: {},
      };
    case EEmployersActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case EEmployersActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case EEmployersActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { employersReducer };
