import { auth } from "@/auth";
import { ToastContainer } from "react-toastify";
import { Footer, Header, Hero, SidebarCart, MenuMobile } from "@/components";
import { MenuContainer } from "../ui/menu/MenuContainer";

import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from "@/actions";

interface Props {
    children: React.ReactNode
}

export const MasterLayout = async ({children} : Props) => {

  const [session, categories] = await Promise.all([auth(), getCategories()]);

  return (
    <> 
      <ToastContainer 
          position="top-right"
          autoClose={1000}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
      />
      <SidebarCart />
      <MenuMobile session={session} />
      <div className="flex flex-col min-h-screen">
        <Header session={session}/>
        <MenuContainer categories={categories}/> 
        <Hero />
        <main className="flex-1 flex flex-col max-w-screen-2xl mx-auto w-full px-2 my-20 ap-12">
            {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
