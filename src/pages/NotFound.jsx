import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { TbAlertTriangleFilled } from 'react-icons/tb';

const NotFound = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="max-w-md w-full text-center" >
                <div className="inline-flex items-center justify-center p-6 bg-red-50 rounded-full mb-8">
                    <TbAlertTriangleFilled className="h-12 w-12 text-red-600" />
                </div>
                <h1 className="text-6xl font-black text-zinc-900 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">Page Not Found</h2>
                <p className="text-zinc-500 mb-8">
                    The requested URL <code className="bg-zinc-200 px-2 py-1 rounded text-zinc-900 font-mono text-sm">{location.pathname}</code> was not found on this server.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <IoMdHome className="h-5 w-5" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
