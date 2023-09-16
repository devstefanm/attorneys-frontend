import {
  ECasesActionType,
  EState,
  IAddCaseAutocompleteValues,
  IAddCaseForm,
  IEditCaseAutocompleteValues,
  IEditCaseForm,
  IEditedCaseFormData,
} from '../../types/casesTypes';
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
  addCaseAutocompleteInitialValues,
  addCasesInitialFormData,
  editCaseAutocompleteInitialValues,
  editCasesInitialFormData,
} from '../contexts/data/casesInitialData';

export interface ICasesState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
  filterable: EState;
  filterableByClient: number;
  addCaseModalOpen: boolean;
  editCaseModalOpen: boolean;
  isLegalEntity: boolean;
  addCaseForm: IAddCaseForm;
  addCaseAutocompleteValues: IAddCaseAutocompleteValues;
  editCaseForm: IEditCaseForm;
  editCaseAutocompleteValues: IEditCaseAutocompleteValues;
  editedCaseFormData: IEditedCaseFormData;
  editCaseId: number | null;
  confirmationDialogOpen: boolean;
}

interface ICasesAction {
  type: ETableActionType | ECasesActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | EState
    | boolean
    | IAddNewEntityStateUpdate
    | IAddEntityAutocompleteInputChange
    | IEditEntityAutocompleteInputChange
    | IEditEntityStateUpdate
    | IEditCaseForm
    | number;
}

const casesReducer = (
  state: ICasesState,
  action: ICasesAction,
): ICasesState => {
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
    case ECasesActionType.isLegalEntity:
      return { ...state, isLegalEntity: action.payload as boolean };
    case ECasesActionType.addCaseModalOpen:
      return { ...state, addCaseModalOpen: action.payload as boolean };
    case ECasesActionType.editCaseModalOpen:
      return { ...state, editCaseModalOpen: action.payload as boolean };
    case ECasesActionType.addCaseForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addCaseForm: {
          ...state.addCaseForm,
          [name]: fieldValue,
        },
      };
    case ECasesActionType.addCaseAutocompleteValues:
      const { inputName, inputValue } =
        action.payload as IAddEntityAutocompleteInputChange;
      return {
        ...state,
        addCaseAutocompleteValues: {
          ...state.addCaseAutocompleteValues,
          [inputName]: inputValue,
        },
      };
    case ECasesActionType.resetCaseFormData:
      return {
        ...state,
        addCaseAutocompleteValues: addCaseAutocompleteInitialValues,
        addCaseForm: addCasesInitialFormData,
        editCaseForm: editCasesInitialFormData,
        editCaseAutocompleteValues: editCaseAutocompleteInitialValues,
        editCaseId: null,
        editedCaseFormData: {},
      };
    case ECasesActionType.setCaseFormData:
      return {
        ...state,
        editCaseForm: action.payload as IEditCaseForm,
      };
    case ETableActionType.filterable:
      return {
        ...state,
        filterable: action.payload as EState,
      };
    case ECasesActionType.editCaseAutocompleteValues:
      const { inputName: inputEditName, inputValue: inputEditValue } =
        action.payload as IEditEntityAutocompleteInputChange;
      return {
        ...state,
        editCaseAutocompleteValues: {
          ...state.editCaseAutocompleteValues,
          [inputEditName]: inputEditValue,
        },
      };
    case ECasesActionType.editCaseForm:
      const { editName, fieldEditValue } =
        action.payload as IEditEntityStateUpdate;
      return {
        ...state,
        editCaseForm: {
          ...state.editCaseForm,
          [editName]: fieldEditValue,
        },
        editedCaseFormData: {
          ...state.editedCaseFormData,
          [editName]: fieldEditValue,
        },
      };
    case ECasesActionType.editCaseId:
      return { ...state, editCaseId: action.payload as number };
    case ECasesActionType.confirmationDialogOpen:
      return { ...state, confirmationDialogOpen: action.payload as boolean };
    case ECasesActionType.filterableByClient:
      return { ...state, filterableByClient: action.payload as number };
    default:
      return state;
  }
};

export { casesReducer };
