import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ContextType = {
    role: string; 
    setRole: Dispatch<SetStateAction<string>>
}

export const useRoleContext = () =>{
    const context = useContext(roleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleContextProvider");
  }
  return context;

}

export const roleContext = createContext<ContextType | null>(null)

export default function RoleContextProvider({children}:{
    children:React.ReactNode
})
{
    const [role,setRole] = useState('')

    return (
        <roleContext.Provider value={{role,setRole}}>
            {children}
        </roleContext.Provider>
    )
}