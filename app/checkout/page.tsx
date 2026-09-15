"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import { useStore } from "@/lib/context";
import { db } from "@/lib/db";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ArrowRight,
  ChevronLeft,
  Lock
} from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    appliedCoupon,
    showNotification
  } = useStore();

  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields - default to empty strings, auto-load from localStorage if user previously saved address
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("nb_customer_address");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.street) setStreet(parsed.street);
        if (parsed.city) setCity(parsed.city);
        if (parsed.state) setState(parsed.state);
        if (parsed.pincode) setPincode(parsed.pincode);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Card" | "NetBanking" | "COD">("UPI");
  // Interactive Payment Field State
  const [upiId, setUpiId] = useState("");
  const [upiMode, setUpiMode] = useState<"vpa" | "qr">("vpa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 max-w-md mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 mt-2">Please add items to your cart before proceeding to checkout.</p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-6 py-3 bg-rose-600 text-white font-bold rounded-xl text-xs"
          >
            Explore Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !street || !city || !state || !pincode) {
      alert("Please fill in all shipping address fields.");
      return;
    }

    if (paymentMethod === "UPI" && upiMode === "vpa" && (!upiId || !upiId.includes("@"))) {
      alert("Please enter a valid UPI VPA ID (e.g. 9876543210@paytm or username@okicici).");
      return;
    }

    if (paymentMethod === "Card") {
      const cleanNum = cardNumber.replace(/\s/g, "");
      if (cleanNum.length < 16) {
        alert("Please enter a valid 16-digit Card Number.");
        return;
      }
      if (!cardExpiry || !cardCvv) {
        alert("Please enter Card Expiration date (MM/YY) and 3-digit CVV.");
        return;
      }
    }

    setIsSubmitting(true);

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      brand: item.product.brand,
      image: item.product.images[0],
      flavour: item.selectedFlavour,
      size: item.selectedSize,
      price: item.selectedPrice,
      quantity: item.quantity
    }));

    const newOrder = db.createOrder({
      orderNumber: "",
      customerName: name,
      email: email,
      phone: phone,
      address: { street, city, state, pincode },
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      totalAmount: cartTotal,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Order Confirmed",
      trackingNumber: "DELHIEXPRESS-" + Math.floor(100000 + Math.random() * 900000)
    });

    // Save customer order ID and address to localStorage so customer account page only shows their own orders
    try {
      const existingSaved: string[] = JSON.parse(localStorage.getItem("nb_customer_order_ids") || "[]");
      if (!existingSaved.includes(newOrder.id)) {
        existingSaved.unshift(newOrder.id);
        localStorage.setItem("nb_customer_order_ids", JSON.stringify(existingSaved));
      }
      localStorage.setItem("nb_customer_address", JSON.stringify({ name, street, city, state, pincode, phone }));
    } catch (err) {
      console.error("Failed to save order session to localStorage", err);
    }

    clearCart();
    showNotification("Order placed successfully! Redirecting...");

    setTimeout(() => {
      router.push(`/account?orderId=${newOrder.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step Bar Indicator */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-rose-600 font-extrabold" : ""}`}>
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Shipping Address</span>
            </div>
            <div className="h-0.5 flex-1 mx-4 bg-slate-200" />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-rose-600 font-extrabold" : ""}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-600"}`}>
                2
              </span>
              <span>Payment & Place Order</span>
            </div>
          </div>
        </div>

        {/* Checkout Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900">01. SHIPPING ADDRESS</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 uppercase block mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Verma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 uppercase block mb-1">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-800 uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-800 uppercase block mb-1">Street Address</label>
                    <input
                      type="text"
                      placeholder="House/Flat No., Building, Street Name"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 uppercase block mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. New Delhi"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 uppercase block mb-1">State</label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi"
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 uppercase block mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="6-digit pincode"
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-900">02. PAYMENT METHOD</h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Edit Address
                  </button>
                </div>

                {/* Payment Selection Options */}
                <div className="space-y-4">
                  {/* Option 1: UPI */}
                  <div className={`p-4 rounded-2xl border transition-all ${paymentMethod === "UPI" ? "border-rose-600 bg-rose-50/40 shadow-sm" : "border-slate-200 bg-white"}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "UPI"}
                        onChange={() => setPaymentMethod("UPI")}
                        className="w-4 h-4 text-rose-600"
                      />
                      <QrCode className="w-5 h-5 text-rose-600" />
                      <div>
                        <div className="font-bold text-xs">UPI Instant (GPay / PhonePe / Paytm / BHIM)</div>
                        <div className="text-[11px] text-slate-500">Fastest checkout with 0 transaction fees</div>
                      </div>
                    </label>

                    {paymentMethod === "UPI" && (
                      <div className="mt-4 pt-3 border-t border-rose-200/60 space-y-3">
                        <div className="flex items-center gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setUpiMode("vpa")}
                            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${upiMode === "vpa" ? "bg-rose-600 text-white" : "bg-white text-slate-700 border border-slate-200"}`}
                          >
                            Enter UPI VPA ID
                          </button>
                          <button
                            type="button"
                            onClick={() => setUpiMode("qr")}
                            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${upiMode === "qr" ? "bg-rose-600 text-white" : "bg-white text-slate-700 border border-slate-200"}`}
                          >
                            Scan QR Code
                          </button>
                        </div>

                        {upiMode === "vpa" ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-800 uppercase block">Virtual Payment Address (UPI ID)</label>
                            <input
                              type="text"
                              placeholder="e.g. 9876543210@paytm, user@okicici, user@ybl"
                              value={upiId}
                              onChange={e => setUpiId(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500"
                            />
                            <p className="text-[10px] text-slate-500">You will receive a payment request notification on your UPI App.</p>
                          </div>
                        ) : (
                          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                            <div className="w-32 h-32 bg-slate-100 rounded-xl mx-auto flex items-center justify-center border text-slate-400 font-bold text-xs">
                              [ QR CODE ]
                            </div>
                            <p className="text-xs font-bold text-slate-800">Scan using GPay, PhonePe, Paytm, or BHIM</p>
                            <p className="text-[10px] text-slate-500">Amount: ₹{cartTotal.toLocaleString("en-IN")}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Option 2: Credit / Debit Card */}
                  <div className={`p-4 rounded-2xl border transition-all ${paymentMethod === "Card" ? "border-rose-600 bg-rose-50/40 shadow-sm" : "border-slate-200 bg-white"}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "Card"}
                        onChange={() => setPaymentMethod("Card")}
                        className="w-4 h-4 text-rose-600"
                      />
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-bold text-xs">Credit & Debit Cards</div>
                        <div className="text-[11px] text-slate-500">Visa, Mastercard, RuPay, Amex</div>
                      </div>
                    </label>

                    {paymentMethod === "Card" && (
                      <div className="mt-4 pt-3 border-t border-rose-200/60 grid grid-cols-2 gap-3 text-xs">
                        <div className="col-span-2">
                          <label className="font-bold text-slate-800 uppercase block mb-1 text-[11px]">Card Number</label>
                          <input
                            type="text"
                            placeholder="4532 •••• •••• 8910"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            maxLength={19}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label className="font-bold text-slate-800 uppercase block mb-1 text-[11px]">Name on Card</label>
                          <input
                            type="text"
                            placeholder="Full Name as on Card"
                            value={cardName}
                            onChange={e => setCardName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-800 uppercase block mb-1 text-[11px]">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-800 uppercase block mb-1 text-[11px]">CVV / CVC</label>
                          <input
                            type="password"
                            placeholder="3 digits"
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value)}
                            maxLength={4}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 3: Net Banking */}
                  <div className={`p-4 rounded-2xl border transition-all ${paymentMethod === "NetBanking" ? "border-rose-600 bg-rose-50/40 shadow-sm" : "border-slate-200 bg-white"}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "NetBanking"}
                        onChange={() => setPaymentMethod("NetBanking")}
                        className="w-4 h-4 text-rose-600"
                      />
                      <Building2 className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-bold text-xs">Net Banking</div>
                        <div className="text-[11px] text-slate-500">All major Indian banks supported</div>
                      </div>
                    </label>

                    {paymentMethod === "NetBanking" && (
                      <div className="mt-4 pt-3 border-t border-rose-200/60 space-y-2">
                        <label className="text-[11px] font-bold text-slate-800 uppercase block">Select Your Bank</label>
                        <select
                          value={selectedBank}
                          onChange={e => setSelectedBank(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                          <option value="Punjab National Bank">Punjab National Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Option 4: Cash on Delivery */}
                  <div className={`p-4 rounded-2xl border transition-all ${paymentMethod === "COD" ? "border-rose-600 bg-rose-50/40 shadow-sm" : "border-slate-200 bg-white"}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="w-4 h-4 text-rose-600"
                      />
                      <Banknote className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="font-bold text-xs">Cash on Delivery (COD)</div>
                        <div className="text-[11px] text-slate-500">Pay cash upon product delivery at your doorstep</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? "PROCESSING..." : `CONFIRM & PLACE ORDER — ₹${cartTotal.toLocaleString("en-IN")}`}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
              ORDER SUMMARY ({cart.reduce((s, i) => s + i.quantity, 0)} ITEMS)
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl relative border overflow-hidden flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{item.product.name}</div>
                    <div className="text-[11px] text-slate-500">Qty: {item.quantity} × ₹{item.selectedPrice}</div>
                  </div>
                  <div className="text-xs font-black text-slate-900">
                    ₹{(item.selectedPrice * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t border-slate-100 pt-4 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">₹{cartSubtotal.toLocaleString("en-IN")}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Savings</span>
                  <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-emerald-600 uppercase">
                  {cartDeliveryFee === 0 ? "FREE" : `₹${cartDeliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Payable</span>
                <span className="text-base text-rose-600">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Genuine MuscleBlaze, Pintola & Alpino product seal guaranteed.</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
