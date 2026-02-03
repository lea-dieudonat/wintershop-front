import axios from 'axios';
import type { User, UpdateUserDto } from '@/types/userTypes';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

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

    changePassword: async (userId: number, data: ChangePasswordDto): Promise<User> => {
        const response = await axios.post(
        `${API_URL}/users/${userId}/change-password`,
        data,
        {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
        );
        return response.data;
    },
};