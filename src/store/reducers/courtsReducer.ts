import {
  ECourtsActionType,
  IAddCourtForm,
  IEditCourtForm,
  IEditedCourtFormData,
} from '../../types/courtsTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  IEditEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import { addCourtsInitialFormData } from '../contexts/data/courtsInitialData';

export interface ICourtsState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addCourtForm: IAddCourtForm;
  addCourtModalOpen: boolean;
  editCourtModalOpen: boolean;
  editCourtForm: IEditCourtForm;
  editedCourtFormData: IEditedCourtFormData;
  editCourtId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface ICourtsAction {
  type: ETableActionType | ECourtsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | boolean
    | number;
}

const courtsReducer = (
  state: ICourtsState,
  action: ICourtsAction,
): ICourtsState => {
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
    case ECourtsActionType.addCourtModalOpen:
      return { ...state, addCourtModalOpen: action.payload as boolean };
    case ECourtsActionType.editCourtModalOpen:
      return { ...state, editCourtModalOpen: action.payload as boolean };
    case ECourtsActionType.addCourtForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addCourtForm: {
          ...state.addCourtForm,
          [name]: fieldValue,
        },
      };
    case ECourtsActionType.setCourtFormData:
      return {
        ...state,
        editCourtForm: action.payload as IEditCourtForm,
      };
    case ECourtsActionType.editCourtForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editCourtForm: {
          ...state.editCourtForm,
          [editName]: fieldEditValue,
        },
        editedCourtFormData: {
          ...state.editedCourtFormData,
          [editName]: fieldEditValue,
        },
      };
    case ECourtsActionType.editCourtId:
      return { ...state, editCourtId: action.payload as number };
    case ECourtsActionType.resetCourtFormData:
      return {
        ...state,
        addCourtForm: addCourtsInitialFormData,
        editCourtForm: addCourtsInitialFormData,
        editCourtId: null,
        editedCourtFormData: {},
      };
    case ECourtsActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case ECourtsActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case ECourtsActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { courtsReducer };
