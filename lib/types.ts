export interface Post {
    id: string,
    slug: string,
    title: string,
    date: Date,
    updateDate: Date,
    cover: {light: string, dark: string, blurLight: any, blurDark: any},
    category: {name:string, color:string},
    tags: [{ name: string, color: string }],
    series: { name: string, color: string },
    excerpt: string,
    tip: string,
    sspai: string,
    originalCover: boolean,
    colorTitle: boolean
};

export type Tag = {
    name: string,
    color: string,
    count: number,
};