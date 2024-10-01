import { useState } from "react";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useProductStore } from "@/store";
import { INITIAL_ALERT } from "@/constants";
import { createSlug } from "@/utils";

interface Props {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    label: string;
    name: "materials" | "tags";
    placeholder: string;
}

export const MaterialOrTag = ({state, setState, label, name, placeholder} : Props) => {

  const { product, setProduct, setAlert } = useProductStore();
  const [index, setIndex] = useState(-1);

  const onClickAdd = (e : React.FormEvent<HTMLFormElement>, name: "materials" | "tags", value: string) => {
    e.preventDefault();

    // Is editing
    if(index >= 0) {
        const updatedArray = [...product[name]];
        updatedArray[index] = value
        setProduct({
            ...product,
            [name]: updatedArray
        });
        resetState();
        return
    }
    
    if(value === "") {
        setAlert({ error: true, message: "The value to be added cannot be empty"});
        return
    }
    if(product[name].includes(state)) {
        setAlert({ error: true, message: "Values cannot be repeated, try again with other words"});
        return
    }
    if(value !== "") {
        setProduct({ 
            ...product, 
            [name]: name === "tags" ? [...product[name], createSlug(value)] : [...product[name], value] });

        resetState();
    }
  };

  const onClickRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) => {
    const name = e.currentTarget.name as "materials" | "tags";

    setProduct({
        ...product,
        [name]: [...product[name].filter(item => item !== value)]
    });
  }

  const onClickEdit = (value: string) => {
    setState(value);
    const id = product[name].findIndex(item => item === value);
    setIndex(id);
  }

  const resetState = () => {
    setState("");
    setIndex(-1);
    setAlert(INITIAL_ALERT);
  }


  return (
    <div className="flex flex-col gap-2">
        
        <label htmlFor={name} className="text-gray-900 text-xl font-medium px-1">{label}</label>
        {product[name].length ? (
            <ul className="my-2">
                {product[name ].map(item => (
                    <li key={item} className="  text-gray-500 px-1 py-4 border-b flex justify-between items-center">
                        <p className="text-sm">{item}</p>     
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                className="size-5"
                                name={name}
                                onClick={() => onClickEdit(item)}
                            >
                                <PencilSquareIcon className=" text-gray-400 hover:text-gray-800 transition-colors duration-300" />                          
                            </button>    
                            <button 
                                type="button"
                                className="size-5"
                                name={name}
                                onClick={e => onClickRemove(e, item)}
                            >
                                <TrashIcon className=" text-gray-400 hover:text-gray-800 transition-colors duration-300" />                          
                            </button>
                        </div>  
                    </li>
                ))}
            </ul>
        ) : (
            <div className="text-sm text-gray-500 py-4 px-1 border-b flex justify-between items-center">
                <p>No {label.toLocaleLowerCase()} added yet</p>
            </div>
        )}

        <div className="flex flex-col gap-4">
                
            <div className="flex gap-3 items-center">
                <form onSubmit={(e) => onClickAdd(e, name, state)} className="flex items-center gap-2 w-full">
                    <input 
                        type="text"
                        id={name}
                        onChange={e => setState(e.currentTarget.value)}
                        value={state}
                        placeholder={placeholder}
                        className="rounded-xl py-3 w-full px-4 bg-gray-50 placeholder:text-sm text-sm text-gray-500 flex-1" 
                    />
                    <button
                        type="submit"
                        className="size-5 rounded-full transition-colors"
                    >
                        <PlusIcon className=" text-gray-400 hover:text-gray-800 transition-colors duration-300 " />
                    </button>
                    </form>
            </div>
        </div>
    </div>
  )
}
