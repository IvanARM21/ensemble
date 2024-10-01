
import { ExclamationCircle, CheckCircle } from '@/icons';

interface Props {
    message: string;
    error?: boolean;
}

export const Alert = ({message, error = true} : Props) => {
  return (
    <>
        {error ? (
            <div className="text-red-600 text-sm flex gap-1 items-center">
                <ExclamationCircle />
                {message}
            </div>
        ) : (
            <div className="text-blue-600 text-sm flex gap-1 items-center">
                <CheckCircle />
                {message}
            </div>
        )}
    </>
  )
}
