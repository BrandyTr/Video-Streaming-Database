import { useEffect, useState } from "react"
import axios from "axios"


const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)

    useEffect(() => {
        const getTrendingContent = async () => {
            const res = await axios.get(`/api/movie/trending`)
            setTrendingContent(res.data.content)
        }
        getTrendingContent()
    }, [])
    return {trendingContent}
}

export default useGetTrendingContent