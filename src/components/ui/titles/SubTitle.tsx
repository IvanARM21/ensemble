
interface Props {
  children: React.ReactNode;
  otherStyles?: string;
}

export const SubTitle = ({children, otherStyles = "text-4xl sm:text-5xl pb-2 mx-auto mb-8 "}: Props) => {
  return (
    <h2
      className={`tracking-tight text-gray-700 text-center w-fit ${otherStyles}`}
    >{children}</h2>
  )
}
