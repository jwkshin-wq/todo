import { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo, Filters, Priority, Category } from '../types/todo';

const STORAGE_KEY = 'todo-app-todos';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : getSampleTodos();
  } catch {
    return getSampleTodos();
  }
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getSampleTodos(): Todo[] {
  const now = new Date().toISOString();
  return [
    {
      id: uuidv4(),
      title: '프로젝트 기획서 작성',
      description: 'Q2 로드맵 정리 및 팀 공유',
      completed: false,
      priority: 'high',
      category: 'work',
      dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      createdAt: now,
      completedAt: '',
    },
    {
      id: uuidv4(),
      title: '헬스장 등록',
      description: '3개월 이상 등록 시 할인',
      completed: false,
      priority: 'medium',
      category: 'health',
      dueDate: '',
      createdAt: now,
      completedAt: '',
    },
    {
      id: uuidv4(),
      title: 'TypeScript 5.0 스터디',
      description: '새로운 기능 정리 및 블로그 포스팅',
      completed: true,
      priority: 'low',
      category: 'study',
      dueDate: '',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      completedAt: now,
    },
  ];
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  const update = useCallback((updated: Todo[]) => {
    setTodos(updated);
    saveTodos(updated);
  }, []);

  const addTodo = useCallback(
    (data: {
      title: string;
      description: string;
      priority: Priority;
      category: Category;
      dueDate: string;
    }) => {
      const todo: Todo = {
        id: uuidv4(),
        ...data,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: '',
      };
      update([todo, ...todos]);
    },
    [todos, update],
  );

  const editTodo = useCallback(
    (
      id: string,
      data: {
        title: string;
        description: string;
        priority: Priority;
        category: Category;
        dueDate: string;
      },
    ) => {
      update(todos.map((t) => (t.id === id ? { ...t, ...data } : t)));
    },
    [todos, update],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      update(
        todos.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: !t.completed,
                completedAt: !t.completed ? new Date().toISOString() : '',
              }
            : t,
        ),
      );
    },
    [todos, update],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      update(todos.filter((t) => t.id !== id));
    },
    [todos, update],
  );

  const clearCompleted = useCallback(() => {
    update(todos.filter((t) => !t.completed));
  }, [todos, update]);

  return { todos, addTodo, editTodo, toggleTodo, deleteTodo, clearCompleted };
}

export function useFilteredTodos(todos: Todo[], filters: Filters) {
  return useMemo(() => {
    return todos.filter((todo) => {
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;
      if (filters.category !== 'all' && todo.category !== filters.category)
        return false;
      if (filters.priority !== 'all' && todo.priority !== filters.priority)
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !todo.title.toLowerCase().includes(q) &&
          !todo.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [todos, filters]);
}
