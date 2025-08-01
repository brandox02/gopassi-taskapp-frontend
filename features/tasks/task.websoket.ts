// src/services/websocket.service.ts
import io, { Socket } from 'socket.io-client';
import { useTaskStore } from './task.store';

const WEBSOCKET_URL = process.env.EXPO_PUBLIC_API_URL || 'http://172.29.16.1:3000';

class WebSocketService {
    private socket: Socket | null = null;
    private token: string | null = null;

    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectInterval = 5000; // 5 segundos

    initialize(token: string) {
        this.token = token;
        this.socket = io(WEBSOCKET_URL + '/tasks', {
            auth: { token },
            transports: ['websocket'],
        });

        this.setupEventListeners();
    }

    private setupEventListeners() {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            this.reconnectAttempts = 0;
            console.log('Connected to WebSocket server');
        });

        this.socket.on('disconnect', (reason: any) => {
            if (reason === 'io server disconnect') {
                // Reconexión necesaria
                this.socket?.connect();
            }
            console.log('Disconnected:', reason);
        });

        this.socket.on('reconnect_attempt', (attempt: any) => {
            this.reconnectAttempts = attempt;
            console.log(`Reconnection attempt ${attempt}`);
        });

        this.socket.on('reconnect_failed', () => {
            console.error('Failed to reconnect to WebSocket server');
        });

        this.socket.on('task_created', (task: any) => {
            useTaskStore.getState().addTaskFromSocket(task);
        });

        this.socket.on('task_updated', (task: any) => {
            console.log('task_updated', task)
            useTaskStore.getState().updateTaskFromSocket(task);
        });

        this.socket.on('task_deleted', (data: any) => {
            useTaskStore.getState().removeTaskFromSocket(data.id);
        });

        this.socket.on('connect_error', (err: any) => {
            console.error('WebSocket connection error:', err);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const webSocketService = new WebSocketService();