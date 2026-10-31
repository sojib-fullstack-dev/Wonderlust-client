const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">

            {/* Spinner */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 border-r-emerald-400 border-b-transparent border-l-transparent animate-spin"></div>
            </div>

            {/* Text */}
            <div className="mt-6 text-center space-y-1">
                <h2 className="font-bold text-lg text-emerald-600">Loading...</h2>
                <p className="text-gray-400 text-sm">Please wait a moment</p>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>

        </div>
    );
};

export default Loading;