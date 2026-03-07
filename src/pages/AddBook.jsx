import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../store/app';
import { TbImageInPicture } from 'react-icons/tb';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const categories = ['Fiction', 'Non-Fiction', 'Sci-Fi'];

function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'Fiction',
    rating: 4.5,
    coverImage: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newBook = {
        ...formData,
        id: Date.now().toString(),
        coverImage: formData.coverImage || `https://picsum.photos/seed/${formData.title}/400/600`,
      };

      dispatch(addBook(newBook));
      setIsSubmitting(false);
      navigate('/browse');
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">

      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Add a New Book
        </h1>
        <p className="mt-4 text-zinc-500">
          Share a new story with our community. Fill in the details below to add a book to the library.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl sm:p-12">

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title + Author */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Book Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. The Great Gatsby"
                className={`w-full rounded-2xl border ${errors.title ? 'border-red-500' : 'border-zinc-200'} px-4 py-3 text-sm`}
              />
              {errors.title && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <FiAlertCircle className="h-3 w-3" /> {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Author Name</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. F. Scott Fitzgerald"
                className={`w-full rounded-2xl border ${errors.author ? 'border-red-500' : 'border-zinc-200'} px-4 py-3 text-sm`}
              />
              {errors.author && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <FiAlertCircle className="h-3 w-3" /> {errors.author}
                </p>
              )}
            </div>

          </div>

          {/* Category + Rating */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Rating</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm"
              />
            </div>

          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900">
              Cover Image URL
            </label>

            <div className="relative">
              <TbImageInPicture className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 py-3 pl-12 pr-4 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className={`w-full rounded-2xl border ${errors.description ? 'border-red-500' : 'border-zinc-200'} px-4 py-3 text-sm`}
            />

            {errors.description && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <FiAlertCircle className="h-3 w-3" /> {errors.description}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white hover:bg-indigo-500"
          >
            {isSubmitting ? "Adding Book..." : (
              <>
                <AiOutlinePlusCircle className="h-5 w-5" />
                Add to Library
              </>
            )}
          </button>

        </form>

      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">

        <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
          <FaRegCheckCircle className="text-emerald-600" />
          <span className="text-xs font-bold text-zinc-600">Instant Publishing</span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
          <FaRegCheckCircle className="text-emerald-600" />
          <span className="text-xs font-bold text-zinc-600">Global Accessibility</span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
          <FaRegCheckCircle className="text-emerald-600" />
          <span className="text-xs font-bold text-zinc-600">Community Driven</span>
        </div>

      </div>

    </div>
  );
}

export default AddBook;