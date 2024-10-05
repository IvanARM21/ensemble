
// import { Instagram, Facebook } from '@/icons'
import { FooterGrid } from './FooterGrid'

export const Footer = () => {

  return (
    <footer className="px-2 w-full mt-24 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto w-full">
            
            <FooterGrid />

            <div className="flex flex-col-reverse sm:flex-row gap-5 justify-between items-center py-10 border-t">
                <p className="text-gray-600 font-medium text-center">
                    <span className="block sm:inline">
                        &copy; {new Date().getFullYear()} Ensemble, all rights reserved.
                    </span> {" "}
                    <a href="https://ivan-rodriguez.vercel.app" target="_blank" className="block sm:inline">
                        Design by Iván Rodríguez
                    </a>
                </p>

                <div className="flex gap-6">
                    <a 
                        href="https://facebook.com"
                        target="_blank"
                        className="text-gray-600 font-medium text-sm"
                    >
                        {/* <Facebook className="size-8 cursor-pointer transition-all duration-300 text-gray-600 hover:scale-125"/> */}
                        Facebook
                    </a>
                    <a 
                        href="https://facebook.com"
                        target="_blank"
                        // aria-label="Link to Ensemble Instagram"
                        className="text-gray-600 font-medium text-sm"
                    >
                        {/* <Instagram  className="size-8 cursor-pointer transition-all duration-300 text-gray-600 hover:scale-125" /> */}
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}
