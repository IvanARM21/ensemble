import { useState } from "react"
import { StepHeader } from "../StepHeader"
import { useProductStore } from "@/store"
import { Alert } from "@/components"
import { MaterialOrTag } from "./MaterialOrTag";

export const MaterialsAndTags = () => {

  const { alert } = useProductStore();
  const [material, setMaterial] = useState("");  
  const [tag, setTag] = useState("");  

  return (
    <>
      <StepHeader 
        title="Materials and Tags" 
        description="Elevate the product description by adding key material details to enhance user satisfaction. Use relevant tags to optimize the search experience."
      />
        {alert.message && (
            <div className="mb-5">
                <Alert {...alert} />
            </div>
        )}
        <div className="flex flex-col gap-5 mb-5">
            <MaterialOrTag 
                setState={setMaterial}
                state={material}
                label="Materials"
                name="materials"
                placeholder="Write a new material"
            />
            <p className=" text-gray-500 text-sm">
              Examples to create a material: 'Cotton', 'Polyster', 'Spandex'.
            </p>

            <MaterialOrTag 
                setState={setTag}
                state={tag}
                label="Tags"
                name="tags"
                placeholder="Write a new tag"
            />
            <p className=" text-gray-500 text-sm">
              Examples to create a tag: 'Basic T-shirt', 'Casual Style', 'Cotton T-shirt'.
            </p>
           
        </div>
    </>
  )
}
