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
const useGetAllMovies=()=>{
    const [allMovies, setAllMovies] = useState([])

    useEffect(() => {
        const getAllMovies = async () => {
            const res = await axios.get(`/api/movie/all?limit=600`)
            setAllMovies(res.data.content)
        }
        getAllMovies()
    }, [])
    return {allMovies,setAllMovies}
}

export {useGetTrendingContent,useGetAllMovies}