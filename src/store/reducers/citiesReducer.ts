import {
  ECitiesActionType,
  IAddCityForm,
  IEditCityForm,
  IEditedCityFormData,
} from '../../types/citiesTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
  IEditEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import { addCitiesInitialFormData } from '../contexts/data/citiesInitialData';

export interface ICitiesState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addCityForm: IAddCityForm;
  addCityModalOpen: boolean;
  editCityModalOpen: boolean;
  editCityForm: IEditCityForm;
  editedCityFormData: IEditedCityFormData;
  editCityId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface ICitiesAction {
  type: ETableActionType | ECitiesActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | boolean
    | number;
}

const citiesReducer = (
  state: ICitiesState,
  action: ICitiesAction,
): ICitiesState => {
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
    case ECitiesActionType.addCityModalOpen:
      return { ...state, addCityModalOpen: action.payload as boolean };
    case ECitiesActionType.editCityModalOpen:
      return { ...state, editCityModalOpen: action.payload as boolean };
    case ECitiesActionType.addCityForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addCityForm: {
          ...state.addCityForm,
          [name]: fieldValue,
        },
      };
    case ECitiesActionType.setCityFormData:
      return {
        ...state,
        editCityForm: action.payload as IEditCityForm,
      };
    case ECitiesActionType.editCityForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editCityForm: {
          ...state.editCityForm,
          [editName]: fieldEditValue,
        },
        editedCityFormData: {
          ...state.editedCityFormData,
          [editName]: fieldEditValue,
        },
      };
    case ECitiesActionType.editCityId:
      return { ...state, editCityId: action.payload as number };
    case ECitiesActionType.resetCityFormData:
      return {
        ...state,
        addCityForm: addCitiesInitialFormData,
        editCityForm: addCitiesInitialFormData,
        editCityId: null,
        editedCityFormData: {},
      };
    case ECitiesActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case ECitiesActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case ECitiesActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { citiesReducer };
