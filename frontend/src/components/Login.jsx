import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/new-post');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="w-full items-start font-mono p-8">
            <h1 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">ADMIN LOGIN</h1>
            <p className="mb-2 text-sm text-[#556B2F] hover:underline focus:outline-none flex-shrink-0"><Link to="/">{"[<- home]"}</Link></p>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-1">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 bg-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-1">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 bg-white"
                    />
                </div>
                <button type="submit" className="px-4 py-2 text-[#556B2F] border border-[#556B2F] text-sm font-bold hover:bg-gray-100">
                    LOGIN
                </button>
            </form>
        </div>
    );
};

export default Login;
