import { createContext } from 'react';
import { User } from 'types/users';

interface Context {
  setUser?: (x) => void;
  currentUser: User | null;
  loading: boolean;
}

const defaultContext = {
  currentUser: null,
  loading: false,
};

export const UserContext = createContext<Context>(defaultContext);
