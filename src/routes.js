/* eslint-disable linebreak-style */
import { CHAT_ROUTE, LOGIN_ROUTE } from './utils/consts';
import Chat from './components/Chat/Chat';
import Login from './components/Login';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
];
