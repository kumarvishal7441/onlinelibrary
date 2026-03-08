import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaFilter, FaRegStar, FaSearch } from 'react-icons/fa';

const categories = ['Fiction', 'Non-Fiction', 'Sci-Fi'];

function BrowseBooks() {
    const { category: categoryParam } = useParams();
    const books = useSelector((state) => state.books.books);
    const [searchQuery, setSearchQuery] = useState('');
    // add search functionality
    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesCategory =
                !categoryParam || book.category.toLowerCase() === categoryParam.toLowerCase();

            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [books, categoryParam, searchQuery]);

    return (
        <div className="py-8 space-y-8">
            {/* Header & Search */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                        {categoryParam
                            ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Books`
                            : 'Browse All Books'}
                    </h1>
                    <p className="mt-2 text-zinc-500">
                        Explore our collection of {filteredBooks.length} books.
                    </p>
                </div>

                <div className="relative max-w-md w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-zinc-900 shadow-sm transition-all focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/10"
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                <Link
                    to="/browse"
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${!categoryParam
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white text-zinc-600 border border-zinc-200 hover:border-indigo-600'
                        }`}
                >
                    All
                </Link>

                {categories.map((cat) => (
                    <Link
                        key={cat}
                        to={`/browse/${cat.toLowerCase()}`}
                        className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${categoryParam?.toLowerCase() === cat.toLowerCase()
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white text-zinc-600 border border-zinc-200 hover:border-indigo-600'
                            }`}
                    >
                        {cat}
                    </Link>
                ))}
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl"
                    >
                        <div className="aspect-[2/3] overflow-hidden bg-zinc-100">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                            />
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                                    {book.category}
                                </span>

                                <div className="flex items-center gap-1">
                                    <FaRegStar className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-bold text-zinc-600">
                                        {book.rating}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-base font-bold text-zinc-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                {book.title}
                            </h3>

                            <p className="mt-1 text-xs text-zinc-500">{book.author}</p>

                            <Link
                                to={`/book/${book.id}`}
                                className="mt-4 flex items-center justify-center rounded-xl bg-zinc-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-zinc-100 p-6 mb-4">
                        <FaFilter className="h-10 w-10 text-zinc-400" />
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900">No books found</h3>

                    <p className="mt-2 text-zinc-500 max-w-xs">
                        We couldn't find any books matching your criteria. Try adjusting
                        your search or filters.
                    </p>

                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default BrowseBooks;