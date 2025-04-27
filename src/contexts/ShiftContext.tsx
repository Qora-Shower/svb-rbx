
import React, { createContext, useContext, useState, useEffect } from "react";

// Type definitions for shift items
export interface ShiftItem {
  id: string;
  host: string;
  date: string;
  time: string;
  status: string;
  participants?: string[];
  maxParticipants?: number;
  description?: string;
  assignmentType?: "free" | "fixed";
}

// Define the context type
interface ShiftContextType {
  shifts: ShiftItem[];
  addShift: (shiftItem: ShiftItem) => void;
  updateShift: (id: string, updatedShift: Partial<ShiftItem>) => void;
  deleteShift: (id: string) => void;
  updateShiftStatus: (id: string, status: string) => void;
  joinShift: (shiftId: string, username: string) => boolean;
  getUserShifts: (username: string) => ShiftItem[];
}

// Initial sample shift data
const initialShifts: ShiftItem[] = [
  {
    id: "1",
    host: "MaxBusFahrer",
    date: "27.04.2025",
    time: "14:00 - 16:00",
    status: "Aktiv",
    maxParticipants: 5,
    participants: []
  },
  {
    id: "2",
    host: "BusProfi99",
    date: "27.04.2025",
    time: "16:30 - 18:30",
    status: "Offen",
    maxParticipants: 10,
    participants: []
  },
  {
    id: "3",
    host: "SpeedDrive",
    date: "28.04.2025",
    time: "08:00 - 10:00",
    status: "Verzögert",
    maxParticipants: 8,
    participants: []
  }
];

// Create the context
const ShiftContext = createContext<ShiftContextType | null>(null);

// Provider component
export const ShiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shifts, setShifts] = useState<ShiftItem[]>(() => {
    const savedShifts = localStorage.getItem("shifts");
    return savedShifts ? JSON.parse(savedShifts) : initialShifts;
  });
  
  // Save to localStorage whenever shifts change
  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  const addShift = (shiftItem: ShiftItem) => {
    setShifts(prev => [shiftItem, ...prev]);
  };

  const updateShift = (id: string, updatedShift: Partial<ShiftItem>) => {
    setShifts(prev => prev.map(shift => 
      shift.id === id ? { ...shift, ...updatedShift } : shift
    ));
  };

  const deleteShift = (id: string) => {
    setShifts(prev => prev.filter(shift => shift.id !== id));
  };
  
  const updateShiftStatus = (id: string, status: string) => {
    setShifts(prev => prev.map(shift => 
      shift.id === id ? { ...shift, status } : shift
    ));
  };
  
  const joinShift = (shiftId: string, username: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    
    if (!shift || shift.status === "Abgesagt" || shift.status === "Voll") {
      return false;
    }
    
    // Check if already joined
    if (shift.participants?.includes(username)) {
      return true;
    }
    
    // Check if full
    if (shift.participants?.length >= (shift.maxParticipants || 10)) {
      updateShiftStatus(shiftId, "Voll");
      return false;
    }
    
    // Join the shift
    const updatedParticipants = [...(shift.participants || []), username];
    updateShift(shiftId, { participants: updatedParticipants });
    
    // If now full, update status
    if (updatedParticipants.length >= (shift.maxParticipants || 10)) {
      updateShiftStatus(shiftId, "Voll");
    }
    
    return true;
  };
  
  const getUserShifts = (username: string) => {
    return shifts.filter(shift => 
      shift.host === username || shift.participants?.includes(username)
    );
  };

  return (
    <ShiftContext.Provider value={{ 
      shifts, 
      addShift, 
      updateShift, 
      deleteShift,
      updateShiftStatus,
      joinShift,
      getUserShifts
    }}>
      {children}
    </ShiftContext.Provider>
  );
};

// Hook to use the shift context
export const useShiftContext = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error("useShiftContext must be used within a ShiftProvider");
  }
  return context;
};
