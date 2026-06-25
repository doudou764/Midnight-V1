import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient("SUPABASE_URL", "SUPABASE_ANON_KEY");

let cart = [];

async function loadProducts() {
  const { data } = await supabase.from("products").select("*");

  document.getElementById("products").innerHTML =
    data.map(p =>
      `<div class="card">
        <b>${p.name}</b> - ${p.price}€
        <button onclick='add(${JSON.stringify(p)})'>Ajouter</button>
      </div>`
    ).join("");
}

window.add = (p) => {
  cart.push(p);
  renderCart();
};

function renderCart() {
  document.getElementById("cart").innerHTML =
    cart.map(c => `<div>${c.name} - ${c.price}€</div>`).join("");
}

window.checkout = async function () {
  await supabase.from("orders").insert([
    {
      user: "Player",
      items: cart,
      total: cart.reduce((a,b)=>a+b.price,0)
    }
  ]);

  alert("Commande envoyée !");
  cart = [];
  renderCart();
};

loadProducts();
