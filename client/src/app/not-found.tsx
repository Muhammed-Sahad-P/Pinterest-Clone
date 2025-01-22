import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
            <div className="text-center px-6 py-10">
                <h1 className="text-4xl font-extrabold text-black dark:text-gray-100 tracking-widest sm:text-4xl">
                    404
                </h1>
                <p className="mt-4 text-lg md:text-2xl font-semibold text-gray-600 dark:text-gray-400">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    It might have been removed or is temporarily unavailable.
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
                        <Image
                            src="/404.png"
                            alt="404 illustration"
                            width={200}
                            height={200}
                            className="rounded-md"
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <Link href="/">
                        <p className="inline-block px-4 py-3 text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-500 transition duration-300 rounded-xl shadow-lg">
                            Go Back Home
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
