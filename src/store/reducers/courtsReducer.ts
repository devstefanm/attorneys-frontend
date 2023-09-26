import { ECourtsActionType, IAddCourtForm } from '../../types/courtsTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
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
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
}

interface ICourtsAction {
  type: ETableActionType | ECourtsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddNewEntityStateUpdate;
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
    case ECourtsActionType.addCourtForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addCourtForm: {
          ...state.addCourtForm,
          [name]: fieldValue,
        },
      };
    case ECourtsActionType.resetCourtFormData:
      return {
        ...state,
        addCourtForm: addCourtsInitialFormData,
      };
    case ECourtsActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case ECourtsActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    default:
      return state;
  }
};

export { courtsReducer };
