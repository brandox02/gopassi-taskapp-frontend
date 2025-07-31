import React, { useState } from 'react';
import { View } from 'react-native';
import TaskList, { Task } from '@/components/List';


const TasksScreen = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const handleAddTask = (title: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
            createdBy: 'Usuario Actual',
        };
        setTasks([...tasks, newTask]);
    };

    const handleToggleTask = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleEditTask = (id: string, newTitle: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TaskList
                tasks={tasks}
                loading={loading}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
            />
        </View>
    );
};

export default TasksScreen;