
import * as React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { sessionService } from 'redux-react-session';

import Config from '../Shared/config';

const routeList = {
  '/': 'Anasayfa'
};

export default routeList;
