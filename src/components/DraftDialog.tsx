import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

export const DraftDialog = () => {
  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Transition
      appear
      show={isOpen}
      as={'div'}
      className="fixed bottom-0 right-0 z-50 flex items-end justify-end w-full p-4 sm:p-6"
    >
      <Transition.Child
        as={'div'}
        className="relative bottom-0 right-0 max-w-sm p-6 overflow-hidden transition-all bg-white shadow-2xl rounded-2xl"
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Attention Attention 🙉
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {`This post is a draft. You can check it out, but it's not ready for the public yet.`}
          </p>
        </div>

        <div
          className="absolute top-0 right-0 p-2 cursor-pointer"
          onClick={closeModal}
        >
          <RxCross2 className="w-5 h-5 text-gray-400" />
        </div>
      </Transition.Child>
    </Transition>
  )
}
