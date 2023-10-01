import {
  EExecutorsActionType,
  IAddExecutorAutocompleteValues,
  IAddExecutorForm,
  IEditExecutorForm,
  IEditedExecutorFormData,
} from '../../types/executorsTypes';
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
  addExecutorAutocompleteInitialValues,
  addExecutorsInitialFormData,
} from '../contexts/data/executorsInitialData';

export interface IExecutorsState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  addExecutorForm: IAddExecutorForm;
  addExecutorModalOpen: boolean;
  editExecutorModalOpen: boolean;
  addExecutorAutocompleteValues: IAddExecutorAutocompleteValues;
  editExecutorForm: IEditExecutorForm;
  editExecutorAutocompleteValues: IAddExecutorAutocompleteValues;
  editedExecutorFormData: IEditedExecutorFormData;
  editExecutorId: number | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  confirmationDialogOpen: boolean;
}

interface IExecutorsAction {
  type: ETableActionType | EExecutorsActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | IAddNewEntityStateUpdate
    | IAddEntityAutocompleteInputChange
    | IEditEntityStateUpdate
    | IEditExecutorForm
    | boolean
    | number;
}

const executorsReducer = (
  state: IExecutorsState,
  action: IExecutorsAction,
): IExecutorsState => {
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
    case EExecutorsActionType.addExecutorModalOpen:
      return { ...state, addExecutorModalOpen: action.payload as boolean };
    case EExecutorsActionType.editExecutorModalOpen:
      return { ...state, editExecutorModalOpen: action.payload as boolean };
    case EExecutorsActionType.addExecutorForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addExecutorForm: {
          ...state.addExecutorForm,
          [name]: fieldValue,
        },
      };
    case EExecutorsActionType.addExecutorAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddEntityAutocompleteInputChange;
      return {
        ...state,
        addExecutorAutocompleteValues: {
          ...state.addExecutorAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case EExecutorsActionType.editExecutorAutocompleteValues:
      const { inputName: inputEditName, inputValue: inputEditValue } =
        action.payload as IEditEntityAutocompleteInputChange;
      return {
        ...state,
        editExecutorAutocompleteValues: {
          ...state.editExecutorAutocompleteValues,
          [inputEditName]: inputEditValue,
        },
      };
    case EExecutorsActionType.setExecutorFormData:
      return {
        ...state,
        editExecutorForm: action.payload as IEditExecutorForm,
      };
    case EExecutorsActionType.editExecutorForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editExecutorForm: {
          ...state.editExecutorForm,
          [editName]: fieldEditValue,
        },
        editedExecutorFormData: {
          ...state.editedExecutorFormData,
          [editName]: fieldEditValue,
        },
      };
    case EExecutorsActionType.editExecutorId:
      return { ...state, editExecutorId: action.payload as number };
    case EExecutorsActionType.resetExecutorFormData:
      return {
        ...state,
        addExecutorAutocompleteValues: addExecutorAutocompleteInitialValues,
        addExecutorForm: addExecutorsInitialFormData,
        editExecutorForm: addExecutorsInitialFormData,
        editExecutorAutocompleteValues: addExecutorAutocompleteInitialValues,
        editExecutorId: null,
        editedExecutorFormData: {},
      };
    case EExecutorsActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case EExecutorsActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case EExecutorsActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    default:
      return state;
  }
};

export { executorsReducer };
