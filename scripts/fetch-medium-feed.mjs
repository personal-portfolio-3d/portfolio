import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, "../src/data/medium-posts.json");

const FEED_URL = "https://medium.com/feed/@ashish50514561";

function estimateReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function formatDate(pubDateStr) {
  try {
    const d = new Date(pubDateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  } catch {
    return pubDateStr;
  }
}

async function updateMediumFeed() {
  console.log(`[Medium Sync] Attempting to fetch feed from: ${FEED_URL}`);
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.warn(`[Medium Sync] Response not OK (${res.status}). Using existing fallback data.`);
      return;
    }

    const xml = await res.text();
    const items = xml.split("<item>").slice(1);
    if (items.length === 0) {
      console.warn("[Medium Sync] No items found in feed. Using existing fallback data.");
      return;
    }

    console.log(`[Medium Sync] Found ${items.length} items in feed.`);

    const accents = ["pink", "blue", "violet", "cyan"];

    const fetchedPosts = items.map((item, idx) => {
      const getTag = (tag) => {
        const regex = new RegExp("<" + tag + "[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/" + tag + ">");
        const m = item.match(regex);
        return m ? m[1].trim() : "";
      };

      const title = getTag("title");
      const link = getTag("link").split("?")[0]; // clean tracking query params
      const pubDate = getTag("pubDate");
      const content = getTag("content:encoded") || getTag("description");

      const cats = [];
      const catRegex = /<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g;
      let match;
      while ((match = catRegex.exec(item)) !== null) {
        cats.push(match[1].trim());
      }

      // Clean HTML from description
      const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const description = plainText.slice(0, 160) + "...";

      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
      const image = imgMatch ? imgMatch[1] : "/assets/articles/duckdb-gemma-webgpu.png";

      // Map categories
      const mappedCats = ["Engineering"];
      const lowerText = (title + " " + cats.join(" ")).toLowerCase();
      if (lowerText.includes("ai") || lowerText.includes("gemma") || lowerText.includes("learning")) {
        mappedCats.push("AI / ML");
      }
      if (lowerText.includes("open-source") || lowerText.includes("github") || lowerText.includes("wasm")) {
        mappedCats.push("Open Source");
      }
      mappedCats.push("Tech Insights");

      // Format tags
      const tags = cats.slice(0, 4).map((c) => `#${c.replace(/[^a-zA-Z0-9]/g, "")}`);
      if (tags.length === 0) {
        tags.push("#Tech", "#Engineering");
      }

      return {
        id: `medium-feed-${idx}`,
        title,
        url: link,
        publishedAt: formatDate(pubDate),
        readTime: estimateReadTime(plainText),
        description,
        tags,
        categories: Array.from(new Set(mappedCats)),
        image,
        accentColor: accents[idx % accents.length],
      };
    });

    // Merge with existing fallback posts if fetched posts are fewer than 4 to preserve rich 4-card layout
    let existingData = [];
    if (fs.existsSync(jsonPath)) {
      try {
        existingData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      } catch (e) {
        existingData = [];
      }
    }

    // Merge strategy: update matching posts by title/URL, keep all other existing posts
    const finalPosts = [...existingData];
    fetchedPosts.forEach((fetched) => {
      const idx = finalPosts.findIndex(
        (p) => p.url.split("?")[0] === fetched.url.split("?")[0] || p.title === fetched.title
      );
      if (idx !== -1) {
        // Keep custom high-res local image if already present
        const localImg = finalPosts[idx].image?.startsWith("/assets") ? finalPosts[idx].image : fetched.image;
        finalPosts[idx] = { ...finalPosts[idx], ...fetched, image: localImg };
      } else {
        finalPosts.unshift(fetched);
      }
    });

    fs.writeFileSync(jsonPath, JSON.stringify(finalPosts, null, 2), "utf8");
    console.log(`[Medium Sync] Successfully updated ${jsonPath} with ${finalPosts.length} articles.`);
  } catch (err) {
    console.warn(`[Medium Sync] Feed fetch failed (${err.message}). Safe fallback preserved.`);
  }
}

updateMediumFeed();
