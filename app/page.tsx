import Heading from "@/components/Heading";
import { getLatestReview } from "@/lib/reviews";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
    const latestReview = await getLatestReview()
    return <>
        <Heading>Home Page</Heading>
        <li className="rounded my-5" key={latestReview.slug}>
          <Link href={`/reviews/${latestReview.slug}`}>
            {latestReview.date}
            <Image
              className="rounded"
              src={latestReview.image}
              alt="stardew"
              width={560}
              height={360}
            />
            <h2>{latestReview.title}</h2>
          </Link>
        </li>
    </>
}