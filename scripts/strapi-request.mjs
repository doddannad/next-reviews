import { writeFileSync } from "fs";
import QueryString from "qs";


const url = 'http://localhost:1337/api/reviews'+'?' + QueryString.stringify({
    fields: ['title', 'slug', 'subtitle', 'publishedAt'],
    populate: {image: {fields: ['url']}},
    sort: ['publishedAt:DESC'],
    pagination: { pageSize: 6},
}, {encodeValuesOnly: true});
const response = await fetch(url);
const body = await response.json();
const formattedBody = JSON.stringify(body, null, 2)


const file = "scripts/strapi-response.json";
writeFileSync(file, formattedBody, 'utf-8');