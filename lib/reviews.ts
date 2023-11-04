import { readFile, readdir } from "fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
import QueryString from "qs";


const CMS_URL = 'http://localhost:1337'

const getReviews = async (pageSize?) => {
    // const url = `${CMS_URL}/api/reviews/?`+QueryString.stringify({
    //     fields: ['title', 'slug', 'publishedAt'],
    //     populate: {image: {fields: ['url']}}
    // }, {encodeValuesOnly: true})
    
    // const res = await fetch(url);

    // code refactor
    const data = await fetchReviews({
        fields: ['title', 'slug', 'publishedAt'],
        populate: {image: {fields: ['url']}},
        pagination: {
            pageSize
        }
    })
    
    
    // const reviews = data.map(({attributes}) => ({
    //     title: attributes.title,
    //     slug: attributes.slug,
    //     date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    //     image: CMS_URL+attributes.image.data.attributes.url
    // }))

    const reviews = data.map(toReview);

    return reviews
}

const getReview = async (slug:string) => {
    // const url = `${CMS_URL}/api/reviews?`+QueryString.stringify({
    //     filters: {slug: {$eq: slug}},
    //     fields: ['title', 'slug', 'publishedAt', 'subtitle', 'body'],
    //     populate: {image: {fields: ['url']}},
        
    //     pagination: {
    //         pageSize: 1,
    //         withCount: false,
    //     }
    // }, {encodeValuesOnly: true})
    // const res = await fetch(url);

    // code refactor
    const data = await fetchReviews({
        filters: {slug: {$eq: slug}},
        fields: ['title', 'slug', 'publishedAt', 'subtitle', 'body'],
        populate: {image: {fields: ['url']}},
        
        pagination: {
            pageSize: 1,
            withCount: false,
        }
    })
    
    const item = data[0];
    
    return {
        // title: attributes.title,
        // slug: attributes.slug,
        // date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        // image: CMS_URL+attributes.image.data.attributes.url,
        ...toReview(item),
        body: marked(item.attributes.body)
    }

}

const getSlugs = async () => {
    const res = await fetchReviews({
        fields: ['slug'],
        pagination: {
            pageSize: 100
        }
    })
    const slugs = res.map(({attributes}) => attributes.slug)
    
    return slugs
    
    
}





// code refactor
const fetchReviews = async (params) => {
    const url = `${CMS_URL}/api/reviews?`+QueryString.stringify(params
    , {encodeValuesOnly: true})

    const res = await fetch(url);
    const {data} = await res.json();
    return data
}

getSlugs()

const toReview = (item) => {
    const {attributes} = item;
    return {
        title: attributes.title,
        slug: attributes.slug,
        date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL+attributes.image.data.attributes.url
    }
}




















// const getLocalSlugs = async () => {
    
//     const files = await readdir("./content/reviews")
//     const filterFilesWithDotMD = files.filter(file => file.endsWith('.md'))
//     const slugs = filterFilesWithDotMD.map(file => file.slice(0, -'.md'.length))

//     return slugs
    
    
// }


// const getReview = async (review: string) => {
//     const markedText = await readFile(`./content/reviews/${review}.md`, "utf-8")

//     const {content, data: {slug, title, image, date}} = matter(markedText)
//     const bodyText = marked(content)

//     return {slug, title, image, date, bodyText}
// }

// export const getReviews = async () => {
//    const slugs = await getSlugs()
//     const reviews = []
//     for (const slug of slugs) {
//         const review = await getReview(slug)
//         reviews.push(review)
//     }
//     reviews.sort((a,b) => b.date.localeCompare(a.date))
//     return reviews
// }

export const getLatestReview = async () => {
    const reviews = await getReviews()
    return reviews[0]
}



export {
    getReviews,
    getReview,
    getSlugs
}