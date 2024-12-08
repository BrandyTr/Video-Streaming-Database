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
const useGetAllMovie=()=>{
    const [allMovies, setAllMovies] = useState(null)

    useEffect(() => {
        const getAllMovies = async () => {
            const res = await axios.get(`/api/movie/all`)
            setAllMovies(res.data.content)
        }
        getAllMovies()
    }, [])
    return {allMovies}
}

export default {useGetTrendingContent,useGetAllMovie}