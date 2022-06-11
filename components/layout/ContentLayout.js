export default function ContentLayout({ children }) {
    return (
        <>
            <div className="md:w-screen-md lg:w-screen-lg px-6 mx-auto my-6 md:px-10 lg:px-45">
                <article className="inline">{children}</article>
            </div>
        </>
    )
}

export function CoverLayout({ children }) {
    return (
        <>
            <div className="md:w-screen-md lg:w-screen-lg mx-auto my-12 md:px-1 lg:px-15">
                <div className="relative h-56.25vw md:h-100 lg:h-140 overflow-hidden md:rounded-2xl z-0">
                {children}
                </div>
            </div>
        </>
    )
}