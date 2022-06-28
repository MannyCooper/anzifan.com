import Navbar from '../Navbar'
import Footer from '../Footer'
import { cloneElement, useState } from 'react'

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
      <div className="flex flex-col justify-start min-h-screen bg-white" dark="bg-black">
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
  const [toc, setToc] = useState(null)
  const tocChild = cloneElement(children, { setToc })
  return (
    <>
      <div className="min-h-screen bg-white" dark="bg-gradient-to-b from-true-gray-900 to-black">
        <Navbar toc={toc} />
        <main>{tocChild}</main>
        <Footer />
      </div>
    </>
  )
}