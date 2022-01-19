import Navbar from '../Navbar'
import Footer from '../Footer'

export default function BlogLayout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-true-gray-50">
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
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}