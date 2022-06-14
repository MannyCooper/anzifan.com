import { NextSeo, ArticleJsonLd } from 'next-seo';
import { me } from '../config/me';
import { FC } from 'react';

type PostSeoProps = {
    author?: string,
    date: Date,
    description: string,
    image: string,
    locale: string,
    title: string,
    url: string,
}

const PostSeo: FC<PostSeoProps> = ({
    author = "异次元de机智君",
    date,
    description,
    image,
    locale = 'zh-CN',
    title,
    url,
}) => {
    const publishedAt = new Date(date).toISOString();
    const featuredImage = {
        url: image ? `${image}` : `${me.site}/static/images/og.png`,
        alt: title,
    }
    return (
        <>
            <NextSeo
                title={`${title} | 异次元de机智君`}
                description={description}
                canonical={url}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: publishedAt,
                    },
                    locale,
                    url,
                    title,
                    description: description,
                    images: [featuredImage],
                }}
            />
            <ArticleJsonLd
                authorName={author}
                dateModified={publishedAt}
                datePublished={publishedAt}
                description={description}
                images={[featuredImage.toString()]}
                publisherLogo='/android-chrome-192x192.png'
                publisherName={author}
                title={title}
                url={url}
            />
        </>
    )
}

export default PostSeo