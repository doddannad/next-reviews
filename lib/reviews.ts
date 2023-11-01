import { readFile, readdir } from "fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
import { log } from "console";

export const getSlugs = async () => {
    
    const files = await readdir("./content/reviews")
    const filterFilesWithDotMD = files.filter(file => file.endsWith('.md'))
    const slugs = filterFilesWithDotMD.map(file => file.slice(0, -'.md'.length))

    return slugs
    
    
}

export const getReview = async (review: string) => {
    const markedText = await readFile(`./content/reviews/${review}.md`, "utf-8")

    const {content, data: {slug, title, image, date}} = matter(markedText)
    const bodyText = marked(content)

    return {slug, title, image, date, bodyText}
}

export const getReviews = async () => {
   const slugs = await getSlugs()
    const reviews = []
    for (const slug of slugs) {
        const review = await getReview(slug)
        reviews.push(review)
    }
    reviews.sort((a,b) => b.date.localeCompare(a.date))
    return reviews
}

export const getLatestReview = async () => {
    const reviews = await getReviews()
    return reviews[0]
}

