
interface Props {
    children: React.ReactNode;
    className?: string;
  }
  
export const Title = ({children, className = ""} : Props) => {
  return (
    <h1
      className={`text-4xl font-semibold mb-8 text-gray-700 mx-auto text-center animate__animated animate__fadeInUp ${className}`}
    >{children}</h1>
  )
}
