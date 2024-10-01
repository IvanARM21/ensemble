import { MapPinIcon, ClockIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <section className="mt-10">
      <h1 className="text-gray-700 text-3xl font-medium border-b pb-8">Contact us</h1>

      <div className="grid lg:grid-cols-2 lg:place-content-center gap-10 mt-10">
      
        <div className="flex flex-col gap-5 justify-between">
          <p className="text-gray-500 px-2">If you wish to contact me, you can send a message through the form or to my email. Please note that important data such as the address, hours, and phone number are fictional and used for demonstration purposes only.</p>
          <div className="flex flex-col gap-10">
          <div className="flex gap-2 items-center border-b px-2 sm:px-4 pb-5 rounded-xl">
            <MapPinIcon className="size-10 text-white bg-blue-500 p-2 rounded-full" />
            <p className="text-gray-500 text-sm sm:text-base">
              <span className="text-gray-900 font-medium">Address:</span> Avenida Italia, Montevideo Uruguay
            </p>
          </div>
          <div className="flex gap-2 items-center border-b px-2 sm:px-4 pb-5 rounded-xl">
            <ClockIcon className="size-10 text-white bg-blue-500 p-2 rounded-full" />
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm sm:text-base">
                <span className="text-gray-900 font-medium">Lunes a Viernes:</span> - 8:00 a 12:00 | 15:00 a 19:00
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
              <span className="text-gray-900 font-medium">Sábados: </span> - 8:00 a 12:00
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b px-2 sm:px-4 pb-5 rounded-xl">
            <div className="size-10 text-white bg-blue-500 p-2 rounded-full">
              <PhoneIcon />
            </div>

            <p className="text-gray-500 text-sm sm:text-base">
              <span className="text-gray-900 font-medium">Phone: </span>
              +598 2400 1234
            </p>
          </div>
          <div className="flex gap-2 items-center border-b px-2 sm:px-4 pb-5 rounded-xl">
            <EnvelopeIcon className="size-10 text-white bg-blue-500 p-2 rounded-full" />
            <p className="text-gray-500 text-sm sm:text-base">
              <span className="text-gray-900 font-medium">Email: </span>
              ivanrms371@gmail.com
            </p>
          </div>
        </div>
          </div>
        <form
          className="flex flex-col gap-3 rounded-xl w-full mx-auto"
        >
          <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="first-name"
                  className="text-gray-900 font-medium"
                >First name</label>
                <input 
                  type="text"
                  id="first-name"
                  placeholder="Your first name"
                  className="rounded-xl py-3 px-4 bg-gray-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="last-name"
                  className="text-gray-900 font-medium"
                >Last name</label>
                <input 
                  type="text"
                  id="last-name"
                  placeholder="Your last name"
                  className="rounded-xl py-3 px-4 bg-gray-50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label 
                  htmlFor="email"
                  className="text-gray-900 font-medium"
              >Email</label>
              <input 
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="rounded-xl py-3 px-4 bg-gray-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="phone"
                className="text-gray-900 font-medium"
              >Phone</label>
              <input 
                type="text"
                id="phone"
                placeholder="Your phone"
                className="rounded-xl py-3 px-4 bg-gray-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="phone"
                className="text-gray-900 font-medium"
              >Message</label>
              <textarea 
                name="phone" 
                id="phone"  
                rows={3} 
                cols={10} 
                className="rounded-xl py-3 px-4 bg-gray-50 resize-none"
                placeholder="Your message"></textarea>
            </div>

            <input type="submit" className="btn-primary mt-5" value="Let's talk" />
        </form>
      </div>
    </section>
  );
}