interface Props {
    condition: boolean;
    icon: JSX.Element;
    text: string;
    color: string;
  }
  
  export const ShowStockItem = ({condition, icon, text, color} : Props) => {
    return (
        <>
            {condition && (
                <div className={`flex gap-1 items-center ${color}`}>
                    {icon}
                    <p>{text}</p>
                </div>
            )}
        </>
    )
  }