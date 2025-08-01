import { create } from 'zustand';
import { TaskService } from './task.service';
import { Task } from './types';

interface TaskStoreState {
  loadingTaskId: string | null;
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  updateTask: (id: string, newTitle: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;

  addTaskFromSocket: (task: Task) => void;
  updateTaskFromSocket: (task: Task) => void;
  removeTaskFromSocket: (id: string) => void;
}

export const useTaskStore = create<TaskStoreState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  loadingTaskId: null,
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
    try {
      const newTask = await TaskService.createTask({ title });
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (error) {
      set({ error: 'Failed to create task', isLoading: false });
    }
  },

  toggleTask: async (id) => {
    set({ loadingTaskId: id });
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
          loadingTaskId: null
        }));
      }
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  updateTask: async (id, newTitle) => {
    set({ loadingTaskId: id });
    try {
      const updatedTask = await TaskService.updateTask(id, { title: newTitle });

      set((state) => ({
        tasks: state.tasks.map(t =>
          t.id === id ? updatedTask : t
        ),
        loadingTaskId: null
      }));
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loadingTaskId: id });
    try {
      await TaskService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
        loadingTaskId: null
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false });
    }
  },

  addTaskFromSocket: (task) => {
    set((state) => {
      if (state.tasks.some(t => t.id === task.id)) {
        return state;
      }
      return { tasks: [...state.tasks, task] };
    });
  },

  updateTaskFromSocket: (task) => {
    set((state) => ({
      tasks: state.tasks.map(t =>
        t.id === task.id ? task : t
      )
    }));
  },

  removeTaskFromSocket: (id) => {
    set((state) => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }));
  },
}));