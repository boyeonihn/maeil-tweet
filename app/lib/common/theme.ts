import { ThemeMode } from '../types';

export const getThemeName = (mode?: ThemeMode) =>
  mode === undefined || mode === 'light' ? 'valentine' : 'dracula';
