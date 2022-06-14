import { createRef } from "react";

export function Tooltip({ children, tooltipText, marginTop }: any) {
    const tipRef: any = createRef();
    function handleMouseEnter() {
        tipRef.current.style.opacity = 1;
        tipRef.current.style.marginTop = marginTop ?? "5px";
    }
    function handleMouseLeave() {
        tipRef.current.style.opacity = 0;
        tipRef.current.style.marginTop = marginTop ?? "5px";
    }
    return (
        <div
            className="relative flex items-center text-xs"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute whitespace-no-wrap bg-gradient-to-r bg-white text-true-gray-500 px-3 py-1 rounded-2xl flex items-center transition-all shadow duration-200 right-0 top-full opacity-0 z-10" dark="bg-black"
                ref={tipRef}
            >
                {/* <div
                    className=" bg-white h-3 w-3 absolute right-2/11 z-0"
                    style={{ bottom: "-6px", transform: "rotate(45deg)" }}
                /> */}
                {tooltipText}
            </div>
            {children}
        </div>
    );
}