import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Star, BookOpen, Share2, Heart, CheckCircle2 } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = useSelector((state) => state.books.books.find((b) => b.id === id));

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-3xl font-bold text-zinc-900">Book Not Found</h2>
        <p className="mt-4 text-zinc-500">The book you are looking for doesn't exist or has been removed.</p>
        <Link
          to="/browse"
          className="mt-8 rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
        >
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <button
        onClick={() => navigate(-1)}
        className="group mb-12 flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Browse
      </button>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Book Cover */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 right-6 flex flex-col gap-3">
            <button className="rounded-full bg-white/90 p-3 text-zinc-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110">
              <Heart className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-white/90 p-3 text-zinc-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Book Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 uppercase tracking-widest">
              {book.category}
            </span>
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-zinc-900">{book.rating}</span>
              <span className="text-sm text-zinc-500">(1,248 reviews)</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">{book.title}</h1>
          <p className="mt-4 text-xl font-medium text-zinc-600">by {book.author}</p>

          <div className="mt-10 space-y-6">
            <h3 className="text-lg font-bold text-zinc-900">Description</h3>
            <p className="text-lg leading-relaxed text-zinc-500">{book.description}</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]">
              <BookOpen className="h-5 w-5" />
              Start Reading
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-zinc-200 bg-white px-8 py-4 text-sm font-bold text-zinc-900 transition-all hover:border-zinc-900 hover:bg-zinc-50">
              Add to Library
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-100 pt-12">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">Available</p>
                <p className="text-xs text-zinc-500">Ready for instant download</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">Format</p>
                <p className="text-xs text-zinc-500">EPUB, PDF, Audiobook</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetails;