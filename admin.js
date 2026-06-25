import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient("SUPABASE_URL", "SUPABASE_ANON_KEY");

window.viewUsers = async () => {
  const { data } = await supabase.from("users").select("*");
  document.getElementById("output").innerHTML =
    JSON.stringify(data, null, 2);
};

window.viewOrders = async () => {
  const { data } = await supabase.from("orders").select("*");
  document.getElementById("output").innerHTML =
    JSON.stringify(data, null, 2);
};

window.addProduct = async () => {
  await supabase.from("products").insert([
    { name: "New Item", price: 10 }
  ]);
  alert("Produit ajouté");
};
