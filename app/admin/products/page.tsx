"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db, Product } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Plus, Search, Edit3, Trash2, CheckCircle2, AlertTriangle, X } from "lucide-react";

export default function AdminProductsPage() {
  const { showNotification } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [brand, setBrand] = useState<Product["brand"]>("MuscleBlaze");
  const [category, setCategory] = useState<Product["category"]>("Protein");
  const [price, setPrice] = useState(2999);
  const [mrp, setMrp] = useState(3499);
  const [stock, setStock] = useState(30);
  const [description, setDescription] = useState("");
  const [protein, setProtein] = useState("25g");
  const [calories, setCalories] = useState("120 kcal");
  const [carbs, setCarbs] = useState("3g");
  const [fat, setFat] = useState("1.5g");

  const loadProducts = () => {
    setProducts(db.getProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setBrand("MuscleBlaze");
    setCategory("Protein");
    setPrice(2999);
    setMrp(3499);
    setStock(30);
    setDescription("High quality nutrition supplement.");
    setProtein("25g");
    setCalories("120 kcal");
    setCarbs("3g");
    setFat("1.5g");
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setBrand(prod.brand);
    setCategory(prod.category);
    setPrice(prod.price);
    setMrp(prod.mrp);
    setStock(prod.stock);
    setDescription(prod.description);
    setProtein(prod.nutrition.protein);
    setCalories(prod.nutrition.calories);
    setCarbs(prod.nutrition.carbs);
    setFat(prod.nutrition.fat);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const discount = Math.round(((mrp - price) / mrp) * 100);

    const savedProd: Product = {
      id: editingProduct ? editingProduct.id : "prod-" + Date.now(),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      brand,
      category,
      price,
      mrp,
      discount: Math.max(0, discount),
      rating: editingProduct ? editingProduct.rating : 4.8,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      stock,
      lowStockThreshold: 8,
      isBestSeller: editingProduct ? editingProduct.isBestSeller : false,
      isFeatured: editingProduct ? editingProduct.isFeatured : false,
      images: editingProduct ? editingProduct.images : ["/products/muscleblaze_01_MuscleBlaze_Biozyme_Perfo.jpg"],
      description,
      nutrition: { protein, calories, carbs, fat, servingSize: "1 Scoop" },
      ingredients: "Natural High Grade Ingredients",
      howToUse: "Mix 1 serving in water or milk.",
      flavours: ["Chocolate", "Vanilla"],
      sizes: ["1 KG"],
      variants: [{ id: "v-1", name: "1 KG", price, mrp, stock }],
      status: "Active",
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    db.saveProduct(savedProd);
    loadProducts();
    setIsModalOpen(false);
    showNotification(`Product ${savedProd.name} saved!`);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (confirm(`Are you sure you want to delete ${prodName}?`)) {
      db.deleteProduct(id);
      loadProducts();
      showNotification(`Deleted product: ${prodName}`);
    }
  };

  const filteredProducts = products.filter(p => {
    if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
    if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">PRODUCT MANAGEMENT</h1>
          <p className="text-xs text-slate-400 font-medium">Add, edit, or remove products from the unified store catalog.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search catalog by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Filter Brand:</span>
          {["All", "MuscleBlaze", "Pintola", "Alpino"].map(b => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedBrand === b ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price / MRP</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-800/50">
                  <td className="p-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg relative overflow-hidden border border-slate-700">
                      <Image src={prod.images[0]} alt={prod.name} fill className="object-contain p-1" />
                    </div>
                  </td>
                  <td className="p-4 font-bold text-white max-w-xs truncate">{prod.name}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                      {prod.brand}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{prod.category}</td>
                  <td className="p-4">
                    <div className="font-bold text-white">₹{prod.price}</div>
                    <div className="text-[10px] text-slate-500 line-through">₹{prod.mrp}</div>
                  </td>
                  <td className="p-4 font-bold">
                    {prod.stock <= prod.lowStockThreshold ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> {prod.stock} (Low)
                      </span>
                    ) : (
                      <span className="text-emerald-400">{prod.stock} Units</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {prod.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id, prod.name)}
                      className="p-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-black text-white">
                {editingProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase block text-slate-300 mb-1">Product Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase block text-slate-300 mb-1">Brand</label>
                  <select
                    value={brand}
                    onChange={e => setBrand(e.target.value as Product["brand"])}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  >
                    <option value="MuscleBlaze">MuscleBlaze</option>
                    <option value="Pintola">Pintola</option>
                    <option value="Alpino">Alpino</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase block text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as Product["category"])}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  >
                    <option value="Protein">Protein</option>
                    <option value="Creatine">Creatine</option>
                    <option value="Oats">Oats</option>
                    <option value="Muesli">Muesli</option>
                    <option value="Peanut Butter">Peanut Butter</option>
                    <option value="Vitamins & Wellness">Vitamins & Wellness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase block text-slate-300 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase block text-slate-300 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={mrp}
                    onChange={e => setMrp(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase block text-slate-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={e => setStock(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs"
                >
                  SAVE PRODUCT TO CATALOG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
