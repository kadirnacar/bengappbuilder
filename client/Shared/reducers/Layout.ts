import { Action, Reducer, ActionCreator } from 'redux';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from '../../Shared/store';
import { sessionService } from 'redux-react-session';
import config from '../../Shared/config';
import { fetchReq } from '../../Shared/Utils';

export interface LayoutState {
    sidebarOpen: boolean;
    asideOpen: boolean;
}

export interface SidebarAction {
    type: 'TOGGLE_SIDEBAR';
    isOpen: boolean;
}

export interface AsideAction {
    type: 'TOGGLE_ASIDE';
    isOpen: boolean;
}



export type KnownAction = SidebarAction | AsideAction;

export const actionCreators = {
    toggleSidebar: (isOpen = null): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        dispatch({ type: 'TOGGLE_SIDEBAR', isOpen: isOpen == null ? !state.layout.sidebarOpen : isOpen });
    },
    toggleAside: (isOpen = null): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        dispatch({ type: 'TOGGLE_ASIDE', isOpen: isOpen == null ? !state.layout.asideOpen : isOpen });
    }
};

const unloadedState: LayoutState = {
    sidebarOpen: true,
    asideOpen: false
};

export const reducer: Reducer<LayoutState> = (state: LayoutState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                sidebarOpen: action.isOpen
            };
        case 'TOGGLE_ASIDE':
            return {
                ...state,
                asideOpen: action.isOpen
            };
        default:
            const exhaustiveCheck = action;
    }

    return state || unloadedState;
};
