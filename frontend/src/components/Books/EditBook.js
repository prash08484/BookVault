import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookDetails, updateBook } from '../../redux/actions/books/bookActions';
import './Books.css';

const EditBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: ''
  });
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { book, loading: detailLoading } = useSelector(state => state.bookDetails);
  const { loading, error, success } = useSelector(state => state.bookUpdate);

  useEffect(() => {
    if (!book || book._id !== id) {
      dispatch(fetchBookDetails(id));
    } else {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category
      });
    }
  }, [dispatch, id, book]);

  useEffect(() => {
    if (success) {
      navigate('/books');
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Book title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateBook(id, formData));
    }
  };

  const predefinedCategories = [
    'Fiction',
    'Non-Fiction', 
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Thriller',
    'Biography',
    'History',
    'Self-Help',
    'Technology',
    'Business',
    'Other'
  ];

  if (detailLoading) {
    return (
      <div className="book-form-container">
        <div className="container">
          <div className="spinner"></div>
          <p className="text-center">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-form-container fade-in">
      <div className="container">
        <div className="form-card">
          <div className="form-header">
            <h2>Edit Book</h2>
            <p>Update your book information</p>
          </div>
          
          <form onSubmit={handleSubmit} className="book-form">
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="title" className="form-label">Book Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="Enter the book title"
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="author" className="form-label">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`form-control ${errors.author ? 'error' : ''}`}
                placeholder="Enter the author's name"
              />
              {errors.author && <span className="error-text">{errors.author}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-control ${errors.category ? 'error' : ''}`}
              >
                <option value="">Select a category</option>
                {predefinedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/books')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    Updating Book...
                  </>
                ) : (
                  'Update Book'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
