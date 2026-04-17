import { ClipboardList } from 'lucide-react';
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-24 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <ClipboardList size={28} className="text-gray-400" />
        </div>
        <h3 className="text-gray-600 font-semibold text-base mb-1">
          할 일이 없어요
        </h3>
        <p className="text-gray-400 text-sm">
          위 버튼을 눌러 새 할 일을 추가해 보세요.
        </p>
      </div>
    );
  }

  const active = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      {active.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            진행 중 · {active.length}
          </p>
          <div className="space-y-2">
            {active.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            완료됨 · {completed.length}
          </p>
          <div className="space-y-2">
            {completed.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
