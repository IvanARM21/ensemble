"use client";

import Image from "next/image"
import Link from 'next/link';
import { usePathname } from "next/navigation";


export const Hero = () => {

  const pathname = usePathname();

  return  (
    <>
      {pathname === "/" && (
        <section className="hero-bg">
            <Image 
                src="/collections-men-2.jpg"
                alt="Hero Image"
                className="hero-image object-center"
                width={1000}
                height={800}
                sizes="100vw"
                quality={80}
            />
            <div className="max-w-screen-2xl mx-auto w-full flex flex-col text-center sm:text-start items-center sm:items-start gap-4">
                <h1 className="text-5xl ml-2 md:text-7xl text-white font-bold tracking-tighter animate__animated animate__fadeInLeft">Welcome to Ensemble</h1>
                <p className="md:text-xl ml-2 text-gray-300  animate__fadeInUp animate__animated">A simple clothing store features a carefully selected range of everyday apparel, organized neatly with a friendly, welcoming atmosphere.</p>
                <Link
                    href={"/shop"}
                    className="btn-primary w-fit ml-2 animate__animated animate__fadeInUp"
                >Explore our collection</Link>
            </div>
        </section>
      )}
      {pathname.includes("/women") && (
         <section className="hero-bg-gender">
              <Image 
                alt="W"
                src="/category-women.jpg"
                width={1000}
                height={600}
                sizes="100vw"
                className="hero-image-gender object-top"
              />
              <div className="max-w-screen-2xl px-2 mx-auto w-full gap-4">
                <h1 className="text-5xl md:text-7xl text-center text-white font-semibold tracking-tighter animate__animated animate__fadeInUp">Women&rsquo;s</h1>
              </div>
        </section>
      )}
      {pathname.includes("/men") && (
         <section className="hero-bg-gender">
                <Image 
                  alt="W"
                  src="/collections-men.jpg"
                  width={1000}
                  height={600}
                  sizes="100vw"
                  className="hero-image-gender object-top"
                />
                <div className="max-w-screen-2xl px-2 mx-auto w-full gap-4">
                  <h1 className="text-5xl md:text-7xl text-center text-white font-semibold tracking-tighter animate__animated animate__fadeInUp">Men&rsquo;s</h1>
                </div>
          </section>
      )}
    </>
  )
}
