
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
import * as moment from 'moment';
import 'moment/locale/tr';
import App from '../Shared/containers/App';
import Routes from './containers/Routes';
import history from '../Shared/store/history';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-day-picker/lib/style.css';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import 'react-telephone-input/css/default.css';
import 'loaders.css/loaders.min.css';
import 'react-table/react-table.css'
import 'rc-color-picker/assets/index.css';
import '../Shared/scss/style.scss';
import '../Shared/scss/core/_dropdown-menu-right.scss';
import '../Shared/public/flags.png';


const initialState = (window as any).initialReduxState;
const store = configureStore(history, initialState);
moment.locale('tr');

function renderApp(App) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App basename="/" >
                    <Routes />
                </App>
            </Provider>
        </AppContainer>,
        document.getElementById('react-root')
    );
}

renderApp(App);

// // Allow Hot Module Replacement
if (module.hot) {
    // module.hot.accept();
    // renderApp(App);

    module.hot.accept('../Shared/containers/App/index', () => {
        const App2 = require('../Shared/containers/App/index').default;
        // store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        renderApp(App2);
    });
}