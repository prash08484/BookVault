import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import userAuthReducer from '../reducers/userAuthReducer';
import userProfileReducer from '../reducers/userProfileReducer';
import userUpdateReducer from '../reducers/userUpdateReducer';
import createdBookReducer from '../reducers/books/createdBookReducer';
import booksListReducer from '../reducers/books/booksListReducer';
import bookDetailReducer from '../reducers/books/bookDetailsReducer';
import usersListReducer from '../reducers/usersListReducer';

const middleware = [thunk];

const reducer = combineReducers({
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  createdBook: createdBookReducer,
  booksList: booksListReducer,
  bookDetails: bookDetailReducer,
  bookUpdate: bookDetailReducer, // Using same reducer for update
  usersList: usersListReducer,
});

// Get the user from local storage
const userAuthFromStorage = localStorage.getItem('userAuthData')
  ? JSON.parse(localStorage.getItem('userAuthData'))
  : null;

const initialState = {
  userAuth: { userAuth: userAuthFromStorage },
};

// Enable Redux DevTools if available
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;