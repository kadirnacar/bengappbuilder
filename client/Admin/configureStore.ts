import { createStore, applyMiddleware, compose, combineReducers, StoreEnhancer, Store, StoreEnhancerStoreCreator, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { ApplicationState, reducers } from './store';
import { History } from 'history';
import { sessionService } from 'redux-react-session';

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;
    const createStoreWithMiddleware: any = compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationState>;
    const options = { refreshOnCheckAuth: true, redirectPath: '/', driver: 'LOCALSTORAGE' };
    sessionService.initSessionService(store);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store/index', () => {
            const nextRootReducer = require('./store/index');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
        // Enable Webpack hot module replacement for reducers
        // module.hot.accept('./reducers', () => {
        //     const nextRootReducer = require('./reducers');
        //     store.replaceReducer(nextRootReducer);
        // });
    }
    store.subscribe(storeLocalStorage.bind(null, store));
    return store;
}
function storeLocalStorage(store) {
    //const state = store.getState();
    //localStorage.setItem("state", JSON.stringify(state));
}
const buildRootReducer = (allReducers): any => {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
