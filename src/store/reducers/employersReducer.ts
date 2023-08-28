import {
  ETableActionType,
  ITablePageable,
  ITableSearchable,
  ITableSortable,
} from '../../types/universalTypes';

export interface IEmployersState {
  sortable: ITableSortable;
  pageable: ITablePageable;
  searchable: ITableSearchable[];
}

interface IEmployersAction {
  type: ETableActionType;
  payload?: ITableSortable | ITablePageable | ITableSearchable;
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
    default:
      return state;
  }
};

export { employersReducer };