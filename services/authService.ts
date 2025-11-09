import { User } from '../types';

// Mock database using localStorage
const USERS_KEY = 'creatiTubeUsers';
const CURRENT_USER_KEY = 'creatiTubeCurrentUser';

const getMockAvatar = (seed: string) => `https://picsum.photos/seed/${seed}/40/40`;

// Initialize with some mock users if not present
const initializeMockUsers = () => {
    if (!localStorage.getItem(USERS_KEY)) {
        const mockUsers = {
            'chloe@test.com': { name: 'Crafty Chloe', password: 'password123', avatarUrl: getMockAvatar('chloe') },
            'pete@test.com': { name: 'Pixel Pete', password: 'password123', avatarUrl: getMockAvatar('pete') },
            'admin@creati.tube': { name: 'App Owner', password: 'admin', avatarUrl: getMockAvatar('admin') },
        };
        localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
    }
};

initializeMockUsers();

const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
};

export const authService = {
    signUp: async (name: string, email: string, password: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getUsers();
                if (users[email]) {
                    return reject(new Error('User with this email already exists.'));
                }
                const newUser: User = { name, email, avatarUrl: getMockAvatar(name) };
                users[email] = { ...newUser, password };
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                localStorage.setItem(CURRENT_USER_KEY, email);
                resolve(newUser);
            }, 500);
        });
    },

    signIn: async (email: string, password: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getUsers();
                const user = users[email];
                if (user && user.password === password) {
                    localStorage.setItem(CURRENT_USER_KEY, email);
                    resolve({ name: user.name, email: email, avatarUrl: user.avatarUrl });
                } else {
                    reject(new Error('Invalid email or password.'));
                }
            }, 500);
        });
    },

    signOut: async (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.removeItem(CURRENT_USER_KEY);
                resolve();
            }, 200);
        });
    },

    getCurrentUser: async (): Promise<User | null> => {
         return new Promise((resolve) => {
            setTimeout(() => {
                const userEmail = localStorage.getItem(CURRENT_USER_KEY);
                if (!userEmail) {
                    return resolve(null);
                }
                const users = getUsers();
                const user = users[userEmail];
                if (user) {
                    resolve({ name: user.name, email: userEmail, avatarUrl: user.avatarUrl });
                } else {
                    // Data integrity issue, clear current user
                    localStorage.removeItem(CURRENT_USER_KEY);
                    resolve(null);
                }
            }, 100);
        });
    },
};