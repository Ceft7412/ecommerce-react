import React, { createContext, useState } from "react";
interface DropDownProps {
  children: React.ReactNode;
}

interface DropwDownContextType {
  isDropDownOpen: boolean;
  toggleDropDown: () => void;
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialState = {
  isDropDownOpen: false,
  toggleDropDown: () => {},
  setIsDropDownOpen: () => {},
};
export const DropDownContext = createContext<DropwDownContextType>(initialState);
function DropDownProvider({ children }: DropDownProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };
  return (
    <DropDownContext.Provider
      value={{ isDropDownOpen, toggleDropDown, setIsDropDownOpen }}
    >
      {children}
    </DropDownContext.Provider>
  );
}

export default DropDownProvider;
