import type { Metadata } from "next";
import PlaybookClient from "@/components/playbook/PlaybookClient";
import { chapters } from "@/lib/playbook";

export const metadata: Metadata = {
  title: "The Playbook — Founder/OS",
  description:
    "Twelve chapters from ideation to term sheets: validation protocols, equity math, MVP discipline, pitch anatomy, SAFE mechanics and growth metrics.",
};

export default function PlaybookPage() {
  return <PlaybookClient chapters={chapters} />;
}
