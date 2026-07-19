import Header from "@/components/Header";
import DashboardContent from "@/components/DashboardContent";

export const metadata = {
  title: "Seller Dashboard — Splurgie",
  description: "Track your sales, revenue, and top products on Splurgie.",
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <DashboardContent />
      </main>
    </>
  );
}
