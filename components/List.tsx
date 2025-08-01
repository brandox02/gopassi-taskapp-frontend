import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    useColorScheme,
    Animated,
    Alert,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '@/features/tasks/task.store';
import { Task } from '@/features/tasks/types';

const TaskList: React.FC = () => {
    const {
        tasks,
        isLoading,
        error,
        addTask,
        toggleTask,
        updateTask,
        deleteTask,
        fetchTasks
    } = useTaskStore();
    console.log({ tasks: JSON.stringify(tasks) });
    const [newTaskTitle, setNewTaskTitle] = React.useState('');
    const [editingTaskId, setEditingTaskId] = React.useState<string | null>(null);
    const [editingText, setEditingText] = React.useState('');
    const colorScheme = useColorScheme();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const isDarkMode = colorScheme === 'dark';

    // Colores adaptables al tema
    const colors = {
        background: isDarkMode ? '#121212' : '#FFFFFF',
        text: isDarkMode ? '#FFFFFF' : '#000000',
        secondaryText: isDarkMode ? '#BBBBBB' : '#666666',
        card: isDarkMode ? '#1E1E1E' : '#F8F8F8',
        border: isDarkMode ? '#333333' : '#E0E0E0',
        primary: '#4A90E2',
        completed: isDarkMode ? '#2E7D32' : '#81C784',
        error: '#E57373',
        inputBackground: isDarkMode ? '#2D2D2D' : '#F0F0F0',
        warning: '#FFA000',
        placeholder: isDarkMode ? '#888888' : '#999999',
    };

    // Manejar errores
    React.useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }
    }, [error]);

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const startEditing = (task: Task) => {
        setEditingTaskId(task.id);
        setEditingText(task.title);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const cancelEditing = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setEditingTaskId(null);
            setEditingText('');
        });
    };

    const submitEdit = (id: string) => {
        if (editingText.trim() === '') {
            Alert.alert(
                'Campo vacío',
                'El texto de la tarea no puede estar vacío',
                [{ text: 'OK' }]
            );
            return;
        }

        if (editingText.trim() !== tasks.find(t => t.id === id)?.title) {
            updateTask(id, editingText);
        }
        cancelEditing();
    };

    const handleDeleteConfirmation = (id: string) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que quieres eliminar esta tarea?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => deleteTask(id),
                    style: "destructive"
                }
            ]
        );
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <Animated.View
            style={[
                styles.taskItem,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: editingTaskId === item.id ? fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1]
                    }) : 1,
                    transform: [
                        {
                            scale: editingTaskId === item.id ? fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.02]
                            }) : 1
                        }
                    ]
                }
            ]}
        >
            <TouchableOpacity
                onPress={() => toggleTask(item.id)}
                style={styles.checkboxContainer}
            >
                <Ionicons
                    name={item.done ? 'checkbox-outline' : 'square-outline'}
                    size={24}
                    color={item.done ? colors.completed : colors.text}
                />
            </TouchableOpacity>

            {editingTaskId === item.id ? (
                <View style={styles.editContainer}>
                    <TextInput
                        style={[styles.editInput, {
                            color: colors.text,
                            backgroundColor: colors.inputBackground
                        }]}
                        value={editingText}
                        onChangeText={setEditingText}
                        autoFocus
                        onSubmitEditing={() => submitEdit(item.id)}
                        placeholder="Editar tarea..."
                        placeholderTextColor={colors.placeholder}
                    />
                    <View style={styles.editButtons}>
                        <TouchableOpacity
                            onPress={() => submitEdit(item.id)}
                            style={styles.saveButton}
                        >
                            <Ionicons name="checkmark" size={20} color={colors.completed} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={cancelEditing}
                            style={styles.cancelButton}
                        >
                            <Ionicons name="close" size={20} color={colors.error} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <TouchableOpacity
                        style={styles.taskTextContainer}
                        onPress={() => toggleTask(item.id)}
                        onLongPress={() => startEditing(item)}
                    >
                        <Text
                            style={[
                                styles.taskText,
                                item.done && styles.completedTaskText,
                                { color: colors.text },
                            ]}
                            numberOfLines={2}
                        >
                            {item.title}
                        </Text>
                        <Text style={[styles.taskMeta, { color: colors.secondaryText }]}>
                            {new Date(item.createdAt).toLocaleDateString()} • {item?.user?.username}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            onPress={() => startEditing(item)}
                            style={styles.editButton}
                        >
                            <Ionicons name="create-outline" size={20} color={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDeleteConfirmation(item.id)}
                            style={styles.deleteButton}
                        >
                            <Ionicons name="trash-outline" size={20} color={colors.error} />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Animated.View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
            keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 70}
        >
            {isLoading && tasks.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    keyboardShouldPersistTaps='handled'
                    data={tasks}
                    renderItem={renderTaskItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="checkmark-done-outline" size={48} color={colors.secondaryText} />
                            <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
                                No hay tareas disponibles
                            </Text>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={fetchTasks}
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                        />
                    }
                />
            )}

            <View style={[styles.inputContainer, {
                backgroundColor: colors.card,
                borderColor: colors.border,
                paddingBottom: Platform.OS === 'ios' ? 30 : 15,
            }]}
            >
                <TextInput
                    style={[styles.input, {
                        color: colors.text,
                        backgroundColor: colors.inputBackground
                    }]}
                    placeholder="Añadir nueva tarea..."
                    placeholderTextColor={colors.secondaryText}
                    value={newTaskTitle}
                    onChangeText={setNewTaskTitle}
                    onSubmitEditing={handleAddTask}
                    editable={!isLoading}
                />
                <TouchableOpacity
                    onPress={handleAddTask}
                    style={styles.addButton}
                    disabled={!newTaskTitle.trim() || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color={colors.primary} />
                    ) : (
                        <Ionicons
                            name="send"
                            size={24}
                            color={newTaskTitle.trim() ? colors.primary : colors.secondaryText}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        paddingBottom: 80,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
    },
    checkboxContainer: {
        marginRight: 12,
    },
    taskTextContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 16,
    },
    completedTaskText: {
        textDecorationLine: 'line-through',
        opacity: 0.7,
    },
    taskMeta: {
        fontSize: 12,
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    editButton: {
        padding: 4,
        marginRight: 8,
    },
    deleteButton: {
        padding: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    editInput: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    editButtons: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    saveButton: {
        padding: 8,
        marginRight: 4,
    },
    cancelButton: {
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
});

export default TaskList;