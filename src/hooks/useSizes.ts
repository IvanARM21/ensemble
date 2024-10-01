
import { useState, useEffect } from "react";
import { useSizeStore } from "@/store";
import { getSizesByType } from "@/actions";
import { Size } from "@/interfaces";

export const useSizes = () => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const { size, setSizesByType, sizesByType, setAlert, reset } = useSizeStore();
  
  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (size.type) {
      getSizes();
    }
  }, [size.type]);

  useEffect(() => {
    if (size.label) {
      const sizeExists = sizesByType?.some(sizeState => sizeState.label === size.label && sizeState.id !== size.id);
      setAlert({ message: sizeExists ? "The name of size exists" : "", error: sizeExists });
    }
  }, [size.label, sizesByType, setAlert]);

  const getSizes = async () => {
    const { sizes, error, message } = await getSizesByType(size.type);
    if(Array.isArray(sizes)) {
      const sizesFormatted = sizes.sort((a, b) => a.order - b.order);
      setSizesByType(sizesFormatted);
    }
    if(error) {
      setAlert({message, error});
    }
  };

  return { sizes, setSizes };
};
