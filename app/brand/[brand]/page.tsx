import React from "react";
import { db } from "@/lib/db";
import BrandClient from "@/components/storefront/BrandClient";

export function generateStaticParams() {
  return [
    { brand: "muscleblaze" },
    { brand: "pintola" },
    { brand: "alpino" }
  ];
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const rawBrand = params.brand;
  let brandName = "MuscleBlaze";
  if (rawBrand.toLowerCase() === "pintola") brandName = "Pintola";
  if (rawBrand.toLowerCase() === "alpino") brandName = "Alpino";

  const products = db.getProducts().filter(p => p.brand.toLowerCase() === brandName.toLowerCase());

  return <BrandClient brandName={brandName} products={products} />;
}
