import Header from "@/components/Header";
import CartContent from "@/components/CartContent";

export const metadata = {
  title: "Cart — Splurgie",
  description: "Your Splurgie shopping cart",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="page-heading text-3xl sm:text-4xl">Your Cart</h1>
        <p className="mt-2 font-medium text-slate-500">
          Your haul of imaginary stuff. Looking good.
        </p>
        <div className="mt-8">
          <CartContent />
        </div>
      </main>
    </>
  );
}
