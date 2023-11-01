"use client"

import { useEffect } from "react"
import Heading from "@/components/Heading";

const metadata = {
    title: "Next.js-About"
  }

const  AboutPage = () => {
    useEffect(() => {
        console.log("Enable use client to use client side functionalities");
        
    }, [])
    return (<>
        <Heading>About Page..!</Heading>
    </>)
}

export default AboutPage