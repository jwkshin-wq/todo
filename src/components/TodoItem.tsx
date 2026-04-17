import { useState } from 'react';
import { Edit2, Trash2, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Todo } from '../types/todo';
import { PRIORITY_CONFIG, CATEGORY_CONFIG } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [expanded, setExpanded] = useState(false);

  const priority = PRIORITY_CONFIG[todo.priority];
  const category = CATEGORY_CONFIG[todo.category];

  const dueDateInfo = (() => {
    if (!todo.dueDate) return null;
    const date = parseISO(todo.dueDate);
    const overdue = !todo.completed && isPast(date) && !isToday(date);
    const today = isToday(date);
    return {
      label: today ? '오늘' : format(date, 'M월 d일', { locale: ko }),
      overdue,
      today,
    };
  })();

  return (
    <div
      className={clsx(
        'group bg-white rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in',
        priority.border,
        todo.completed && 'opacity-60',
      )}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={clsx(
            'mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
            todo.completed
              ? 'bg-indigo-600 border-indigo-600'
              : 'border-gray-300 hover:border-indigo-400',
          )}
        >
          {todo.completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <span
              className={clsx(
                'text-sm font-medium leading-snug',
                todo.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-900',
              )}
            >
              {todo.title}
            </span>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {/* Category */}
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <span>{category.emoji}</span>
              <span>{category.label}</span>
            </span>

            {/* Priority */}
            <span
              className={clsx(
                'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium',
                priority.bg,
                priority.color,
              )}
            >
              <span className={clsx('w-1.5 h-1.5 rounded-full', priority.dot)} />
              {priority.label}
            </span>

            {/* Due date */}
            {dueDateInfo && (
              <span
                className={clsx(
                  'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium',
                  dueDateInfo.overdue
                    ? 'bg-red-100 text-red-600'
                    : dueDateInfo.today
                    ? 'bg-amber-100 text-amber-600'
                    : 'bg-gray-100 text-gray-500',
                )}
              >
                <Calendar size={10} />
                {dueDateInfo.label}
                {dueDateInfo.overdue && ' (지남)'}
              </span>
            )}
          </div>

          {/* Description expanded */}
          {todo.description && expanded && (
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              {todo.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {todo.description && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
          <button
            onClick={() => onEdit(todo)}
            className="p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
