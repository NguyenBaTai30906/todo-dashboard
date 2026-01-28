'use client';

interface TaskCardProps {
    id: string;
    title: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
}

const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
};

const priorityLabels = {
    high: 'Cao',
    medium: 'TB',
    low: 'Thấp',
};

export default function TaskCard({
    id, title, completed, priority, dueDate,
    onToggle, onDelete, onEdit
}: TaskCardProps) {

    const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed;

    const handleEdit = () => {
        const newTitle = prompt('Sửa công việc:', title);
        if (newTitle && newTitle.trim()) {
            onEdit(id, newTitle.trim());
        }
    };

    return (
        <div className={`flex items-center justify-between p-4 bg-white/10 backdrop-blur rounded-xl border border-white/10 hover:bg-white/15 transition-all ${isOverdue ? 'border-red-500/50' : ''}`}>
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => onToggle(id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-400 hover:border-white'
                        }`}
                >
                    {completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    <div className={`text-white truncate ${completed ? 'line-through opacity-50' : ''}`}>
                        {title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${priorityColors[priority]}`}></span>
                        <span className="text-xs text-slate-400">{priorityLabels[priority]}</span>
                        {dueDate && (
                            <span className={`text-xs ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}>
                                • {isOverdue ? 'Quá hạn: ' : 'Hạn: '}{new Date(dueDate).toLocaleDateString('vi-VN')}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 ml-4">
                <button
                    onClick={handleEdit}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 px-2 py-1 rounded-lg transition-all text-sm"
                >
                    Sửa
                </button>
                <button
                    onClick={() => onDelete(id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 px-2 py-1 rounded-lg transition-all text-sm"
                >
                    Xóa
                </button>
            </div>
        </div>
    );
}
