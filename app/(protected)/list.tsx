import React, { useEffect } from 'react';
import { View } from 'react-native';
import TaskList from '@/components/List';
import { useTaskStore } from '@/features/tasks/task.store';
import { Text } from '@/components/Themed';


const TasksScreen = () => {
    const { isLoading, error, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, []);

    if (isLoading) return <Text>Cargando tareas...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={{
            flex: 1,
        }}
        >
            <TaskList />
        </View>
    );
};

export default TasksScreen;