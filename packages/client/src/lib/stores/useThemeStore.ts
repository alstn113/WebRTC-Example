import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeType } from '~/styles';

type States = {
  theme: ThemeType;
};

type Actions = {
  setTheme: (theme: ThemeType) => void;
};

const useThemeStore = create<States & Actions>()(
  persist(
    (set) => ({
      theme: 'lightTheme',
      setTheme: (theme: ThemeType) =>
        set(
          produce((draft: States) => {
            draft.theme = theme === 'darkTheme' ? 'darkTheme' : 'lightTheme';
          }),
        ),
    }),
    {
      name: 'theme',
      getStorage: () => localStorage,
    },
  ),
);

export default useThemeStore;
