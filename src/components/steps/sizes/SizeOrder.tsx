import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Size } from "@/interfaces"

interface Props {
    size: Size;
}

export const SizeOrder = ({size} : Props) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: size.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  }

  return (
    <div 
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="bg-white h-12 w-16 flex text-lg justify-center items-center border rounded-full text-gray-700 hover:border-gray-400 transition-colors duration-300 my-2">
        <p>{size.label}</p>
    </div>
  )
}
