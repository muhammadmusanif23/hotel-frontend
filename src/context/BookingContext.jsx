import { createContext, useContext, useMemo, useState } from 'react';
import { addDaysInput, todayInput } from '../utils/format';

const BookingContext = createContext(null);

const emptyDraft = {
  hotel: null,
  room: null,
  checkIn: todayInput(),
  checkOut: addDaysInput(2),
  guests: 2,
};

export function BookingProvider({ children }) {
  const [draft, setDraft] = useState(emptyDraft);

  const updateDraft = (patch) => setDraft((prev) => ({ ...prev, ...patch }));
  const resetDraft = () => setDraft(emptyDraft);

  const value = useMemo(() => ({ draft, updateDraft, resetDraft }), [draft]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};
