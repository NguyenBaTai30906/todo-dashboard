import { useState, useEffect, useMemo } from 'react';
import { Task } from '@/types/task';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // CRUD 
    const addTask = (title: string, priority: 'high' | 'medium' | 'low', dueDate?: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            priority,
            dueDate,
            createdAt: new Date().toISOString(),
        };
        setTasks([newTask, ...tasks]);
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id: string, newTitle: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };

    return { tasks, addTask, toggleTask, deleteTask, editTask };
}

export function useTaskFilter(tasks: Task[], filter: string, searchQuery: string) {
    return useMemo(() => {
        let result = tasks;

        switch (filter) {
            case 'pending':
                result = result.filter(t => !t.completed);
                break;
            case 'completed':
                result = result.filter(t => t.completed);
                break;
            case 'overdue':
                result = result.filter(t =>
                    t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
                );
                break;
        }

        if (searchQuery.trim()) {
            result = result.filter(t =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return result;
    }, [tasks, filter, searchQuery]);
}

export function useTaskStats(tasks: Task[]) {
    return useMemo(() => ({
        total: tasks.length,
        pending: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
        overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length,
    }), [tasks]);
}
