import { FC } from "react"
import { Post } from "../lib/types"
import NotionCallout from "./notionBlocks/NotionCallout"
import moment from "moment";
import Sspai from '../assets/sspai.svg'

function generateText(texts: any[]) {
    return texts.map((text: any) => {
        return {
            "type": "text",
            "text": {
                "content": text.content,
                "link": text.link || null
            },
            "annotations": {
                "bold": text.bold || false,
                "italic": text.italic || false,
                "strikethrough": text.strikethrough || false,
                "underline": text.underline || false,
                "code": text.code || false,
                "color": text.color || "default"
            }
        }
    })
}

function generateCalloutValue(emoji: any, color: string, texts: any[]) {
    return {
        "icon": {
            "type": "emoji",
            "emoji": emoji
        },
        "color": color,
        "text": generateText(texts)
    }
}

const FrontMessage: FC<{ post: Post }> = ({ post }) => {
    const updateDate = moment(post.updateDate)
    const createDate = moment(post.date)
    const isOldBlog = createDate.isBefore(moment([2022, 5, 7]))
    const updateDaysPassed = isOldBlog ? moment().diff(createDate, "days") : moment().diff(updateDate, "days")

    const oldBlogMessage = generateCalloutValue("⚠️", "yellow_background", [
        { content: "This post is from the " },
        { content: "old blog", link: { url: `https://anzifan-old.vercel.app/post/${post.slug}` } },
        { content: ", so may not be presented at the best" }
    ]);

    const outDatedMessage = generateCalloutValue("⚠️", "orange_background", [
        { content: "This post was updated " },
        { content: `${updateDaysPassed}`, bold: true},
        { content: " days ago and some of the ideas may be out of date" }
    ]);

    const sspaiMessage = generateCalloutValue(<Sspai className="fill-white h-5 w-5 bg-red-500 rounded-full p-1" />, "red_background", [
        { content : "本文首发于 "},
        { content : "少数派", link: { url: post.sspai }},
        { content : " 🎉" }
    ])

    const tipMessage = generateCalloutValue("ℹ️", "blue_background", [{content: post.tip}]);

    return (
        <>
            {isOldBlog ?
                <NotionCallout value={oldBlogMessage} /> : null                
            }
            { updateDaysPassed > 365 ?
                <NotionCallout value={outDatedMessage} /> : null
            }
            {
                post.sspai !== "" ?  
                <NotionCallout value={sspaiMessage} /> 
                : null
            }
            {
                post.tip !== "" ?
                <NotionCallout value={tipMessage} /> : null
            }
        </>
    )
}

export default FrontMessage