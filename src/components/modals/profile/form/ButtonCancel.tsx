"use client";

import { useModalStore } from "@/store";

export const ButtonCancel = () => {
    
  const hiddenModalProfile = useModalStore(state => state.hiddenModalProfile);
    
  return (
    <button 
        onClick={hiddenModalProfile}
        type="button" 
        className="text-gray-700 font-medium"
    >
        Cancel
    </button>
  )
}
