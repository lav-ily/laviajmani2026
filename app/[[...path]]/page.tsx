import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeView } from "@/components/home-view";
import { pageTitle, routeFromSegments, SITE_PATH_SEGMENTS } from "@/lib/site-routes";

type PageProps = { params: Promise<{ path?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_PATH_SEGMENTS.map((segments) => ({ path: [...segments] }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const route = routeFromSegments((await params).path ?? []);
  if (!route) return {};
  const title = pageTitle(route);
  return { title, openGraph: { title } };
}

export default async function Page({ params }: PageProps) {
  if (!routeFromSegments((await params).path ?? [])) notFound();
  return <HomeView />;
}
