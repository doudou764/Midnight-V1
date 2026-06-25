import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient("SUPABASE_URL", "SUPABASE_ANON_KEY");

const messagesDiv = document.getElementById("messages");

async function load() {
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("id", { ascending: true });

  messagesDiv.innerHTML = data.map(m =>
    `<div class="card"><b>${m.user}</b>: ${m.text}</div>`
  ).join("");
}

window.send = async function () {
  const input = document.getElementById("msg");

  await supabase.from("messages").insert([
    {
      user: "Player",
      text: input.value
    }
  ]);

  // XP SYSTEM
  await supabase.rpc("add_xp", { amount: 1 });

  input.value = "";
  load();
};

load();
