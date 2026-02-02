import axios from 'axios';
import type { User, UpdateUserDto } from '@/types/userTypes';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const userApi = {
    getProfile: async (userId: number): Promise<User> => {
        const response = await axios.get<User>(`${API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    },

    updateProfile: async (userId: number, data: UpdateUserDto): Promise<User> => {
        const response = await axios.patch(
            `${API_URL}/users/${userId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/merge-patch+json',
                }
            }
        );
        return response.data;
    },
};