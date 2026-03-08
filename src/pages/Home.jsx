import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRegStar } from 'react-icons/fa';
import { LuBookMarked } from 'react-icons/lu';

const categories = ['Fiction', 'Non-Fiction', 'Sci-Fi'];

function Home() {
    const books = useSelector((state) => state.books.books);
    const popularBooks = books.slice(0, 4);

    return (
        <div className="space-y-16 py-8">

            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-20 text-center sm:px-16 sm:py-32">
                <div className="relative z-10 mx-auto max-w-2xl">

                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Discover Your Next <span className="text-indigo-400">Great Adventure</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-zinc-300">
                        Explore our vast collection of books across all genres. From timeless classics to modern masterpieces, your next favorite story is waiting.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/browse"
                            className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105"
                        >
                            Browse Collection
                        </Link>
                    </div>

                </div>

                {/* Decorative background */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.zinc.900))]" />
            </section>

            {/* Categories Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-zinc-900">Explore by Category</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <div key={category}>
                            <Link
                                to={`/browse/${category.toLowerCase()}`}
                                className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-indigo-600 hover:shadow-lg group"
                            >
                                <LuBookMarked className="mb-3 h-6 w-6 text-zinc-400 group-hover:text-indigo-600" />
                                <span className="text-sm font-medium text-zinc-900">{category}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Books Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-zinc-900">Popular Books</h2>

                    <Link
                        to="/browse"
                        className="group flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        View all
                        <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {popularBooks.map((book) => (
                        <div
                            key={book.id}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl"
                        >
                            <div className="aspect-[2/3] overflow-hidden bg-zinc-100">
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex items-center gap-1 mb-2">
                                    <FaRegStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-bold text-zinc-600">{book.rating}</span>
                                </div>

                                <h3 className="text-lg font-bold text-zinc-900 line-clamp-1">
                                    {book.title}
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">{book.author}</p>

                                <Link
                                    to={`/book/${book.id}`}
                                    className="mt-6 flex items-center justify-center rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Home;