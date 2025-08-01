import React, { useEffect, useRef } from "react";
import { useTaskStore } from "./task.store";
import { Animated, StyleSheet, TextInput, TouchableOpacity, useColorScheme, Text, View } from "react-native";
import { Task } from "./types";
// import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";

function TaskItem({ item, editingTaskId,
    editingText, setEditingText, submitEdit, cancelEditing, startEditing, handleDeleteConfirmation
}: {
    item: Task, editingTaskId: string | null, editingText: string,
    setEditingText: React.Dispatch<React.SetStateAction<string>>, submitEdit: (id: string) => void,
    cancelEditing: () => void, startEditing: (task: Task) => void,
    handleDeleteConfirmation: (id: string) => void
}) {
    const { loadingTaskId, toggleTask, } = useTaskStore()
    const isLoading = loadingTaskId === item.id;
    const shimmerAnim = useRef(new Animated.Value(0)).current;
    const colorScheme = useColorScheme();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const isDarkMode = colorScheme === 'dark';
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
    useEffect(() => {
        if (isLoading) {
            // Loop the shimmer animation while loading
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shimmerAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shimmerAnim, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            shimmerAnim.setValue(0);
        }
    }, [isLoading]);

    const shimmerTranslateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100],
    });

    return (
        <Animated.View
            key={item.id}
            style={[
                styles.taskItem,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: editingTaskId === item.id
                        ? fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1] })
                        : 1,
                    transform: [
                        {
                            scale: editingTaskId === item.id
                                ? fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] })
                                : 1
                        }
                    ]
                }
            ]}
        >
            {isLoading ? (
                <View style={styles.skeletonContainer}>
                    <View style={styles.skeletonContent}>
                        <View style={[styles.skeletonBox, {
                            width: '70%',
                            height: 20,
                            marginBottom: 8,
                            backgroundColor: colors.placeholder,
                            overflow: 'hidden',
                        }]}>
                            <Animated.View
                                style={[
                                    styles.shimmer,
                                    {
                                        transform: [{ translateX: shimmerTranslateX }],
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    }
                                ]}
                            />
                        </View>
                        <View style={[styles.skeletonBox, {
                            width: '50%',
                            height: 14,
                            backgroundColor: colors.placeholder,
                            overflow: 'hidden',
                        }]}>
                            <Animated.View
                                style={[
                                    styles.shimmer,
                                    {
                                        transform: [{ translateX: shimmerTranslateX }],
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    }
                                ]}
                            />
                        </View>
                    </View>
                    <View style={styles.skeletonActions}>
                        <View style={[styles.skeletonActionButton, { backgroundColor: colors.placeholder }]} />
                        <View style={[styles.skeletonActionButton, { backgroundColor: colors.placeholder }]} />
                    </View>
                </View>
            ) : editingTaskId === item.id ? (
                // Edición activa
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
                        <TouchableOpacity onPress={() => submitEdit(item.id)} style={styles.saveButton}>
                            <Ionicons name="checkmark" size={20} color={colors.completed} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancelEditing} style={styles.cancelButton}>
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

                        <TouchableOpacity onPress={() => startEditing(item)} style={styles.editButton}>
                            <Ionicons name="create-outline" size={20} color={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id)} style={styles.deleteButton}>
                            <Ionicons name="trash-outline" size={20} color={colors.error} />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Animated.View>
    );

}


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


    skeletonBox: {
        borderRadius: 6,
        backgroundColor: '#e0e0e0', // puedes usar un color neutro o `colors.skeleton`
    },

    skeletonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skeletonContent: {
        flex: 1,
    },
    skeletonActions: {
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between',
    },
    skeletonActionButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});


export default TaskItem;