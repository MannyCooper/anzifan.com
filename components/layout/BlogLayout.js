import Navbar from '../Navbar'
import Footer from '../Footer'

export default function BlogLayout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-true-gray-50" dark="bg-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export function BlogLayoutWhite({ children }) {
  return (
    <>
      <div className="min-h-screen bg-white" dark="bg-gradient-to-t from-true-gray-900 to-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}