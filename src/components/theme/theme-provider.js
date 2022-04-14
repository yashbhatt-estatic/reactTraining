/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { lazy, Suspense } from 'react';
import { useTheme } from './use-theme';

const DarkTheme = lazy(() => import('./dark-theme'));
const LightTheme = lazy(() => import('./light-theme'));

export function ThemeProvider({ children }) {
  const [darkMode] = useTheme();

  return (
    <>
      <Suspense fallback={<span />}>
        {darkMode ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
}
