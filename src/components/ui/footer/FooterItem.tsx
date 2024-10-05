import Link from 'next/link';
import React from 'react'

interface Props {
    title: string;
    links: { label: string; url: string; }[]
}

export const FooterItem = ({ title, links } : Props) => {
  return (
    <div className="flex flex-col gap-5">
        <h3 className="text-gray-900 font-medium text-lg mb-1">{title}</h3>
        {links.map(link => (
            <Link
                key={link.url}
                href={link.url}
                className="text-gray-500 hover:underline underline-offset-4"
            >{link.label}</Link>
        ))}
    </div>
  )
}
