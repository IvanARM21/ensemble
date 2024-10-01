
import { useEffect } from "react";
import { closestCenter, DndContext, DragEndEvent, TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSizeStore } from "@/store";
import { Size } from "@/interfaces";
import { SizeOrder } from "./SizeOrder";
import { StepHeader } from "../StepHeader";

interface Props {
  sizes: Size[];
  setSizes: React.Dispatch<React.SetStateAction<Size[]>>;
}

export const SizesOrder = ({sizes, setSizes} : Props) => {

  const { sizesByType, size } = useSizeStore();

  useEffect(() => {
    const existsSize = sizesByType.some(sizeType => sizeType.id === size.id);
    if(existsSize) {
      setSizes(sizesByType);
    } else {
      setSizes([...sizesByType, size]);
    }
  }, [sizesByType, size]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event : DragEndEvent) => {
    const { active, over } = event;

    if(!active || !over) return

    const oldIndex = sizes.findIndex(size => size.id === active.id);
    const newIndex = sizes.findIndex(size => size.id === over.id);

    const newSizes = arrayMove(sizes, oldIndex, newIndex)
      .map((size, index) => ({ ...size, order: index+1 }));
    setSizes(newSizes);
  }

  return (
    <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
    >
        <StepHeader title="Order size" description="You can drag and drop for move the position of sizes."/>

        <SortableContext
            items={sizes}
            strategy={horizontalListSortingStrategy}
        >
            <div className="flex flex-wrap gap-3">
              {sizes.length && (
                <>
                  {sizes.map(size => (
                    <SizeOrder key={size.id} size={size} />
                  ))}
                </>
              )}
            </div>
        </SortableContext>
    </DndContext>
  )
}
