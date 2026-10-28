const FEED_URL = "https://32paces.tumblr.com/rss";

/** Seconds before the next request re-fetches the feed, so new posts appear without a redeploy. */
const REVALIDATE_S = 300;

const POST_COUNT = 6;

export type TumblrPost = {
  src: string;
  href: string;
  alt: string;
};

function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function tagText(xml: string, tag: string): string | undefined {
  return xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim();
}

/** The `s1280x1920` rendition from the `srcset` when there is one; otherwise the `src`. */
function imageSrc(html: string): string | undefined {
  const img = html.match(/<img\b[^>]*>/)?.[0];
  if (!img) return undefined;
  const srcset = img.match(/srcset="([^"]+)"/)?.[1];
  const large = srcset
    ?.split(",")
    .map((entry) => entry.trim().split(/\s+/)[0])
    .find((url) => url.includes("/s1280x1920/"));
  return large ?? img.match(/src="([^"]+)"/)?.[1];
}

/** Latest image posts from the La Vie Tumblr; empty when the feed can't be read. */
export async function getLatestTumblrPosts(): Promise<TumblrPost[]> {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_S, tags: ["tumblr-research"] },
    });
    if (!response.ok) return [];
    const xml = await response.text();

    const posts: TumblrPost[] = [];
    for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const src = imageSrc(decodeEntities(tagText(item, "description") ?? ""));
      const href = tagText(item, "link");
      if (!src || !href) continue;
      const title = decodeEntities(tagText(item, "title") ?? "");
      posts.push({ src, href, alt: title || "Post from La Vie" });
      if (posts.length === POST_COUNT) break;
    }
    return posts;
  } catch {
    return [];
  }
}
