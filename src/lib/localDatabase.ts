import { v4 as uuidv4 } from 'uuid';

// Type definitions to match Supabase structure
type Table = 'profiles' | 'posts' | 'comments' | 'likes' | 'notifications' | 'messages' | 'chat_rooms' | 'chat_room_members';

interface QueryBuilder<T> {
  eq: (column: keyof T, value: any) => QueryBuilder<T>;
  neq: (column: keyof T, value: any) => QueryBuilder<T>;
  select: (columns: string) => QueryBuilder<T>;
  order: (column: keyof T, options: { ascending?: boolean }) => QueryBuilder<T>;
  single: () => Promise<{ data: T | null; error: Error | null }>;
  execute: () => Promise<{ data: T[]; error: Error | null }>;
}

class LocalDatabase {
  private storage: { [key in Table]: any[] } = {
    profiles: [],
    posts: [],
    comments: [],
    likes: [],
    notifications: [],
    messages: [],
    chat_rooms: [],
    chat_room_members: []
  };

  constructor() {
    // Load initial data from localStorage
    Object.keys(this.storage).forEach((table) => {
      const data = localStorage.getItem(`local_${table}`);
      if (data) {
        this.storage[table as Table] = JSON.parse(data);
      }
    });
  }

  private saveToStorage(table: Table) {
    localStorage.setItem(`local_${table}`, JSON.stringify(this.storage[table]));
  }

  from<T>(table: Table): QueryBuilder<T> {
    let filters: Array<(item: T) => boolean> = [];
    let selectedColumns: string[] = [];
    let orderColumn: keyof T | null = null;
    let ascending = true;

    const builder: QueryBuilder<T> = {
      eq: (column, value) => {
        filters.push((item: T) => item[column] === value);
        return builder;
      },
      neq: (column, value) => {
        filters.push((item: T) => item[column] !== value);
        return builder;
      },
      select: (columns) => {
        selectedColumns = columns.split(',').map(c => c.trim());
        return builder;
      },
      order: (column, options = {}) => {
        orderColumn = column;
        ascending = options.ascending ?? true;
        return builder;
      },
      single: async () => {
        try {
          let result = [...this.storage[table]] as T[];
          
          // Apply filters
          filters.forEach(filter => {
            result = result.filter(filter);
          });

          // Get first item
          const item = result[0] || null;

          // Select specific columns if specified
          if (selectedColumns.length > 0 && item) {
            const filtered = {} as T;
            selectedColumns.forEach(col => {
              filtered[col as keyof T] = item[col as keyof T];
            });
            return { data: filtered, error: null };
          }

          return { data: item, error: null };
        } catch (error) {
          return { data: null, error: error as Error };
        }
      },
      execute: async () => {
        try {
          let result = [...this.storage[table]] as T[];
          
          // Apply filters
          filters.forEach(filter => {
            result = result.filter(filter);
          });

          // Apply ordering
          if (orderColumn) {
            result.sort((a, b) => {
              const aVal = a[orderColumn];
              const bVal = b[orderColumn];
              return ascending ? 
                (aVal < bVal ? -1 : 1) :
                (aVal > bVal ? -1 : 1);
            });
          }

          // Select specific columns if specified
          if (selectedColumns.length > 0) {
            result = result.map(item => {
              const filtered = {} as T;
              selectedColumns.forEach(col => {
                filtered[col as keyof T] = item[col as keyof T];
              });
              return filtered;
            });
          }

          return { data: result, error: null };
        } catch (error) {
          return { data: [], error: error as Error };
        }
      }
    };

    return builder;
  }

  async insert<T>(table: Table, data: Partial<T>) {
    try {
      const newItem = {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        ...data
      };
      
      this.storage[table].push(newItem);
      this.saveToStorage(table);
      
      return { data: newItem as T, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async update<T>(table: Table, data: Partial<T>, match: Partial<T>) {
    try {
      const index = this.storage[table].findIndex(item => {
        return Object.entries(match).every(([key, value]) => item[key] === value);
      });

      if (index === -1) {
        throw new Error('Item not found');
      }

      this.storage[table][index] = {
        ...this.storage[table][index],
        ...data,
        updated_at: new Date().toISOString()
      };

      this.saveToStorage(table);
      
      return { data: this.storage[table][index] as T, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async delete<T>(table: Table, match: Partial<T>) {
    try {
      const initialLength = this.storage[table].length;
      
      this.storage[table] = this.storage[table].filter(item => {
        return !Object.entries(match).every(([key, value]) => item[key] === value);
      });

      if (initialLength === this.storage[table].length) {
        throw new Error('No items found to delete');
      }

      this.saveToStorage(table);
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
}

// Create a singleton instance
export const localDatabase = new LocalDatabase();

// Mock auth functionality
export const auth = {
  getSession: async () => {
    const session = localStorage.getItem('local_session');
    return { data: { session: session ? JSON.parse(session) : null } };
  },
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // Simple event listener setup
    window.addEventListener('local-auth-change', (e: any) => {
      callback(e.detail.event, e.detail.session);
    });
    return {
      subscription: {
        unsubscribe: () => {
          window.removeEventListener('local-auth-change', callback);
        }
      }
    };
  },
  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    // Simple mock authentication
    const mockUser = {
      id: uuidv4(),
      email,
      user_metadata: { username: email.split('@')[0] }
    };
    const mockSession = {
      user: mockUser,
      access_token: 'mock_token'
    };
    localStorage.setItem('local_session', JSON.stringify(mockSession));
    window.dispatchEvent(new CustomEvent('local-auth-change', {
      detail: { event: 'SIGNED_IN', session: mockSession }
    }));
    return { data: { user: mockUser, session: mockSession }, error: null };
  },
  signOut: async () => {
    localStorage.removeItem('local_session');
    window.dispatchEvent(new CustomEvent('local-auth-change', {
      detail: { event: 'SIGNED_OUT', session: null }
    }));
    return { error: null };
  }
};

// Export a mock Supabase client that uses the local database
export const mockSupabase = {
  from: (table: Table) => localDatabase.from(table),
  auth
};