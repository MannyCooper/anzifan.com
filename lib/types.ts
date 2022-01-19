export interface Post {
    id: string,
    slug: string,
    title: string,
    date: Date,
    updateDate: Date,
    cover: {light: string, dark: string, blurLight: string, blurDark: string},
    category: {name:string, color:string},
    tags: { name: string, color: string },
    series: { name: string, color: string },
    excerpt: string,
    tip: string,
    sspai: boolean,
};