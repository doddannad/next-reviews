"use client"

import { useState } from "react"



const ShareButton = () => {
    const [copied, setCopied] = useState(false)
    
    const handleClik = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button onClick={handleClik} className="border bg-slate-200 px-3 py-1 rounded my-3">
            {copied ? 'Link Copied' : 'Share'}
        </button>
    )
}

export default ShareButton