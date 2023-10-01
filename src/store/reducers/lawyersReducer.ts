import {
  ELawyersActionType,
  IAddLawyerAutocompleteValues,
  IAddLawyerForm,
  IEditLawyerForm,
  IEditedLawyerFormData,
} from '../../types/lawyersTypes';
import {
  ETableActionType,
  IAddEntityAutocompleteInputChange,
  IAddNewEntityStateUpdate,
  IEditEntityAutocompleteInputChange,
  IEditEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import {
  addLawyerAutocompleteInitialValues,
  addLawyersInitialFormData,
} from '../contexts/data/lawyersInitialData';

export interface ILawyersState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addLawyerForm: IAddLawyerForm;
  addLawyerModalOpen: boolean;
  editLawyerModalOpen: boolean;
  addLawyerAutocompleteValues: IAddLawyerAutocompleteValues;
  editLawyerAutocompleteValues: IAddLawyerAutocompleteValues;
  editLawyerForm: IEditLawyerForm;
  editedLawyerFormData: IEditedLawyerFormData;
  editLawyerId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface ILawyersAction {
  type: ETableActionType | ELawyersActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | IAddEntityAutocompleteInputChange
    | IAddNewEntityStateUpdate
    | IEditEntityStateUpdate
    | IEditLawyerForm
    | boolean
    | number;
}

const lawyersReducer = (
  state: ILawyersState,
  action: ILawyersAction,
): ILawyersState => {
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
    case ELawyersActionType.addLawyerModalOpen:
      return { ...state, addLawyerModalOpen: action.payload as boolean };
    case ELawyersActionType.editLawyerModalOpen:
      return { ...state, editLawyerModalOpen: action.payload as boolean };
    case ELawyersActionType.addLawyerForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addLawyerForm: {
          ...state.addLawyerForm,
          [name]: fieldValue,
        },
      };
    case ELawyersActionType.setLawyerFormData:
      return {
        ...state,
        editLawyerForm: action.payload as IEditLawyerForm,
      };
    case ELawyersActionType.editLawyerForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editLawyerForm: {
          ...state.editLawyerForm,
          [editName]: fieldEditValue,
        },
        editedLawyerFormData: {
          ...state.editedLawyerFormData,
          [editName]: fieldEditValue,
        },
      };
    case ELawyersActionType.editLawyerId:
      return { ...state, editLawyerId: action.payload as number };
    case ELawyersActionType.addLawyerAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddEntityAutocompleteInputChange;
      return {
        ...state,
        addLawyerAutocompleteValues: {
          ...state.addLawyerAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case ELawyersActionType.editLawyerAutocompleteValues:
      const { inputName: inputEditName, inputValue: inputEditValue } =
        action.payload as IEditEntityAutocompleteInputChange;
      return {
        ...state,
        editLawyerAutocompleteValues: {
          ...state.editLawyerAutocompleteValues,
          [inputEditName]: inputEditValue,
        },
      };
    case ELawyersActionType.resetLawyerFormData:
      return {
        ...state,
        addLawyerAutocompleteValues: addLawyerAutocompleteInitialValues,
        addLawyerForm: addLawyersInitialFormData,
        editLawyerForm: addLawyersInitialFormData,
        editLawyerAutocompleteValues: addLawyerAutocompleteInitialValues,
        editLawyerId: null,
        editedLawyerFormData: {},
      };
    case ELawyersActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case ELawyersActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case ELawyersActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { lawyersReducer };
