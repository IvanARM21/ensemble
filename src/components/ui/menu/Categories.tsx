import { Category } from "@/interfaces";
import { CategoryItem } from "./CategoryItem";

interface Props {
    title: string;
    types: Category[];
}

export const Categories = ({title, types} : Props) => {

  return (
    <div className="flex flex-col gap-3 sm:gap-5">
        <h2 className="text-zinc-800 font-medium">{title}</h2>
        {types.map(type => (
            <CategoryItem key={type.id} type={type} />
        ))}
    </div>
  )
}
