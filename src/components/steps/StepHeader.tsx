
interface Props {
    title: string;
    description: string;
}

export const StepHeader  = ({title, description} : Props) => {
  return (
    <div className="border-b pb-10 mb-10">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}
