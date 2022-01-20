export default function ListLayout({ children }) {
  return (
    <>
      <div className="mx-auto w-92 lg:px-11 md:px-5 md:w-screen-md lg:w-screen-lg">
        <>{children}</>
      </div>
    </>
  )
}