import Header from "@/components/Header";
import ConfirmationContent from "@/components/ConfirmationContent";

export const metadata = {
  title: "Order Confirmed — Splurgie",
  description: "Your Splurgie order has been placed",
};

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <ConfirmationContent />
      </main>
    </>
  );
}
