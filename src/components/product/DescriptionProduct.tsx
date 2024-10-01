import { Product } from '@/interfaces'

interface Props {
    description: Product["description"];
}

export const DescriptionProduct = ({description} : Props) => {
  return (
    <>
        {description.length > 0 && (
            <div>
                <p className="text-gray-700 mb-2">Description</p>
                <p className="text-gray-500">{description}</p>
            </div>
        )}
    </>
  )
}
