import {
  EPackagesActionType,
  IAddPackageForm,
  IEditPackageForm,
  IEditedPackageFormData,
} from '../../types/packagesTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  IEditEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import { addPackagesInitialFormData } from '../contexts/data/packagesInitialData';

export interface IPackagesState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addPackageForm: IAddPackageForm;
  addPackageModalOpen: boolean;
  editPackageModalOpen: boolean;
  editPackageForm: IEditPackageForm;
  editedPackageFormData: IEditedPackageFormData;
  editPackageId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface IPackagesAction {
  type: ETableActionType | EPackagesActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | IEditPackageForm
    | boolean
    | number;
}

const packagesReducer = (
  state: IPackagesState,
  action: IPackagesAction,
): IPackagesState => {
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
    case EPackagesActionType.addPackageModalOpen:
      return { ...state, addPackageModalOpen: action.payload as boolean };
    case EPackagesActionType.editPackageModalOpen:
      return { ...state, editPackageModalOpen: action.payload as boolean };
    case EPackagesActionType.addPackageForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addPackageForm: {
          ...state.addPackageForm,
          [name]: fieldValue,
        },
      };
    case EPackagesActionType.setPackageFormData:
      return {
        ...state,
        editPackageForm: action.payload as IEditPackageForm,
      };
    case EPackagesActionType.editPackageForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editPackageForm: {
          ...state.editPackageForm,
          [editName]: fieldEditValue,
        },
        editedPackageFormData: {
          ...state.editedPackageFormData,
          [editName]: fieldEditValue,
        },
      };
    case EPackagesActionType.editPackageId:
      return { ...state, editPackageId: action.payload as number };
    case EPackagesActionType.resetPackageFormData:
      return {
        ...state,
        addPackageForm: addPackagesInitialFormData,
        editPackageForm: addPackagesInitialFormData,
        editPackageId: null,
        editedPackageFormData: {},
      };
    case EPackagesActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case EPackagesActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case EPackagesActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { packagesReducer };
