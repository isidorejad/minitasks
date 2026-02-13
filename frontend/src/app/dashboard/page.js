"use client";
import { useEffect, useState } from 'react';
import api from '../../utils/api'; 
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const router = useRouter();

  // New Task State
  const [newTask, setNewTask] = useState({ 
    title: '', description: '', priority: 'Medium', due_date: '', status: 'To Do' 
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks/?status_filter=${filter}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [filter, router]);

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const handleUpdateStatus = async (id, status) => {
    // Optimistic Update
    setTasks(tasks.map(t => t._id === id ? { ...t, status } : t));
    await api.put(`/tasks/${id}`, { status });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
        await api.post('/tasks/', newTask);
        setIsFormOpen(false);
        setNewTask({ title: '', description: '', priority: 'Medium', due_date: '', status: 'To Do' });
        // Refresh list
        const res = await api.get(`/tasks/?status_filter=${filter}`);
        setTasks(res.data);
    } catch (e) {
        alert("Error creating task");
    }
  };

  const handleAISuggestion = async () => {
    if(!newTask.description) return alert("Please type a description first!");
    setLoadingAI(true);
    try {
      const res = await api.post('/tasks/suggest-due-date', { description: newTask.description });
      const dateOnly = res.data.suggested_date.split('T')[0]; 
      setNewTask({ ...newTask, due_date: dateOnly });
    } catch (err) {
      alert("AI Service Unavailable");
    } finally {
      setLoadingAI(false);
    }
  };

  // UI Helpers
  const priorityColor = (p) => {
    if (p === 'High') return 'bg-rose-100 text-rose-700 border-rose-200';
    if (p === 'Medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">My Tasks</h1>
          <p className="text-slate-500">Welcome back! Here is what&quot;s on your plate.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)} 
          className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl bg-slate-900 px-6 font-medium text-white transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20">
          <span className="mr-2 text-xl leading-none">+</span>
          {isFormOpen ? 'Close Editor' : 'Create Task'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1 gap-1 bg-slate-200/50 backdrop-blur rounded-xl w-fit">
        {['', 'To Do', 'In Progress', 'Done'].map(s => (
          <button 
            key={s} 
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === s 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}>
            {s || 'All Tasks'}
          </button>
        ))}
      </div>

      {/* Create Form */}
      {isFormOpen && (
        <div className="animate-in slide-in-from-top-4 fade-in duration-300 bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/40">
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Title</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                  placeholder="What needs doing?" 
                  required
                  value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Priority</label>
                   <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500"
                    value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Due Date</label>
                   <input 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500"
                    value={newTask.due_date} onChange={e => setNewTask({...newTask, due_date: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
              <textarea 
                className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none" 
                placeholder="Add details here..."
                rows={3}
                value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}
              />
              
              <div className="mt-4 flex items-center justify-between">
                 <button 
                  type="button" 
                  onClick={handleAISuggestion}
                  disabled={loadingAI}
                  className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors disabled:opacity-50">
                  {loadingAI ? (
                    <span className="animate-spin">🌀</span>
                  ) : (
                    <span>✨ AI Suggest Due Date</span>
                  )}
                </button>
                
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95 transition-all">
                  Create Task
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Task Grid */}
      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-3xl">
          <p className="text-slate-400">No tasks found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task._id} className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${priorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <div className="relative">
                     <select 
                      value={task.status} 
                      onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-md border appearance-none cursor-pointer outline-none transition-colors
                        ${task.status === 'Done' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}
                      `}>
                      <option>To Do</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
                  </div>
                </div>

                <h3 className={`font-bold text-lg text-slate-800 mb-2 ${task.status === 'Done' ? 'line-through text-slate-400' : ''}`}>
                  {task.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {task.description || "No description provided."}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}
                </div>
                
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors p-1 rounded hover:bg-rose-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}