import { createContext, useContext, useState, ReactNode } from 'react';

interface TimezoneContextType {
  selectedTimezone: string;
  setTimezone: (tz: string) => void;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [selectedTimezone, setSelectedTimezone] = useState(() => {
    return localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
  });

  const setTimezone = (tz: string) => {
    localStorage.setItem('timezone', tz);
    setSelectedTimezone(tz);
  };

  return (
    <TimezoneContext.Provider value={{ selectedTimezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (!context) throw new Error('useTimezone must be used within TimezoneProvider');
  return context;
}
