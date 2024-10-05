import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
    message: string;
    error?: boolean;
}

export const Alert = ({message, error = true} : Props) => {
  return (
    <>
        {error ? (
            <div className="text-red-600 text-sm flex gap-1 items-center">
                <ExclamationCircleIcon />
                {message}
            </div>
        ) : (
            <div className="text-blue-600 text-sm flex gap-1 items-center">
                <CheckCircleIcon />
                {message}
            </div>
        )}
    </>
  )
}
