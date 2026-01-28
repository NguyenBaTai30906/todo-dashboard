'use client';

import { useState } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { useTasks, useTaskFilter, useTaskStats } from '@/hooks/useTasks';

type FilterType = 'all' | 'pending' | 'completed' | 'overdue';

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useTaskFilter(tasks, filter, searchQuery);
  const stats = useTaskStats(tasks);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            📝 Quản Lý Công Việc
          </h1>
          <p className="text-slate-400">Theo dõi và hoàn thành task hiệu quả</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-slate-400 text-xs">Tổng cộng</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-slate-400 text-xs">Đang làm</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-slate-400 text-xs">Hoàn thành</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-red-400">{stats.overdue}</div>
            <div className="text-slate-400 text-xs">Quá hạn</div>
          </div>
        </div>

        {/* Add Form */}
        <TaskForm onSubmit={addTask} />

        {/* Search & Filter */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Tìm kiếm công việc..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all" className="bg-slate-800">Tất cả</option>
            <option value="pending" className="bg-slate-800">Đang làm</option>
            <option value="completed" className="bg-slate-800">Hoàn thành</option>
            <option value="overdue" className="bg-slate-800">Quá hạn</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-white/5 rounded-xl p-8 text-center">
              <p className="text-slate-500">
                {searchQuery ? 'Không tìm thấy công việc phù hợp' : 'Chưa có công việc nào. Hãy thêm mới!'}
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                completed={task.completed}
                priority={task.priority}
                dueDate={task.dueDate}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          Được tạo bởi Nguyễn Bá Tài
        </div>
      </div>
    </main>
  );
}
