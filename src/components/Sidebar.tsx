import { CheckSquare, Inbox, CheckCircle, Circle } from 'lucide-react';
import clsx from 'clsx';
import type { Filters, Category, Priority, Todo } from '../types/todo';
import {
  CATEGORY_CONFIG,
  PRIORITY_CONFIG,
} from '../types/todo';

interface SidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  todos: Todo[];
}

export default function Sidebar({ filters, setFilters, todos }: SidebarProps) {
  const active = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  const set = (partial: Partial<Filters>) =>
    setFilters((f) => ({ ...f, ...partial }));

  const navItem = (
    label: string,
    icon: React.ReactNode,
    isActive: boolean,
    onClick: () => void,
    count?: number,
  ) => (
    <button
      onClick={onClick}
      className={clsx(
        'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-indigo-600 text-white'
          : 'text-slate-300 hover:bg-white/10 hover:text-white',
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span
          className={clsx(
            'text-xs px-2 py-0.5 rounded-full font-semibold',
            isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );

  return (
    <aside className="w-56 bg-slate-900 flex flex-col h-screen shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <CheckSquare size={22} className="text-indigo-400" />
          <span className="text-white font-bold text-lg tracking-tight">
            TODO
          </span>
        </div>
        <p className="text-slate-500 text-xs mt-1">나의 할 일 목록</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* Status */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
          상태
        </p>
        {navItem(
          '전체',
          <Inbox size={16} />,
          filters.status === 'all' &&
            filters.category === 'all' &&
            filters.priority === 'all',
          () => set({ status: 'all', category: 'all', priority: 'all' }),
          todos.length,
        )}
        {navItem(
          '진행 중',
          <Circle size={16} />,
          filters.status === 'active',
          () => set({ status: 'active', category: 'all', priority: 'all' }),
          active,
        )}
        {navItem(
          '완료됨',
          <CheckCircle size={16} />,
          filters.status === 'completed',
          () =>
            set({ status: 'completed', category: 'all', priority: 'all' }),
          completed,
        )}

        {/* Categories */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mt-5 mb-2">
          카테고리
        </p>
        {(Object.keys(CATEGORY_CONFIG) as Category[]).map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const cnt = todos.filter((t) => t.category === cat).length;
          if (cnt === 0) return null;
          return navItem(
            cfg.label,
            <span className="text-base leading-none">{cfg.emoji}</span>,
            filters.category === cat,
            () => set({ status: 'all', category: cat, priority: 'all' }),
            cnt,
          );
        })}

        {/* Priority */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mt-5 mb-2">
          우선순위
        </p>
        {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((pri) => {
          const cfg = PRIORITY_CONFIG[pri];
          const cnt = todos.filter((t) => t.priority === pri).length;
          if (cnt === 0) return null;
          return navItem(
            cfg.label,
            <span className={clsx('w-2 h-2 rounded-full inline-block', cfg.dot)} />,
            filters.priority === pri,
            () => set({ status: 'all', category: 'all', priority: pri }),
            cnt,
          );
        })}
      </nav>

      {/* Progress */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>완료율</span>
          <span>
            {todos.length > 0
              ? Math.round((completed / todos.length) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{
              width:
                todos.length > 0
                  ? `${(completed / todos.length) * 100}%`
                  : '0%',
            }}
          />
        </div>
        <p className="text-slate-500 text-xs mt-1.5">
          {completed}/{todos.length} 완료
        </p>
      </div>
    </aside>
  );
}
