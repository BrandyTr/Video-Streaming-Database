/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCloudDownloadAlt } from "react-icons/fa";
import movieApi from "./../../api/movieApi";
import Header from "../../components-main/header/Header";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [editingMovie, setEditingMovie] = useState(null);
    const [showFetchModal, setShowFetchModal] = useState(false);

    const [newMovie, setNewMovie] = useState({
        title: "",
        overview: "",
        release_date: "",
        runtime: "",
        poster_path: "",
        backdrop_path: "",
        genres: [],
    });

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await movieApi.getMoviesList("all", {});
            setMovies(response.data.content);
            setFilteredMovies(response.data.content); // Initialize filteredMovies
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        // Filter movies based on the search term
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, movies]);

    const handleEdit = (movie) => {
        setEditingMovie(movie);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            await movieApi.deleteMovie(id);
            setMovies((prev) => prev.filter((movie) => movie.id !== id));
        }
    };

    const handleSave = async () => {
        if (editingMovie.id) {
            await movieApi.updateMovie(editingMovie.id, editingMovie);
        } else {
            const response = await movieApi.addMovie(newMovie);
            setMovies((prev) => [...prev, response.data]);
            setNewMovie({
                title: "",
                overview: "",
                release_date: "",
                runtime: "",
                poster_path: "",
                backdrop_path: "",
                genres: [],
            });
        }
        setEditingMovie(null);
    };

    const handleInputChange = (e, isEditing = true) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingMovie({ ...editingMovie, [name]: value });
        } else {
            setNewMovie({ ...newMovie, [name]: value });
        }
    };
    const handleFetch = async () => {
        setShowFetchModal(true);
    };

    return (
        <div>
            <Header />
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>
                <button className="fetch-btn" onClick={() => handleFetch({})}>
                    <FaCloudDownloadAlt /> Fetch Database
                </button>
                <button className="add-btn" onClick={() => setEditingMovie({})}>
                    <FaPlus /> Add New Movie
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Overview</th>
                            <th>Release Date</th>
                            <th>Runtime</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.overview}</td>
                                <td>{movie.release_date}</td>
                                <td>{movie.runtime} mins</td>
                                <td>
                                    <button className="action-btn" onClick={() => handleEdit(movie)}>
                                        <FaEdit />
                                    </button>
                                    <button className="action-btn" onClick={() => handleDelete(movie.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingMovie && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{editingMovie.id ? "Edit Movie" : "Add New Movie"}</h2>
                            <div className="form-grid">
                                <label>Title</label>
                                <input
                                    name="title"
                                    value={editingMovie.title || newMovie.title}
                                    onChange={(e) => handleInputChange(e, !!editingMovie.id)}
                                    placeholder="Enter movie title"
                                />
                                <label>Overview</label>
                                <textarea
                                    name="overview"
                                    value={editingMovie.overview || newMovie.overview}
                                    onChange={(e) => handleInputChange(e, !!editingMovie.id)}
                                    placeholder="Enter movie overview"
                                />
                                <label>Release Date</label>
                                <input
                                    name="release_date"
                                    type="date"
                                    value={editingMovie.release_date || newMovie.release_date}
                                    onChange={(e) => handleInputChange(e, !!editingMovie.id)}
                                />
                                <label>Runtime</label>
                                <input
                                    name="runtime"
                                    type="number"
                                    value={editingMovie.runtime || newMovie.runtime}
                                    onChange={(e) => handleInputChange(e, !!editingMovie.id)}
                                    placeholder="Enter runtime in minutes"
                                />
                                <label>Poster Path</label>
                                <input
                                    name="poster_path"
                                    value={editingMovie.poster_path || newMovie.poster_path}
                                    onChange={(e) => handleInputChange(e, !!editingMovie.id)}
                                    placeholder="Enter poster URL"
                                />
                                <label>Backdrop Path</label>
                                <input
                                    name="backdrop_path"
                                    value={editingMovie.backdrop_path || newMovie.backdrop_path}
                                    onChange={(e) => handleInputChange(e, !!editingMovie.id)}
                                    placeholder="Enter backdrop URL"
                                />
                            </div>
                            <div className="modal-actions">
                                <button className="save-btn" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="cancel-btn" onClick={() => setEditingMovie(null)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showFetchModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Fetching Database</h2>
                            <p>Fetching data from the database. Please wait...</p>
                            <div className="modal-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowFetchModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default AdminDashboard;
