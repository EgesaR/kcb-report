const ErrorPage = () => {
    return(
        <div className="w-full h-screen grid place-items-center text-black bg-white dark:text-white dark:bg-black">
            <div className="flex flex-row gap-4">
                <div className="text-xl text-red-400">
                    404
                </div>
                <div className="h-full w-12 rounded-lg bg-black dark:bg-white"></div>
                <div className="text-xl">
                    Page Not Found
                </div>
            </div>
        </div>
    )
}

export default ErrorPage