import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import movieApi from "./../../api/movieApi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null);
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
        };
        fetchMovies();
    }, []);

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

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
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
                    {movies.map((movie) => (
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
        </div>
    );
};

export default AdminDashboard;