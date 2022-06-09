import Navbar from '../Navbar'
import Footer from '../Footer'

export default function BlogLayout({ children }) {
  return (
    <>
      <div className="bg-true-gray-50" dark="bg-black">
        <Navbar />
        <main>{children}</main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}

export function BlogLayoutPure({ children }) {
  return (
    <>
      <div className="bg-white flex flex-col justify-start min-h-screen" dark="bg-black">
        <Navbar />
        <main>{children}</main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}

export function BlogLayoutWhite({ children }) {
  return (
    <>
      <div className="min-h-screen bg-white" dark="bg-gradient-to-b from-true-gray-900 to-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}