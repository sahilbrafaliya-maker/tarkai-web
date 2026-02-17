"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaLock, FaCalendarAlt, FaUpload } from 'react-icons/fa';
import Image from 'next/image';

interface BlogPost {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    description: string;
    color: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Edit/Create State
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost>>({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBlogs();
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'TarkAI@2026') {
            sessionStorage.setItem('isAdmin', 'true');
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const method = currentBlog.id ? 'PUT' : 'POST';
            const url = currentBlog.id ? `/api/blogs/${currentBlog.id}` : '/api/blogs';

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentBlog),
            });

            setIsEditing(false);
            setCurrentBlog({});
            fetchBlogs();
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setCurrentBlog({ ...currentBlog, image: reader.result });
            }
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const startEdit = (blog: BlogPost) => {
        setCurrentBlog(blog);
        setIsEditing(true);
    };

    const startCreate = () => {
        setCurrentBlog({
            title: '',
            category: 'AI Trends',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            image: '/Logo.png',
            description: '',
            color: 'from-blue-400 to-indigo-600'
        });
        setIsEditing(true);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-lightest">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <div className="flex justify-center mb-6 text-brand-accent">
                        <FaLock size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-brand-darkest mb-6">Admin Access</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-4 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    />
                    <button
                        type="submit"
                        className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-accent transition-colors"
                    >
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-brand-darkest">Content Manager</h1>
                    <button
                        onClick={startCreate}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl shadow-lg hover:bg-brand-dark transition-all hover:scale-105"
                    >
                        <FaPlus /> New Post
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center py-20 text-gray-500">Loading content...</div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-3xl p-10 max-w-2xl mx-auto border border-gray-200 border-dashed">
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Posts Yet</h3>
                            <p className="text-gray-500 mb-6">Create your first blog post to get started.</p>
                            <button
                                onClick={startCreate}
                                className="px-6 py-2 bg-brand-accent text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all flex items-center gap-2 mx-auto"
                            >
                                <FaPlus /> Create Post
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {blogs.map((blog) => (
                                <AdminBlogCard
                                    key={blog.id}
                                    blog={blog}
                                    onEdit={startEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <h2 className="text-xl font-bold text-brand-darkest">
                                    {currentBlog.id ? 'Edit Post' : 'Create New Post'}
                                </h2>
                                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                    <FaTimes size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                        <input
                                            required
                                            value={currentBlog.title}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <input
                                            required
                                            value={currentBlog.category}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                            placeholder="Enter Category"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                                        <input
                                            value={currentBlog.date}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, date: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            {uploading ? 'Uploading...' : 'Image'}
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    type="file"
                                                    onChange={handleImageUpload}
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full p-3 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-500 bg-gray-50">
                                                    <FaUpload />
                                                    <span className="truncate">{currentBlog.image || 'Upload Image'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={currentBlog.description}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, description: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Gradient Theme</label>
                                    <select
                                        value={currentBlog.color}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, color: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                    >
                                        <option value="from-blue-400 to-indigo-600">Blue & Indigo</option>
                                        <option value="from-emerald-400 to-teal-600">Emerald & Teal</option>
                                        <option value="from-purple-400 to-pink-600">Purple & Pink</option>
                                        <option value="from-orange-400 to-red-600">Orange & Red</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="px-8 py-3 bg-brand-accent text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all hover:scale-105 disabled:opacity-50"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function AdminBlogCard({ blog, onEdit, onDelete }: { blog: BlogPost, onEdit: (b: BlogPost) => void, onDelete: (id: number) => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative h-[450px] w-full perspective-1000"
        >
            <div className="absolute inset-0 bg-white rounded-4xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300">

                {/* Image Section */}
                <div className="relative h-1/2 overflow-hidden clip-path-slant">
                    <div className={`absolute inset-0 bg-linear-to-br ${blog.color} opacity-20 mix-blend-overlay z-10`} />
                    {/* Use standard img tag or unoptimized next/image if domain not configured yet for uploads, 
                        assuming standard Next setup allows local public images. */}
                    <Image
                        src={blog.image || '/Logo.png'}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />

                    {/* Floating Date Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-dark shadow-sm z-20 flex items-center gap-1">
                        <FaCalendarAlt className="text-brand-accent" />
                        {blog.date}
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-4 left-4 z-20">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-linear-to-r ${blog.color} shadow-lg backdrop-blur-md`}>
                            {blog.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 h-1/2 flex flex-col relative z-20">
                    <h3 className="text-xl font-bold text-brand-darkest mb-3 leading-tight">
                        {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed grow">
                        {blog.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        <button
                            onClick={() => onEdit(blog)}
                            className="flex-1 py-2 bg-brand-lightest text-brand-dark font-bold rounded-lg hover:bg-brand-dark hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <FaEdit /> Edit
                        </button>
                        <button
                            onClick={() => onDelete(blog.id)}
                            className="flex-1 py-2 bg-red-50 text-red-500 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
