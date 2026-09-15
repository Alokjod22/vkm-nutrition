import Header from "@/components/storefront/Header";
import Hero from "@/components/storefront/Hero";
import CategorySection from "@/components/storefront/CategorySection";
import BrandShowcase from "@/components/storefront/BrandShowcase";
import TrustSection from "@/components/storefront/TrustSection";
import Footer from "@/components/storefront/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Hero />
      <CategorySection />
      <BrandShowcase />
      <TrustSection />
      <Footer />
    </div>
  );
}
