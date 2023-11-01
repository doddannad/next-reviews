import Link from "next/link";
import Heading from "../../components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata = {
  title: "Reviews"
}
export default async function ReviewPage() {
  const reviews = await getReviews();

  const renderReviews = () => {
    return reviews.map((review) => {
      return (
        <li className="rounded my-5" key={review.slug}>
          <Link href={`/reviews/${review.slug}`}>
            {review.date}
            <img
              className="rounded"
              src={review.image}
              alt="stardew"
              width={560}
              height={360}
            />
            <h2>{review.title}</h2>
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <Heading>Reviews Page</Heading>
      <ul>
        {renderReviews()}
      </ul>
    </>
  );
}
