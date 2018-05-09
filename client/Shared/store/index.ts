import { reducer as selectReducer, SelectItemsState } from '../reducers/SelectItems';
import { reducer as layoutReducer, LayoutState } from '../reducers/Layout';
import { sessionReducer } from 'redux-react-session';

export interface ApplicationState {
    select: SelectItemsState;
    session: any;
    layout: LayoutState;
}

export const reducers = {
    select: selectReducer,
    session: sessionReducer,
    layout: layoutReducer
};
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => any): void;
}