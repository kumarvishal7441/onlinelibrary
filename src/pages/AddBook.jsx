import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addBook } from '../store';
import { FaArrowLeft } from 'react-icons/fa';
import { GoPlusCircle } from 'react-icons/go';
import { FiAlertCircle } from 'react-icons/fi';

 function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    description: '',
    rating: '4.5',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
    
    const ratingNum = parseFloat(formData.rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newBook = {
        id: Date.now().toString(),
        title: formData.title,
        author: formData.author,
        category: formData.category,
        description: formData.description,
        rating: parseFloat(formData.rating),
      };

      dispatch(addBook(newBook));
      navigate('/books');
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 mb-8 hover:gap-3 transition-all">
        <FaArrowLeft size={16} /> Back to Home
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/5 overflow-hidden">
        <div className="bg-emerald-950 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-4xl font-serif italic font-bold mb-3">Add to Collection</h1>
            <p className="text-emerald-100/60">Share a new literary masterpiece with the Lumina community.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Book Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. The Midnight Library"
                className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all ${
                  errors.title ? 'border-red-200 focus:ring-red-500/10' : 'border-transparent focus:ring-emerald-500/10 focus:border-emerald-500'
                }`}
              />
              {errors.title && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><FiAlertCircle size={12} /> {errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Author Name</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Matt Haig"
                className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all ${
                  errors.author ? 'border-red-200 focus:ring-red-500/10' : 'border-transparent focus:ring-emerald-500/10 focus:border-emerald-500'
                }`}
              />
              {errors.author && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><FiAlertCircle size={12} /> {errors.author}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Sci-Fi</option>
                <option>Mystery</option>
                <option>Biography</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Initial Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all ${
                  errors.rating ? 'border-red-200 focus:ring-red-500/10' : 'border-transparent focus:ring-emerald-500/10 focus:border-emerald-500'
                }`}
              />
              {errors.rating && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><FiAlertCircle size={12} /> {errors.rating}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Provide a brief summary of the book..."
              className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all resize-none ${
                errors.description ? 'border-red-200 focus:ring-red-500/10' : 'border-transparent focus:ring-emerald-500/10 focus:border-emerald-500'
              }`}
            />
            {errors.description && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><FiAlertCircle size={12} /> {errors.description}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              isSubmitting 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-600/20'
            }`}
          >
            {isSubmitting ? (
              <>Adding to Library...</>
            ) : (
              <>
                <GoPlusCircle size={20} /> Add Book to Collection
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;