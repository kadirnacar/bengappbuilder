import { reducer as selectReducer, SelectItemsState } from '../reducers/SelectItems';
import { sessionReducer } from 'redux-react-session';

export interface ApplicationState {
    select: SelectItemsState;
    session: any;
}

export const reducers = {
    select: selectReducer,
    session: sessionReducer
};
