import { createContext, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-language';
const DEFAULT_LANGUAGE = 'es';
const TRANSITION_OUT_MS = 140;
const TRANSITION_IN_MS = 180;

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const timersRef = useRef([]);
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE;
    }

    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return storedLanguage === 'en' || storedLanguage === 'es'
      ? storedLanguage
      : DEFAULT_LANGUAGE;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const setLanguage = (nextLanguage) => {
    if (nextLanguage === language || isTransitioning) {
      return;
    }

    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    setIsTransitioning(true);

    timersRef.current.push(
      window.setTimeout(() => {
        setLanguageState(nextLanguage);
      }, TRANSITION_OUT_MS)
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_OUT_MS + TRANSITION_IN_MS)
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage: () => setLanguage(language === 'es' ? 'en' : 'es'),
        isTransitioning,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
