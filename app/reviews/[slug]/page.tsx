

// import Heading from "../../../components/Heading";
import Heading from "@/components/Heading";
import ShareButton from "@/components/ShareButton";
import { getReview, getSlugs } from "@/lib/reviews";

// dynamic metadata
export const generateMetadata = async ({params: {slug}}) => {
    const review = await getReview(slug)
    return {
        title: review.title
    }
}



export const generateStaticParams = async () => {
    const slugs = await getSlugs()
    slugs.map(slug => ({slug}))
    return slugs
}


export default async function ReviewPage({params: {slug}}) {
    const {title, image, date, bodyText} = await getReview(slug)
    return(
        <>
            <Heading>{title}</Heading>
            <ShareButton />
            <img src={`${image}`} alt={title} width={560} height={360} />
            <article dangerouslySetInnerHTML={{__html: bodyText}} className="prose" />
        </>
    )
}