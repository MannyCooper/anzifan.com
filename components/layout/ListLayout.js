export default function ListLayout({ children }) {
  return (
    <div className="px-4 mt-6 sm:(max-w-none w-92 px-0 mx-auto) lg:px-11 md:px-5 md:w-screen-md lg:w-screen-lg">
      {/* <div className="mx-4 sm:mx-0"> */}
        {children}
      {/* </div> */}
    </div>
  )
}

export function FullListLayout({ children }) {
  return (
    <div className="my-6 sm:(max-w-none min-w-92 px-0 mx-auto) lg:px-11 md:px-5 md:w-screen-md lg:w-screen-lg">
      <div className="mx-4 md:mx-0">
        {children}
      </div>
    </div>
  )
}