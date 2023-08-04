import React, { createContext, useContext, useEffect, useState } from 'react';
import BackgroundTimer from 'react-native-background-timer';

interface AppTimerContextType {
  timeSpent: number;
  setTimeSpent: React.Dispatch<React.SetStateAction<number>>;
}

const AppTimerContext = createContext<AppTimerContextType>({
  timeSpent: 0,
  setTimeSpent: () => {},
});

export const useAppTimerContext = () => useContext(AppTimerContext);

interface AppTimerProviderProps {
  children: React.ReactNode;
}

const AppTimerProvider: React.FC<AppTimerProviderProps> = ({ children }) => {
  const [timeSpent, setTimeSpent] = useState<number>(0);

  useEffect(() => {
    const timerInterval = 1000; // 1 second
    let intervalId: number;

    // Start the timer when the component mounts
    const startTimer = () => {
      intervalId = BackgroundTimer.setInterval(() => {
        setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
      }, timerInterval);
    };

    // Stop the timer when the component unmounts
    const stopTimer = () => {
      BackgroundTimer.clearInterval(intervalId);
    };

    // Start the timer when the component mounts
    startTimer();

    // Stop the timer when the component unmounts
    return () => stopTimer();
  }, []);

  return (
    <AppTimerContext.Provider value={{ timeSpent, setTimeSpent }}>
      {children}
    </AppTimerContext.Provider>
  );
};

export default AppTimerProvider;