import { Search, Plus, Trash2 } from 'lucide-react';

interface HeaderProps {
  search: string;
  setSearch: (v: string) => void;
  onAdd: () => void;
  onClearCompleted: () => void;
  completedCount: number;
  title: string;
}

export default function Header({
  search,
  setSearch,
  onAdd,
  onClearCompleted,
  completedCount,
  title,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-lg border border-transparent focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
        </div>

        {/* Clear completed */}
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <Trash2 size={14} />
            완료 삭제 ({completedCount})
          </button>
        )}

        {/* Add button */}
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          할 일 추가
        </button>
      </div>
    </header>
  );
}
