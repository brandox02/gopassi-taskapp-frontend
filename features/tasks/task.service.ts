import api from '@/utils/api';
import { CreateTaskDto, Task, UpdateTaskDto } from './types';

export const TaskService = {
    async getAllTasks(): Promise<Task[]> {
        try {
            const response = await api.get('/tasks');
            return response.data;
        } catch (error) {
            throw new Error(
                (error as any)?.message || 'Error al obtener las tareas'
            );
        }
    },

    async getTaskById(id: string): Promise<Task> {
        try {
            const response = await api.get(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(
                (error as any)?.message || `Error al obtener la tarea con ID ${id}`
            );
        }
    },

    async createTask(taskData: CreateTaskDto): Promise<Task> {
        try {
            const response = await api.post('/tasks', taskData);
            return response.data;
        } catch (error) {
            throw new Error(
                (error as any)?.message || 'Error al crear la tarea'
            );
        }
    },

    async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task> {
        try {
            const response = await api.patch(`/tasks/${id}`, taskData);
            return response.data;
        } catch (error) {
            throw new Error(
                (error as any)?.message || `Error al actualizar la tarea con ID ${id}`
            );
        }
    },

    async deleteTask(id: string): Promise<void> {
        try {
            await api.delete(`/tasks/${id}`);
        } catch (error) {
            throw new Error(
                (error as any)?.message || `Error al eliminar la tarea con ID ${id}`
            );
        }
    },
};
