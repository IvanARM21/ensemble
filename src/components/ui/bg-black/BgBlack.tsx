
interface Props {
    condition: boolean;
    className?: string;
    callback: () => void;
}

export const BgBlack = ({condition, className = "", callback} : Props) => {
  return (
    <>
        {condition && (
            <div 
                className={`bg-black fixed bg-opacity-30 inset-0 z-30 backdrop-blur-sm fade-in cursor-pointer ${className}`}
                onMouseEnter={callback}
                onClick={callback}
            />
        )}
    </>
  )
}
