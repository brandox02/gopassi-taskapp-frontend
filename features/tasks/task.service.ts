import api from '@/utils/api';
import { CreateTaskDto, Task, UpdateTaskDto } from './types';

export const TaskService = {
    async getAllTasks(): Promise<Task[]> {
        const response = await api.get('/tasks');
        return response.data;
    },

    async getTaskById(id: string): Promise<Task> {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    async createTask(taskData: CreateTaskDto): Promise<Task> {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task> {
        const response = await api.patch(`/tasks/${id}`, taskData);
        return response.data;
    },

    async deleteTask(id: string): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },
};