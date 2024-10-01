import Link from "next/link";

export default function EmptyCartPage() {
  return (
    <section className="m-auto text-center">
      <h1 className="text-5xl sm:text-7xl text-gray-500 mb-3">Your cart is empty!</h1>
      <Link
        href={"/shop"}
        className="text-2xl text-gray-700"
      >Start shopping</Link>
    </section>
  );
}