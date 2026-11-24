import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { HomeView } from "@/components/home-view";
import { SITE_TAGLINE } from "@/lib/hero-content";
import { getLatestTumblrPosts } from "@/lib/research/tumblr-posts";
import { pageTitle, routeFromSegments, SITE_PATH_SEGMENTS } from "@/lib/site-routes";

type PageProps = { params: Promise<{ path?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_PATH_SEGMENTS.map((segments) => ({ path: [...segments] }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const route = routeFromSegments((await params).path ?? []);
  if (!route) return {};
  const title = pageTitle(route);
  const images = (await parent).openGraph?.images;
  return { title, openGraph: { title, description: SITE_TAGLINE, type: "website", images } };
}

export default async function Page({ params }: PageProps) {
  if (!routeFromSegments((await params).path ?? [])) notFound();
  // Every route needs these: Research opens in place from any page without a server round trip.
  return <HomeView researchPosts={await getLatestTumblrPosts()} />;
}
