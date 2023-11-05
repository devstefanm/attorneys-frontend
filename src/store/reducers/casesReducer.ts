import {
  ECaseCategory,
  ECasesActionType,
  EState,
  IAddCaseAutocompleteValues,
  IAddCaseForm,
  ICasesExportChecklistValues,
  IEditCaseAutocompleteValues,
  IEditCaseForm,
  IEditedCaseFormData,
} from '../../types/casesTypes';
import {
  ETableActionType,
  IAddEntityAutocompleteInputChange,
  IAddNewEntityStateUpdate,
  ICasesExportChecklistStateUpdate,
  IEditEntityAutocompleteInputChange,
  IEditEntityStateUpdate,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';
import {
  addCaseAutocompleteInitialValues,
  addCasesInitialFormData,
  allCasesExportChecklistCheckedUnchecked,
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
  exportCasesDialogOpen: boolean;
  importCasesDialogOpen: boolean;
  isLegalEntity: boolean;
  addCaseForm: IAddCaseForm;
  addCaseAutocompleteValues: IAddCaseAutocompleteValues;
  editCaseForm: IEditCaseForm;
  editCaseAutocompleteValues: IEditCaseAutocompleteValues;
  editedCaseFormData: IEditedCaseFormData;
  editCaseId: number | null;
  confirmationDialogOpen: boolean;
  exportFileType: 'excel' | 'csv';
  downloadFile: boolean;
  casesExportChecklistValues: ICasesExportChecklistValues;
  casesFileForUpload: File | null;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
  hasObjection: boolean;
  caseCategory: ECaseCategory;
}

interface ICasesAction {
  type: ETableActionType | ECasesActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | EState
    | ECaseCategory
    | boolean
    | IAddNewEntityStateUpdate
    | IAddEntityAutocompleteInputChange
    | IEditEntityAutocompleteInputChange
    | IEditEntityStateUpdate
    | IEditCaseForm
    | number
    | 'excel'
    | 'csv'
    | ICasesExportChecklistStateUpdate
    | File
    | string[];
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
        casesFileForUpload: null,
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
    case ECasesActionType.exportCasesDialogOpen:
      return { ...state, exportCasesDialogOpen: action.payload as boolean };
    case ECasesActionType.importCasesDialogOpen:
      return { ...state, importCasesDialogOpen: action.payload as boolean };
    case ECasesActionType.filterableByClient:
      return { ...state, filterableByClient: action.payload as number };
    case ECasesActionType.exportFileType:
      return { ...state, exportFileType: action.payload as 'excel' | 'csv' };
    case ECasesActionType.downloadFile:
      return { ...state, downloadFile: action.payload as boolean };
    case ECasesActionType.casesExportChecklistValues:
      const { checkboxName, checkboxValue } =
        action.payload as ICasesExportChecklistStateUpdate;
      return {
        ...state,
        casesExportChecklistValues: {
          ...state.casesExportChecklistValues,
          [checkboxName]: checkboxValue,
        },
      };
    case ECasesActionType.casesCheckUncheckAll:
      return {
        ...state,
        casesExportChecklistValues: allCasesExportChecklistCheckedUnchecked(
          action.payload as boolean,
        ),
      };
    case ECasesActionType.casesFileForUpload:
      return {
        ...state,
        casesFileForUpload: action.payload as File,
      };
    case ECasesActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case ECasesActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case ECasesActionType.hasObjection:
      return { ...state, hasObjection: action.payload as boolean };
    case ECasesActionType.caseCategory:
      return { ...state, caseCategory: action.payload as ECaseCategory };
    default:
      return state;
  }
};

export { casesReducer };
