import Header from "@/components/storefront/Header";
import Hero from "@/components/storefront/Hero";
import CategorySection from "@/components/storefront/CategorySection";
import BestSellers from "@/components/storefront/BestSellers";
import BrandSection from "@/components/storefront/BrandSection";
import StackBuilder from "@/components/storefront/StackBuilder";
import Footer from "@/components/storefront/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Hero />
      <CategorySection />
      <BestSellers />
      <BrandSection />
      <StackBuilder />
      <Footer />
    </div>
  );
}
