"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import { EMAIL } from "@/lib/site-copy";
import { InstaxPhoto } from "./instax-photo";
import { TextLink } from "./text-link";

const PHOTOS = {
  hey: {
    src: "/images/about/polaroid-hey.png",
    alt: "Lavi taking a mirror selfie",
    caption: "Hey!",
  },
  seoul: {
    src: "/images/about/polaroid-seoul.png",
    alt: "Lavi holding a tray of pastries at a café in Seoul",
    caption: "In Seoul for my best friend’s wedding and for all of the café’s Seoul could offer",
    captionWidth: 158,
  },
} as const;

/** Figma `625:16670` / `625:16680` outer bounds inside `625:16667` (1280×613). */
const DESKTOP_INSTAX = {
  hey: {
    left: -6,
    top: 58.78662109375,
    width: 420.14821219444275,
    height: 510.65787863731384,
    inset: 50,
    rotate: -15,
  },
  seoul: {
    left: 997.916015625,
    top: 123,
    width: 420.14821219444275,
    height: 510.65787863731384,
    inset: 50,
    rotate: 15,
  },
} as const;

const COPY_TRANSITION = {
  duration: 0.65,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const PHOTO_TRANSITION = {
  type: "spring" as const,
  stiffness: 90,
  damping: 22,
  mass: 0.9,
};

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[#002fa7]">{children}</span>;
}

function DesktopInstax({
  photo,
  layout,
  delay = 0,
}: {
  photo: (typeof PHOTOS)[keyof typeof PHOTOS];
  layout: (typeof DESKTOP_INSTAX)[keyof typeof DESKTOP_INSTAX];
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute hidden xl:block"
      style={{
        left: `${layout.left}px`,
        top: `${layout.top}px`,
        width: `${layout.width}px`,
        height: `${layout.height}px`,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...PHOTO_TRANSITION, delay }}
    >
      <div
        className="absolute"
        style={{ left: `${layout.inset}px`, top: `${layout.inset}px` }}
      >
        <InstaxPhoto {...photo} rotate={layout.rotate} />
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="flex min-h-[100svh] w-full scroll-mt-0 items-center justify-center"
    >
      {/* Figma `625:17130` — 1280×613 canvas, copy at x=397.5 (485px centred). */}
      <div className="relative mx-auto w-full max-w-[1280px] px-4 xl:min-h-[613px] xl:px-0">
        <motion.div
          className="relative z-[1] mx-auto flex w-full max-w-[485px] flex-col items-center gap-[14px] text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={COPY_TRANSITION}
        >
          <div className="my-6 flex w-full justify-center xl:hidden">
            <InstaxPhoto {...PHOTOS.hey} rotate={DESKTOP_INSTAX.hey.rotate} />
          </div>

          <h2 className="m-0 w-full font-serif-display text-[20px] text-[#1e1e1e]">
            About
          </h2>

          <div className="w-full font-[family-name:var(--font-geist-sans)] text-[16px] font-normal leading-6 text-[#1e1e1e]">
            <p className="mb-6 text-pretty">
              Hi! My name is Lavi. It’s lovely to meet you!
            </p>
            <p className="mb-6 text-pretty">
              I am based in New York City and have been for the last eight years. In many ways, New
              York has taught me the most important lessons of my adulthood.
            </p>
            <p className="mb-6 text-pretty">
              In tandem with being a full-time designer, I am passively studying to become a{" "}
              <Accent>sommelier</Accent> (for those who know the exam types, I am studying for the
              CMS). Wine, for me, is a bridge to the thing I love most: people.
            </p>
            <p className="mb-6 text-pretty">
              To that point, my career choices and hobbies share my love for <Accent>people</Accent>
              . I jump at the chance at using my education, skills, and curiosity to make someone’s
              day just 1% better.
            </p>
            <p className="mb-6 text-pretty">
              On any given day, you’re likely to find me at a museum or a gallery. If I’m not there,
              I’m probably at my favourite coffee and dessert spot in New York,{" "}
              <Accent>Lysée</Accent>. And if I’m not there, then please email me and we can discuss
              why you’re trying to find me.
            </p>
            <p className="text-pretty">
              I am currently open for design work, both client-based or full-time. You can DM me on{" "}
              <Accent>Twitter</Accent> or (preferably){" "}
              <TextLink href={EMAIL}>email me</TextLink>. If you’re curious for my answer on
              willingness to relocate, <Accent>click here</Accent>.
            </p>
          </div>

          <div className="mb-6 mt-10 flex w-full justify-center xl:hidden">
            <InstaxPhoto {...PHOTOS.seoul} rotate={DESKTOP_INSTAX.seoul.rotate} />
          </div>
        </motion.div>

        <DesktopInstax photo={PHOTOS.hey} layout={DESKTOP_INSTAX.hey} delay={0.08} />
        <DesktopInstax photo={PHOTOS.seoul} layout={DESKTOP_INSTAX.seoul} delay={0.16} />
      </div>
    </section>
  );
}
