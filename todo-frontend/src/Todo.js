import { useEffect, useState } from "react";

export default function Todo() {
    // --- State Variables ---
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [error, setError] = useState("");
    
    // 1. New state for the theme (default is 'light')
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    const apiurl = "http://localhost:4000/";

    // --- Theme Logic ---

    // 3. Persist theme to local storage and apply body class
    useEffect(() => {
        document.body.className = theme; // Apply theme class to the body
        localStorage.setItem('theme', theme); // Store theme in local storage
    }, [theme]);
    
    // 2. Function to toggle the theme
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    // --- CRUD Functions ---

    const handleSubmit = () => {
        setError("");
        if (title.trim() !== "" && description.trim() !== "") {
            fetch(apiurl + "todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setTodos([...todos, data]);
                    setTitle("");
                    setDescription("");
                    setMessage("Task created successfully");
                    setTimeout(() => setMessage(""), 3000);
                })
                .catch(() => setError("Unable to create task. Please check your connection."));
        } else {
            setError("Title and description are required.");
        }
    };

    const getItems = () => {
        fetch(apiurl + "todos")
            .then((res) => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then((data) => setTodos(data))
            .catch(() => setError("Unable to fetch tasks. Please ensure the server is running."));
    };

    // Fetch todos on mount
    useEffect(() => {
        getItems();
    }, []);

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description);
        setError("");
    };

    const handleUpdate = () => {
        if (editTitle.trim() === "" || editDescription.trim() === "") {
            setError("Title and description cannot be empty.");
            return;
        }
        fetch(apiurl + "todos/" + editId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editTitle, description: editDescription }),
        })
            .then((res) => res.json())
            .then((updated) => {
                const updatedList = todos.map((t) => (t._id === editId ? updated : t));
                setTodos(updatedList);
                setEditId(-1);
                setMessage("Task updated successfully");
                setError("");
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(() => setError("Unable to update task"));
    };

    const handleDelete = (id) => {
        fetch(apiurl + "todos/" + id, { method: "DELETE" })
            .then(() => {
                const remaining = todos.filter((t) => t._id !== id);
                setTodos(remaining);
                setMessage("Task deleted successfully");
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(() => setError("Unable to delete task"));
    };

    const handleCancelEdit = () => {
        setEditId(-1);
        setEditTitle("");
        setEditDescription("");
    };

    return (
        <>
            <link 
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
                rel="stylesheet"
            />
            <link 
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
                rel="stylesheet"
            />

            <style>{`
                /* Light Theme (Default) */
                body.light {
                    background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
                    min-height: 100vh;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    color: #212529; /* Default text color */
                }
                .light .text-dark { color: #212529 !important; }
                .light .text-secondary { color: #6c757d !important; }
                .light .card-modern {
                    background-color: #ffffff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
                }
                .light .form-control-modern {
                    background-color: #ffffff;
                    color: #212529;
                    border: 2px solid #e1e8ed;
                }
                .light .form-control-modern:focus {
                    border-color: #667eea;
                }
                .light .todo-item { border-left: 4px solid #667eea; }
                .light .alert-success { background-color: #d1e7dd; color: #0f5132; }
                .light .alert-danger { background-color: #f8d7da; color: #842029; }


                /* Dark Theme Styles */
                body.dark {
                    background: #121212; /* Darker background */
                    min-height: 100vh;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    color: #e0e0e0; /* Light text color */
                }
                .dark .text-dark { color: #ffffff !important; }
                .dark .text-secondary, .dark .form-label { color: #bdbdbd !important; }
                .dark .card-modern {
                    background-color: #1e1e1e; /* Dark card background */
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Stronger shadow */
                }
                .dark .form-control-modern {
                    background-color: #2c2c2c;
                    color: #ffffff;
                    border: 2px solid #3a3a3a;
                }
                .dark .form-control-modern:focus {
                    border-color: #8c9eff;
                    box-shadow: 0 0 0 3px rgba(140, 158, 255, 0.2);
                }
                .dark .todo-item { border-left: 4px solid #8c9eff; }
                .dark .bg-primary { background-color: #8c9eff !important; }
                .dark .bg-primary.bg-opacity-10 { background-color: rgba(140, 158, 255, 0.1) !important; }
                .dark .text-primary { color: #8c9eff !important; }
                .dark .btn-outline-primary {
                    color: #8c9eff;
                    border-color: #8c9eff;
                }
                .dark .btn-outline-primary:hover {
                    background-color: #8c9eff;
                    color: #1e1e1e;
                }
                .dark .alert-success { background-color: #38761d; color: #d1e7dd; }
                .dark .alert-danger { background-color: #721c24; color: #f8d7da; }
                .dark .btn-outline-secondary {
                    color: #bdbdbd;
                    border-color: #bdbdbd;
                }
                .dark .btn-outline-secondary:hover {
                    background-color: #bdbdbd;
                    color: #1e1e1e;
                }
                /* General Styles (Unchanged but ensured compatibility) */
                .card-modern {
                    border: none;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }
                .card-modern:hover {
                    transform: translateY(-2px);
                }
                .btn-modern {
                    border-radius: 10px;
                    padding: 12px 24px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    transition: all 0.3s ease;
                }
                .btn-modern:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                .form-control-modern {
                    padding: 12px 16px;
                    transition: all 0.3s ease;
                }
                .todo-item {
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }
                .todo-item:hover {
                    transform: translateX(4px);
                }
                .badge-modern {
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 14px;
                }
                .alert-modern {
                    border-radius: 12px;
                    border: none;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                }
            `}</style>

            {/* Header */}
            <div className="container pt-4 pb-3 mb-4">
                <div className="card card-modern">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-3">
                                    <i className="bi bi-check2-square text-primary" style={{fontSize: '2rem'}}></i>
                                </div>
                                <div>
                                    <h1 className="display-6 fw-bold mb-1 text-dark">Task Manager</h1>
                                    <p className="mb-0 text-secondary">Organize your work efficiently and professionally</p>
                                </div>
                            </div>
                            {/* 6. Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="btn btn-outline-secondary"
                                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                                style={{borderRadius: '10px'}}
                            >
                                <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Unchanged structural content) */}
            <div className="container pb-5">
                {/* Notifications */}
                {message && (
                    <div className="alert alert-success alert-modern alert-dismissible fade show mb-4" role="alert">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <strong>{message}</strong>
                        <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger alert-modern alert-dismissible fade show mb-4" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <strong>{error}</strong>
                        <button type="button" className="btn-close" onClick={() => setError("")}></button>
                    </div>
                )}

                {/* Add Task Card */}
                <div className="card card-modern mb-5">
                    <div className="card-body p-4">
                        <h4 className="fw-bold mb-4 text-dark">
                            <i className="bi bi-plus-circle me-2"></i>
                            Create New Task
                        </h4>
                        
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label fw-semibold text-secondary mb-2">
                                    <i className="bi bi-pencil me-2"></i>Task Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter task title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-control form-control-modern"
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold text-secondary mb-2">
                                    <i className="bi bi-text-paragraph me-2"></i>Description
                                </label>
                                <textarea
                                    placeholder="Enter task description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                    className="form-control form-control-modern"
                                    style={{resize: 'none'}}
                                />
                            </div>

                            <div className="col-12">
                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-primary btn-modern w-100"
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold text-dark mb-0">
                        <i className="bi bi-list-task me-2"></i>Your Tasks
                    </h4>
                    <span className="badge bg-primary badge-modern">
                        {todos.length} {todos.length === 1 ? 'Task' : 'Tasks'}
                    </span>
                </div>

                {todos.length === 0 ? (
                    <div className="card card-modern text-center py-5">
                        <div className="card-body">
                            <i className="bi bi-inbox text-muted mb-3" style={{fontSize: '4rem'}}></i>
                            <h5 className="text-secondary mb-2">No tasks yet</h5>
                            <p className="text-secondary">Create your first task to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className="row g-3">
                        {todos.map((item) => (
                            <div key={item._id} className="col-12">
                                <div className="card card-modern todo-item">
                                    <div className="card-body p-4">
                                        {editId !== item._id ? (
                                            <div className="d-flex justify-content-between align-items-start gap-3">
                                                <div className="flex-grow-1">
                                                    <h5 className="fw-bold text-dark mb-2">
                                                        {item.title}
                                                    </h5>
                                                    <p className="text-secondary mb-0" style={{lineHeight: '1.6'}}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="btn btn-outline-primary btn-sm"
                                                        style={{borderRadius: '8px'}}
                                                        title="Edit task"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="btn btn-outline-danger btn-sm"
                                                        style={{borderRadius: '8px'}}
                                                        title="Delete task"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold text-secondary mb-2">Task Title</label>
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="form-control form-control-modern"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold text-secondary mb-2">Description</label>
                                                    <textarea
                                                        value={editDescription}
                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                        rows="3"
                                                        className="form-control form-control-modern"
                                                        style={{resize: 'none'}}
                                                    />
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        onClick={handleUpdate}
                                                        className="btn btn-success flex-grow-1"
                                                        style={{borderRadius: '8px'}}
                                                    >
                                                        <i className="bi bi-check-lg me-2"></i>
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="btn btn-outline-secondary"
                                                        style={{borderRadius: '8px'}}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}