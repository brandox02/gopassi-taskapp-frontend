export interface Task {
    id: string;
    title: string;
    done: boolean;
    createdAt: string;
    user: {
        id: number
        username: string
        fullname: string
    }
}

export interface TaskApiResponse {
    data: Task | Task[];
    message?: string;
}

export interface CreateTaskDto {
    title: string;
}

export interface UpdateTaskDto {
    title?: string;
    done?: boolean;
}