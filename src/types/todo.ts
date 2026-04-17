export type Priority = 'high' | 'medium' | 'low';

export type Category =
  | 'personal'
  | 'work'
  | 'shopping'
  | 'health'
  | 'study'
  | 'other';

export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;
  createdAt: string;
  completedAt: string;
}

export interface Filters {
  status: FilterStatus;
  category: Category | 'all';
  priority: Priority | 'all';
  search: string;
}

export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  high: {
    label: '높음',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-500',
    dot: 'bg-red-500',
  },
  medium: {
    label: '보통',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-500',
    dot: 'bg-amber-500',
  },
  low: {
    label: '낮음',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-500',
    dot: 'bg-emerald-500',
  },
};

export const CATEGORY_CONFIG: Record<
  Category,
  { label: string; emoji: string; color: string }
> = {
  personal: { label: '개인', emoji: '👤', color: 'text-violet-600' },
  work: { label: '업무', emoji: '💼', color: 'text-blue-600' },
  shopping: { label: '쇼핑', emoji: '🛒', color: 'text-pink-600' },
  health: { label: '건강', emoji: '💪', color: 'text-green-600' },
  study: { label: '공부', emoji: '📚', color: 'text-orange-600' },
  other: { label: '기타', emoji: '📌', color: 'text-gray-600' },
};
