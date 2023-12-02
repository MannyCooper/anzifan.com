import { classNames } from '@/src/lib/util'

export const NavMenuIcon = ({ isFolded }: { isFolded: boolean }) => {
  return (
    <div className="flex h-full w-4 flex-col items-end justify-center gap-[3px]">
      <div
        className={classNames(
          'h-[2.5px] rounded-full bg-black transition-all duration-500 ease-in-out dark:bg-white',
          isFolded ? 'w-3/4' : 'w-full'
        )}
      />
      <div className="flex flex-row w-full">
        {/* <BsCaretRightFill
          className={classNames(
            'h-2 transition-all duration-500 ease-in-out',
            isFolded ? ' -ml-[2px] w-2' : ' w-0'
          )}
        /> */}
        <div className="flex w-4 flex-col items-end justify-center gap-[3px]">
          <div
            className={classNames(
              'h-[2.5px] rounded-full bg-black transition-all duration-500 ease-in-out dark:bg-white',
              isFolded ? 'w-full' : 'w-full'
            )}
          />
          <div
            className={classNames(
              'h-[2.5px] rounded-full bg-black transition-all duration-500 ease-in-out dark:bg-white',
              isFolded ? 'w-1/2' : 'w-full'
            )}
          />
        </div>
      </div>
    </div>
  )
}

const NavMenuIconArrow = ({
  isFolded,
  setIsFolded,
}: {
  isFolded: boolean
  setIsFolded: (isFolded: boolean) => void
}) => {
  ;<span
    className="relative z-10 flex items-center justify-center h-full transition duration-500 ease-out origin-center transform w-7 opacity-80"
    onClick={() => setIsFolded(!isFolded)}
  >
    <span
      className={classNames(
        'absolute right-1/2 top-1/2 block h-[2.5px] w-1/2 transform rounded-l bg-black transition-all duration-500 ease-in-out',
        !isFolded
          ? 'origin-bottom-right translate-y-full rotate-45'
          : 'origin-top-right -translate-y-full -rotate-45'
      )}
    ></span>
    <span
      className={classNames(
        'absolute left-1/2 top-1/2 block h-[2.5px] w-1/2 transform rounded-r bg-black transition-all duration-1000 ease-in-out',
        !isFolded
          ? 'origin-bottom-left translate-y-full -rotate-45'
          : 'origin-top-left -translate-y-full rotate-45'
      )}
    ></span>
  </span>
}
