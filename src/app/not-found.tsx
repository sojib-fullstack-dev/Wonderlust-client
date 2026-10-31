



import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-white px-4">

            <div className="text-center space-y-4 max-w-md">

                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                    Error 404
                </p>

                <h1 className="text-7xl font-extrabold text-gray-900">
                    404
                </h1>

                <h2 className="text-2xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed">
                    The page you are looking for does not exist or has been moved.
                </p>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition duration-200"
                    >
                        ← Back to Home
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default NotFound;