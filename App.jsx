import React, { useState } from "react";

const PRODUCTS = [
  {
    id: "powerbank",
    title_ar: "باور بانك 20000 مللي أمبير",
    title_en: "Power Bank 20000mAh",
    desc_ar: "شاحن متنقل عالي السعة مع شحن سريع.",
    desc_en: "High-capacity portable charger with fast charging.",
    price: 399,
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "earbuds",
    title_ar: "سماعات لاسلكية بتقليل الضوضاء",
    title_en: "Wireless Noise Cancelling Earbuds",
    desc_ar: "سماعات مدمجة مع إلغاء الضوضاء وعمر بطارية طويل.",
    desc_en: "Compact earbuds with noise cancelling and long battery life.",
    price: 699,
    img: "https://images.unsplash.com/photo-1580894908361-7f8a4b6f2a9f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "smartwatch",
    title_ar: "ساعة ذكية لمتابعة اللياقة",
    title_en: "Fitness Smartwatch",
    desc_ar: "ساعة ذكية مع تتبع النشاط والصحة.",
    desc_en: "Smartwatch with activity and health tracking.",
    price: 899,
    img: "https://images.unsplash.com/photo-1518444023176-9bd1f2a0a5b9?q=80&w=800&auto=format&fit=crop",
  },
];

export default function App() {
  const [lang, setLang] = useState("ar");
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function clearCart() {
    setCart([]);
  }

  function orderViaWhatsApp() {
    if (cart.length === 0) {
      alert(lang === "ar" ? "سلة التسوق فارغة" : "Cart is empty");
      return;
    }
    let msg = lang === "ar" ? "طلب من EgyGadgets:\n" : "Order from EgyGadgets:\n";
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${lang === "ar" ? item.title_ar : item.title_en} - ${item.price} EGP\n`;
    });
    msg +=
      lang === "ar"
        ? "\nطريقة الدفع: فودافون كاش أو إنستا باي\nرقم فودافون كاش: 01022043442\nرقم إنستا باي: 01068718276\nيرجى إرسال إيصال الدفع عبر الواتساب."
        : "\nPayment method: Vodafone Cash or InstaPay\nVodafone Cash number: 01022043442\nInstaPay number: 01068718276\nPlease send payment receipt via WhatsApp.";

    const phoneNumber = "+201022043442";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 800, margin: "auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1>EgyGadgets</h1>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </header>

      <main>
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <img
              src={p.img}
              alt={lang === "ar" ? p.title_ar : p.title_en}
              style={{ width: 120, borderRadius: 10 }}
            />
            <div>
              <h3>{lang === "ar" ? p.title_ar : p.title_en}</h3>
              <p>{lang === "ar" ? p.desc_ar : p.desc_en}</p>
              <p style={{ fontWeight: "bold" }}>{p.price} EGP</p>
              <button onClick={() => addToCart(p)}>
                {lang === "ar" ? "أضف للسلة" : "Add to cart"}
              </button>
            </div>
          </div>
        ))}

        <section style={{ marginTop: 30, borderTop: "1px solid #ccc", paddingTop: 20 }}>
          <h2>{lang === "ar" ? "سلة التسوق" : "Cart"}</h2>
          {cart.length === 0 ? (
            <p>{lang === "ar" ? "السلة فارغة" : "Your cart is empty"}</p>
          ) : (
            <ul>
              {cart.map((item, i) => (
                <li key={i}>
                  {lang === "ar" ? item.title_ar : item.title_en} - {item.price} EGP
                </li>
              ))}
            </ul>
          )}
          <button onClick={clearCart} style={{ marginRight: 10 }}>
            {lang === "ar" ? "تفريغ السلة" : "Clear Cart"}
          </button>
          <button onClick={orderViaWhatsApp}>{lang === "ar" ? "اطلب عبر واتساب" : "Order via WhatsApp"}</button>
        </section>
      </main>

      <footer style={{ marginTop: 50, fontSize: 12, color: "#888" }}>
        {lang === "ar"
          ? "© 2025 EgyGadgets - شحن داخل مصر - فودافون كاش: 01022043442 - إنستا باي: 01068718276"
          : "© 2025 EgyGadgets - Shipping inside Egypt - Vodafone Cash: 01022043442 - InstaPay: 01068718276"}
      </footer>
    </div>
  );
}
