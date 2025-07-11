import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store/store';
import { loadUserFromStorage } from './redux/actions/users/userActions';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BooksList from './components/Books/BooksList';
import AddBook from './components/Books/AddBook';
import EditBook from './components/Books/EditBook';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app startup
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/books" 
              element={
                <ProtectedRoute>
                  <BooksList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-book" 
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-book/:id" 
              element={
                <ProtectedRoute>
                  <EditBook />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
