import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import Link from 'next/link'

export const Section404 = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center mt-52"
      data-aos="fade-up"
    >
      <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="mb-8 text-gray-700">
        Looks like this page has been abducted by aliens 👽
      </p>
      <Link
        href="/"
        className={classNames(
          'rounded-xl px-4 py-2 font-bold text-white  focus:border focus:shadow focus:outline',
          colorMap['orange_background'],
          `hover:opacity-90`
        )}
      >
        Go Home
      </Link>
    </div>
  )
}
