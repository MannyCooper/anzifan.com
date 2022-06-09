import { NextPage } from "next"
import ListLayout from "../components/layout/ListLayout"
import { friends, FriendType } from "../config/friends"
import { FC } from "react"
import Comment from "../components/Comment";
import Image from 'next/image'
import { Colors } from "../lib/colors"
import useSWRImmutable from 'swr/immutable'

const previewFetcher = (url: string) => fetch(`/api/bookmark/${encodeURIComponent(url)}`).then(res => res.json())

enum Status {
    online,
    offline,
    loading
}

const FriendCard: FC<FriendType> = friend => {
    const { data, error } = useSWRImmutable(friend.url, previewFetcher)
    const friendCard = (status: Status) => {
        return (
            <div className="flex items-center justify-center transition duration-200 ease-in-out transform bg-white shadow-lg h-55 lg:h-58 rounded-3xl hover:scale-105" dark="bg-true-gray-900">
                <div className="flex flex-col items-center justify-between h-full p-5">
                    <a href={friend.url} target="_blank" rel="noopener noreferrer">
                        {status === Status.loading ? <div className="w-20 h-20 rounded-full bg-true-gray-200 animate-pulse" dark="bg-true-gray-600" /> : 
                        <div className="w-20 h-20 rounded-full bg-true-gray-200 relative overflow-hidden" dark="bg-true-gray-600"><Image layout='fill' objectFit="cover" src={friend.img} alt={friend.url} />
                        </div>}
                    </a>
                    <div className="pb-2 text-center" >
                        <p className="leading-4">{friend.name}</p>
                        <div className="mt-1 text-sm text-true-gray-400">
                            {status !== Status.offline ?
                                <span className="flex items-center justify-center gap-1"><div className={`w-2 h-2 animate-pulse ${status === Status.online ? Colors['green'].bg.msg : Colors['yellow'].bg.msg} rounded-full`} />{status === Status.online ? "Online" : "Loading"}</span>
                                :
                                <span className="flex items-center justify-center gap-1"><div className={`w-2 h-2 ${Colors['red'].bg.msg} rounded-full`} />Offline</span>
                            }</div>
                    </div>
                    <a target="_blank" rel="noopener noreferrer" href={friend.url} className={`select-none rounded-full ${status === Status.online ? Colors['blue'].bg.msg : `${Colors['gray'].bg.msg} pointer-events-none`} text-white w-16 text-center text-sm p-1`} >
                        Visit
                    </a>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            friendCard(Status.offline)
        )
    }
    if (!data) {
        return (
            friendCard(Status.loading)
        )
    }

    // const { title, description, favicon, open_graph, oEmbed, twitter_card } = data
    // const images = open_graph?.images ?? twitter_card?.images ?? oEmbed?.thumbnails ?? []  
    // console.log(images)
    return (

        friendCard(Status.online)

    )
}

const Friends: NextPage = () => {

    return (
        <ListLayout>
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">Friends👾</h1>
            <p className="text-true-gray-400">我的朋友很少……(｡ì _ í｡)</p>
            <div className="grid grid-cols-2 gap-4 my-6 md:grid-cols-4 lg:grid-cols-5">
                {friends.map((friend: FriendType) => <FriendCard key={friend.name} {...friend} />)}
            </div>
            {/* <hr /> */}
            <p className="mt-12 text-center text-true-gray-400">👇扣1立即交友(不是)👇</p>
            <Comment />
        </ListLayout>
    )
}

export default Friends
