import { create } from 'zustand';

let tokenInitialValue = '';

if (typeof window !== 'undefined') {
  tokenInitialValue = JSON.parse(localStorage.getItem('token')!);
}

interface TokenStore {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useToken = create<TokenStore>()((set) => ({
  token: tokenInitialValue,
  setToken: (token) => set((state) => ({ ...state, token: token })),
  removeToken: () => set((state) => ({ ...state, token: '' })),
}));

export default useToken;
