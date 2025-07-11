import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';
import './Books.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const { books, loading, error } = useSelector(state => state.booksList);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(bookId));
    }
  };

  const filteredBooks = books?.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(books?.map(book => book.category))];

  if (loading) {
    return (
      <div className="books-container">
        <div className="container">
          <div className="spinner"></div>
          <p className="text-center">Loading your books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="books-container fade-in">
      <div className="container">
        <div className="books-header">
          <h1>My Book Collection</h1>
          <Link to="/add-book" className="btn btn-primary">
            + Add New Book
          </Link>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="books-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="filter-box">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="form-control"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredBooks?.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No books found</h3>
            <p>
              {books?.length === 0 
                ? "You haven't added any books yet. Start building your library!"
                : "No books match your search criteria."
              }
            </p>
            {books?.length === 0 && (
              <Link to="/add-book" className="btn btn-primary">
                Add Your First Book
              </Link>
            )}
          </div>
        ) : (
          <div className="books-grid">
            {filteredBooks?.map(book => (
              <div key={book._id} className="book-card">
                <div className="book-category">{book.category}</div>
                <div className="book-content">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <div className="book-meta">
                    <span className="book-date">
                      Added: {new Date(book.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="book-actions">
                  <Link 
                    to={`/edit-book/${book._id}`} 
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBooks?.length > 0 && (
          <div className="books-stats">
            <p>
              Showing {filteredBooks.length} of {books?.length} books
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksList;
