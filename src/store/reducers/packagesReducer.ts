import {
  EPackagesActionType,
  IAddPackageForm,
} from '../../types/packagesTypes';
import {
  ETableActionType,
  IAddNewEntityStateUpdate,
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
}

interface IPackagesAction {
  type: ETableActionType | EPackagesActionType;
  payload?:
    | ITableSortable
    | ITablePageable
    | ITableSearchable
    | boolean
    | IAddNewEntityStateUpdate;
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
    case EPackagesActionType.addPackageForm:
      const { name, fieldValue } = action.payload as IAddNewEntityStateUpdate;
      return {
        ...state,
        addPackageForm: {
          ...state.addPackageForm,
          [name]: fieldValue,
        },
      };
    case EPackagesActionType.resetPackageFormData:
      return {
        ...state,
        addPackageForm: addPackagesInitialFormData,
      };
    default:
      return state;
  }
};

export { packagesReducer };
