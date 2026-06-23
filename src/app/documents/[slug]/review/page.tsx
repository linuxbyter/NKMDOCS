import { notFound } from "next/navigation";
import { getDocumentBySlug } from "@/data/documents";
import type { Metadata } from "next";
import GuidedQA from "@/components/GuidedQA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) return {};
  return {
    title: `Customize ${doc.name} | NKM Documents`,
    description: `Answer guided questions to customize your ${doc.name}. Takes about ${doc.estimatedTime}.`,
  };
}

export default async function ReviewRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) notFound();

  return <GuidedQA slug={slug} />;
}
