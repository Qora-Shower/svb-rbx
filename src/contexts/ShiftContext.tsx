
import React, { createContext, useContext, useState, useEffect } from "react";

export interface ServiceQuota {
  name: string;
  total: number;
  taken: number;
}

export interface ShiftParticipant {
  username: string;
  service?: string;
  role?: string;
}

export interface ShiftItem {
  id: string;
  host: string;
  date: string;
  time: string;
  status: "Aktiv" | "Verzögert" | "Abgesagt";
  participants?: ShiftParticipant[];
  maxParticipants?: number;
  description?: string;
  assignmentType: "free" | "fixed";
  serviceQuotas?: ServiceQuota[];
}

interface ShiftContextType {
  shifts: ShiftItem[];
  addShift: (shiftItem: ShiftItem) => void;
  updateShift: (id: string, updatedShift: Partial<ShiftItem>) => void;
  deleteShift: (id: string) => void;
  updateShiftStatus: (id: string, status: ShiftItem["status"]) => void;
  joinShift: (shiftId: string, username: string, service?: string, role?: string) => boolean;
  getUserShifts: (username: string) => ShiftItem[];
  isShiftExpired: (shift: ShiftItem) => boolean;
}

const ShiftContext = createContext<ShiftContextType | null>(null);

export const ShiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shifts, setShifts] = useState<ShiftItem[]>(() => {
    const savedShifts = localStorage.getItem("shifts");
    return savedShifts ? JSON.parse(savedShifts) : [];
  });

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  const isShiftExpired = (shift: ShiftItem) => {
    const [shiftDate, shiftTime] = [shift.date, shift.time.split(" - ")[1]];
    const shiftDateTime = new Date(`${shiftDate.split(".").reverse().join("-")}T${shiftTime}`);
    return new Date() > shiftDateTime;
  };

  // Clean up expired shifts
  useEffect(() => {
    const cleanupExpiredShifts = () => {
      setShifts(prev => prev.filter(shift => 
        !(shift.status === "Abgesagt" && isShiftExpired(shift))
      ));
    };

    cleanupExpiredShifts();
    const interval = setInterval(cleanupExpiredShifts, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

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

  const updateShiftStatus = (id: string, status: ShiftItem["status"]) => {
    updateShift(id, { status });
  };

  const joinShift = (shiftId: string, username: string, service?: string, role?: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    
    if (!shift || shift.status === "Abgesagt") {
      return false;
    }

    const participant: ShiftParticipant = { 
      username,
      service,
      role
    };

    updateShift(shiftId, {
      participants: [...(shift.participants || []), participant]
    });
    
    return true;
  };

  const getUserShifts = (username: string) => {
    return shifts.filter(shift => 
      shift.host === username || shift.participants?.some(p => p.username === username)
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
      getUserShifts,
      isShiftExpired
    }}>
      {children}
    </ShiftContext.Provider>
  );
};

export const useShiftContext = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error("useShiftContext must be used within a ShiftProvider");
  }
  return context;
};
