import { useState } from 'react';
import type { Filters, Todo } from './types/todo';
import { useTodos, useFilteredTodos } from './hooks/useTodos';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { CATEGORY_CONFIG } from './types/todo';

const DEFAULT_FILTERS: Filters = {
  status: 'all',
  category: 'all',
  priority: 'all',
  search: '',
};

function getTitle(filters: Filters): string {
  if (filters.search) return `"${filters.search}" 검색 결과`;
  if (filters.category !== 'all') {
    return CATEGORY_CONFIG[filters.category].label;
  }
  if (filters.priority !== 'all') {
    const map = { high: '높은 우선순위', medium: '보통 우선순위', low: '낮은 우선순위' };
    return map[filters.priority];
  }
  if (filters.status === 'active') return '진행 중';
  if (filters.status === 'completed') return '완료됨';
  return '전체';
}

export default function App() {
  const { todos, addTodo, editTodo, toggleTodo, deleteTodo, clearCompleted } =
    useTodos();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Todo | null>(null);

  const filteredTodos = useFilteredTodos(todos, filters);
  const completedCount = todos.filter((t) => t.completed).length;

  const handleSave = (data: {
    title: string;
    description: string;
    priority: import('./types/todo').Priority;
    category: import('./types/todo').Category;
    dueDate: string;
  }) => {
    if (editTarget) {
      editTodo(editTarget.id, data);
    } else {
      addTodo(data);
    }
    setEditTarget(null);
  };

  const handleEdit = (todo: Todo) => {
    setEditTarget(todo);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditTarget(null);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar filters={filters} setFilters={setFilters} todos={todos} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          search={filters.search}
          setSearch={(s) => setFilters((f) => ({ ...f, search: s }))}
          onAdd={() => setShowForm(true)}
          onClearCompleted={clearCompleted}
          completedCount={completedCount}
          title={getTitle(filters)}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onEdit={handleEdit}
          onDelete={deleteTodo}
        />
      </div>

      {showForm && (
        <TodoForm
          todo={editTarget}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
