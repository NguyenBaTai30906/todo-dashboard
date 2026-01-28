'use client';

import { useState } from 'react';

interface TaskFormProps {
    onSubmit: (title: string, priority: 'high' | 'medium' | 'low', dueDate?: string) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit(title.trim(), priority, dueDate || undefined);
            setTitle('');
            setPriority('medium');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur rounded-xl p-4 mb-8 border border-white/10">
            <div className="flex gap-3 mb-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập công việc cần làm..."
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                    Thêm
                </button>
            </div>
            <div className="flex gap-3">
                <div className="flex-1">
                    <label className="text-slate-400 text-sm mb-1 block">Độ ưu tiên</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                        className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="high" className="bg-slate-800">🔴 Cao</option>
                        <option value="medium" className="bg-slate-800">🟡 Trung bình</option>
                        <option value="low" className="bg-slate-800">🟢 Thấp</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="text-slate-400 text-sm mb-1 block">Hạn chót (tùy chọn)</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>
        </form>
    );
}
