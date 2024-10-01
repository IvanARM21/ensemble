
interface Props {
    className?: string;
}

export const Spinner = ({className = ""} : Props) => {
    return (
        <div className={`sk-chase ${className}`}>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>

    );
};

