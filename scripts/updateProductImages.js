// One-off script to point product image_url fields at picsum.photos
// Run with: node scripts/updateProductImages.js

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const contents = fs.readFileSync(envPath, "utf8");
  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=");
    if (key && value && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error(
      "Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
    process.exit(1);
  }

  const client = createClient(url, key);

  const { data, error } = await client.from("products").select("id").limit(200);

  if (error) {
    console.error("Error fetching products:", error);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log("No products found to update.");
    return;
  }

  const updates = data.map((row) => ({
    id: row.id,
    image_url: `https://picsum.photos/seed/product-${row.id}/800/600`,
  }));

  const { error: updateError } = await client.from("products").upsert(updates);

  if (updateError) {
    console.error("Error updating image_url values:", updateError);
    process.exit(1);
  }

  console.log(`Updated image_url for ${updates.length} products.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

