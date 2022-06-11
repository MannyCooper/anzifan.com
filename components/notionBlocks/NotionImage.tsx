import { getMediaCtx } from "../../lib/getMediaCtx"
import Image from "next/image"
import { NotionText } from "./NotionTextBlock"
import { useState } from "react"

const NotionImage = ({ value }: { value: any }) => {
    let { src: imageSrc, caption: imageCaption, expire } = getMediaCtx(value)

    // Temporary solution for nested images in column_list

    // if (typeof (value.size === undefined)) {
    //     value.size = { width:0, height:0}
    // }

    const {
        size: { width, height },
    } = value

    // const [loaded, setLoaded] = useState(false);
    // const handleLoad = (event: any) => {
    //     event.persist();
    //     if (event.target.srcset) {
    //         setLoaded(true);
    //     }
    // };

    imageSrc = imageSrc.split('?')[0]

    return (
        <figure className="mx-auto my-6 max-w-11/12 rounded-2xl" data-aos="fade-up" data-aos-duration="800" >
            <div className={`${expire === null ? "flex justify-center" : ""} transition-all duration-800 ease-in-out rounded-2xl overflow-hidden relative w-full h-full`}
            // style={{
            //     opacity: loaded ? 1 : 0,
            //     transition: "opacity 1.1s cubic-bezier(0.4, 0, 0.25, 1) 0ms, background 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms",
            // }}
            >
                {width && height ? (
                    expire === null ? 
                    value.blur ?
                        <Image className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption} width={width} height={height}
                            placeholder="blur"
                            blurDataURL={value.blur}
                        // onLoad={handleLoad}
                        /> : <Image className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption} width={width} height={height} /> : <img className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption} width={width} height={height} />
                ) : (
                    <img className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption} />
                )}
            </div>
            {imageCaption.length !== 0 && (
                <figcaption>
                    <div className="my-2 text-sm text-center opacity-50 dark:opacity-70">
                        {<NotionText text={imageCaption} />}
                    </div>
                </figcaption>
            )}
        </figure>
    )
}

export default NotionImage