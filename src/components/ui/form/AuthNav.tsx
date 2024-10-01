import Link from "next/link";
import { navAuthLinks } from "@/constants";

interface Props {
    page: string;
}

export const AuthNav = ({page} : Props) => {

  const { firstLink, secondLink } = navAuthLinks[page];

  return (
    <nav className="flex flex-col sm:flex-row gap-4 justify-between my-2 items-center">
        <Link
            href={firstLink.url}
            className="text-sm text-gray-500"
        >{firstLink.label}</Link>
        <Link
            href={secondLink.url}
            className="text-sm text-gray-500"
        >{secondLink.label}</Link>
    </nav>
  )
}
