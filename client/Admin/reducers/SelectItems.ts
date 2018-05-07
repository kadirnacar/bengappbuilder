import { Action, Reducer, ActionCreator } from 'redux';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from '../../Shared/store';
import { sessionService } from 'redux-react-session';
import config from '../../Shared/config';
import { fetchReq } from '../../Shared/Utils';

export interface SelectItemsState {
    isLoading: boolean;
    Currencies: any[];
    Categories: any[];
    Cities: any[];
    AirportCodes: any[];
}

export interface RequestCurrencyAction {
    type: 'REQUEST_CURRENCY';
}

export interface ReceiveCurrencyAction {
    type: 'RECEIVE_CURRENCY';
    Data: any;
}

export interface RequestCategoryAction {
    type: 'REQUEST_CATEGORY';
}

export interface ReceiveCategoryAction {
    type: 'RECEIVE_CATEGORY';
    Data: any;
}

export interface RequestCityAction {
    type: 'REQUEST_CITY';
}

export interface ReceiveCityAction {
    type: 'RECEIVE_CITY';
    Data: any;
}

export interface RequestAirportAction {
    type: 'REQUEST_AIRPORT';
}

export interface ReceiveAirportAction {
    type: 'RECEIVE_AIRPORT';
    Data: any;
}


export type KnownAction = RequestCurrencyAction | ReceiveCurrencyAction |
    RequestCategoryAction | ReceiveCategoryAction |
    RequestCityAction | ReceiveCityAction |
    RequestAirportAction | ReceiveAirportAction ;

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
    },
    getCategories: (refresh = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        if (!state.select.Currencies || state.select.Currencies.length <= 1 || refresh == true) {

            let fetchTask = fetchReq(`${config.restUrl}/api/select/category`, 'GET')
                .then((data) => {
                    dispatch({ type: 'RECEIVE_CATEGORY', Data: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_CATEGORY' });
        } else {
            return Promise.resolve(null);
        }
    },
    getCities: (refresh = false, query = ''): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        if (!state.select.Cities || state.select.Cities.length <= 1 || refresh == true) {

            let fetchTask = fetchReq(`${config.restUrl}/api/select/city`, 'GET')
                .then((data) => {
                    dispatch({ type: 'RECEIVE_CITY', Data: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_CITY' });
        } else {
            return Promise.resolve(null);
        }
    },
    getAirportCodes: (refresh = false, query = ''): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        if (!state.select.AirportCodes || state.select.AirportCodes.length <= 1 || refresh == true) {

            let fetchTask = fetchReq(`${config.restUrl}/api/select/airport`, 'GET')
                .then((data) => {
                    dispatch({ type: 'RECEIVE_AIRPORT', Data: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_AIRPORT' });
        } else {
            return Promise.resolve(null);
        }
    }
};

const unloadedState: SelectItemsState = {
    Currencies: [],
    Categories: [],
    Cities: [],
    AirportCodes: [],
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
        case 'REQUEST_CATEGORY':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_CATEGORY':
            return {
                ...state,
                Categories: action.Data,
                isLoading: false
            };
        case 'REQUEST_CITY':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_CITY':
            return {
                ...state,
                Cities: action.Data,
                isLoading: false
            };
        case 'REQUEST_AIRPORT':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_AIRPORT':
            return {
                ...state,
                AirportCodes: action.Data,
                isLoading: false
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
