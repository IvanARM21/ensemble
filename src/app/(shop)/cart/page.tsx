
import Link from 'next/link';
import { CartGrid, SummaryOrder } from '@/components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CartPage() {

  return (
    <section className="mt-6 w-full max-w-screen-sm mx-auto lg:max-w-screen-2xl">
      <h1 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">
        Shopping cart
      </h1>

      <Link
        href="/collections"
        className="text-lg text-blue-600 flex items-center gap-1 text-center lg:text-left mt-10"
      >
        <span className="size-5"><ArrowLeftIcon /></span>
        Continue Shopping
      </Link>

      <div className="grid lg:grid-cols-5 mt-5 gap-10">
          <CartGrid />
          <div className="bg-gray-50 lg:col-span-2 rounded-xl p-4 sm:p-8 flex flex-col gap-5 sticky lg:h-[547px] top-24 w-full">
            <SummaryOrder />
          </div>
      </div>
    </section>
  );
}