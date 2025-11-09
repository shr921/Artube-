import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthCallbacks {
  onSuccess: (user: User) => void;
  switchToSignIn: () => void;
  switchToSignUp: () => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input 
        {...props}
        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
    />
);

export const SignInForm: React.FC<Pick<AuthCallbacks, 'onSuccess' | 'switchToSignUp'>> = ({ onSuccess, switchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const user = await authService.signIn(email, password);
            onSuccess(user);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            <InputField type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <InputField type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" disabled={isLoading} className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition disabled:bg-pink-400">
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button type="button" onClick={switchToSignUp} className="font-semibold text-pink-600 hover:underline">
                    Sign Up
                </button>
            </p>
        </form>
    );
};


export const SignUpForm: React.FC<Pick<AuthCallbacks, 'onSuccess' | 'switchToSignIn'>> = ({ onSuccess, switchToSignIn }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const user = await authService.signUp(name, email, password);
            onSuccess(user);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            <InputField type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
            <InputField type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <InputField type="password" placeholder="Password (min. 6 characters)" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" disabled={isLoading} className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition disabled:bg-pink-400">
                {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
             <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button type="button" onClick={switchToSignIn} className="font-semibold text-pink-600 hover:underline">
                    Sign In
                </button>
            </p>
        </form>
    );
};