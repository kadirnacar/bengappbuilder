import { Action, Reducer, ActionCreator } from 'redux';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from '../../Shared/store';
import { sessionService } from 'redux-react-session';
import config from '../../Shared/config';
import { fetchReq } from '../../Shared/Utils';

export interface SelectItemsState {
    isLoading: boolean;
    Currencies: any[];
}

export interface RequestCurrencyAction {
    type: 'REQUEST_CURRENCY';
}

export interface ReceiveCurrencyAction {
    type: 'RECEIVE_CURRENCY';
    Data: any;
}



export type KnownAction = RequestCurrencyAction | ReceiveCurrencyAction ;

export const actionCreators = {
    getCurrencies: (refresh = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        if (!state.select.Currencies || state.select.Currencies.length <= 1 || refresh == true) {

            let fetchTask = fetchReq(`${config.restUrl}/api/select/currency?portalId=${state.session.user.PORTALID}`, 'GET')
                .then((data) => {
                    dispatch({ type: 'RECEIVE_CURRENCY', Data: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_CURRENCY' });
        }
    }
};

const unloadedState: SelectItemsState = {
    Currencies: [],
    isLoading: false
};

export const reducer: Reducer<SelectItemsState> = (state: SelectItemsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CURRENCY':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_CURRENCY':
            return {
                ...state,
                Currencies: action.Data,
                isLoading: false
            };
       
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
