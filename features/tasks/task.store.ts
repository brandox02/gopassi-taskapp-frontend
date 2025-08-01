import { create } from 'zustand';
import { TaskService } from './task.service';
import { Task } from './types';

interface TaskStoreState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  updateTask: (id: string, newTitle: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStoreState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await TaskService.getAllTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },

  addTask: async (title) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await TaskService.createTask({ title });
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to create task', isLoading: false });
    }
  },

  toggleTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const taskToUpdate = useTaskStore.getState().tasks.find(t => t.id === id);
      if (taskToUpdate) {
        const updatedTask = await TaskService.updateTask(id, {
          title: taskToUpdate.title,
          done: !taskToUpdate.done
        });
        set((state) => ({
          tasks: state.tasks.map(t =>
            t.id === id ? updatedTask : t
          ),
          isLoading: false
        }));
      }
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  updateTask: async (id, newTitle) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await TaskService.updateTask(id, { title: newTitle });
      set((state) => ({
        tasks: state.tasks.map(t =>
          t.id === id ? updatedTask : t
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await TaskService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false });
    }
  },
}));