import { getMediaCtx } from "../../lib/getMediaCtx"
import { NotionText } from "./NotionTextBlock"

const NotionVideo = ({ value }: { value: any }) => {
  const { src: videoSrc, caption: videoCaption } = getMediaCtx(value)

  return (
    <div className="my-6 overflow-hidden" data-aos="fade-up" data-aos-duration="800">
      <video className="rounded-2xl" src={videoSrc + '#t=0.01'} controls  />
      {videoCaption.length !== 0 && (<p className="my-2 text-center opacity-80">{<NotionText text={videoCaption} />} </p>)}
    </div>
  )
}

export default NotionVideo