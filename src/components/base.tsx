"use client"


import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Simple Media component: renders video elements for video files and Next Image for images/GIFs.
const Media: React.FC<{ src: string; alt?: string; className?: string }> = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      // fallback to placeholder
      // keep the inline rule disable only for this plain img fallback
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/reino/placeholders/placeholder.png" alt="placeholder" className={className} />
    );
  }

  const lower = src.split('?')[0].toLowerCase();
  const isVideo = lower.endsWith('.mp4') || lower.endsWith('.webm');
  const isGif = lower.endsWith('.gif');

  if (isVideo) {
    return (
      <video className={className} controls playsInline onError={() => setHasError(true)}>
        <source src={src} />
        Your browser does not support the video tag.
      </video>
    );
  }

  // For images/gifs, use Next/Image for optimization. Next/Image doesn't support external domains
  // unless configured in next.config; we'll use it and allow remote images via loader if needed.
  // For GIFs we use Image with unoptimized to preserve animation.
  // Next/Image onError receives an event — type it properly to avoid any
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement | HTMLDivElement>) => {
    // mark error and allow fallback to placeholder
    setHasError(true);
  };

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={1600}
      height={900}
      className={className}
      unoptimized={isGif}
      onError={handleImageError}
    />
  );
};

interface Project {
  titulo: string;
  link: string;
  year: string;
  category: string;
  frontend: string;
  backend: string;
  content: string;
  preview?: string | string[];
  designer: string;
}
interface About {
  titulo: string;
  email: string;
  skills: string;
  content: string;
  contact: string;
}

import { data as rawData, about as rawAbout } from '../data/projects';
// Use local TypeScript interfaces to type the imported data so the interfaces are used
const data: Project[] = rawData as Project[];
const about: About[] = rawAbout as About[];

const ProjectList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | 'about' | null>(0);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    // reset iframe visibility when switching projects/tabs
    setShowIframe(false);
  }, [activeIndex]);
  // Note: palette/ swatch logic removed to keep colors static (white backgrounds + CSS vars)

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left navigation aside */}
  <aside className="md:w-1/4 w-full p-8 aside-left-bg md:h-full text-aside ">
        {/* Title / Logo */}
        <div className="mb-6">
          <div className="text-[3em] font-Proto reinatch-logo ">reinatch</div>
        </div>
        
        <div className="flex flex-col justify-between h-full">


        <nav className="space-y-2">
          {data.map((p, i) => (
            <button
              key={p.titulo}
              onClick={() => setActiveIndex(i)}
              className={`block w-full text-left uppercase text-xl tracking-wider ${i === activeIndex ? 'font-Frame text-nav-active' : 'font-Authentic_l text-nav-inactive'}`}
            >
              {p.titulo}
            </button>
          ))}
          {/* About tab */}
          <button
            onClick={() => setActiveIndex('about')}
            className={`block w-full text-left uppercase text-xl tracking-wider ${activeIndex === 'about' ? 'font-Authentic_b text-nav-active' : 'font-Authentic_n text-nav-inactive'}`}
          >
            about
          </button>
        </nav>
        <aside className="md:w-full w-full py-8 aside-right-bg hidden md:block text-aside">
              {typeof activeIndex === 'number' ? (
                <div className="sticky top-8 space-y-4">
                  <div className="font-Authentic_n text-xl font-Acte  hidden md:block">
                    <p>{data[activeIndex].content}</p>
                  </div>
                  <div className="uppercase text-xs text-muted">designed by</div>
                  <div className="text-xl uppercase font-Authentic_b mt-2">{data[activeIndex].designer}</div>
                  <div className="mt-4 text-xs uppercase font-Terminal">{data[activeIndex].frontend}</div>
                  <div className="text-xs uppercase font-Terminal">{data[activeIndex].backend}</div>
                  <div className="text-xs mt-4 font-Sligoil">{data[activeIndex].category}</div>
                  <div className="text-2xl mt-6 uppercase font-Authentic_b">{data[activeIndex].year}</div>
                  <a href={data[activeIndex].link} target="_blank" rel="noreferrer" className="inline-block mt-6 px-6 py-2 border rounded-full font-Authentic_n">Visit website</a>
                </div>
              ) : activeIndex === 'about' ? (
                <div className="sticky top-8 space-y-4">
                  {about.map((a) => (
                    <div key={a.titulo}>
                      {/* <div className="uppercase text-xs text-muted">{a.titulo}</div> */}
                      <div className="text-xl mt-2 font-Authentic_b">Contact</div>
                      <div className="mt-2 text-sm font-Authentic_n">{a.contact} <a className="underline" href={`mailto:${a.email}`}>{a.email}</a></div>
                      <div className="mt-4 text-sm uppercase font-Terminal">{a.skills}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </aside>
        </div>
        {/* no palette UI (colors are static via CSS variables) */}
      </aside>
      

      {/* Main center content */}
  <main className="flex-1 p-8 overflow-auto bg-main no-scrollbar">
        {typeof activeIndex === 'number' && (
          <article className="max-w-6xl ">
            <div className="mb-6">
              {/* <div className="text-3xl font-Terminal mb-4">{data[activeIndex].titulo}</div> */}
              {/* Preview image or gif (if provided) */}
              {data[activeIndex].preview ? (
                Array.isArray(data[activeIndex].preview) ? (
                  <div className="rounded-lg overflow-hidden card-bg space-y-2 p-2">
                    {(data[activeIndex].preview as string[]).map((src: string, idx: number) => (
                      <div key={idx} className="w-full">
                        <Media src={src} alt={`${data[activeIndex].titulo} preview ${idx + 1}`} className="w-full h-auto" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden card-bg">
                    <Media src={(data[activeIndex].preview as string) || `/previews/${data[activeIndex].titulo.replace(/\s+/g, '_')}.jpg`} alt={`${data[activeIndex].titulo} preview`} className="w-full h-auto object-contain" />
                  </div>
                )
              ) : (
                <div className="rounded-lg overflow-hidden card-bg w-full h-auto" />
              )}
            </div>
            {/* description for small screens (visible on mobile) */}
            <div className="mt-8 font-Authentic_n text-lg text-main block md:hidden">
              <p>{data[activeIndex].content}</p>
              <div className="mt-4 flex gap-4">
                <button onClick={()=>setShowIframe(true)} className="inline-block px-6 py-2 border rounded-full font-Authentic_n border-accent text-accent">Open site</button>
                <a href={data[activeIndex].link} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 border rounded-full border-accent text-accent">Open in new tab</a>
              </div>
              {showIframe && (
                <div className="mt-6 rounded-lg overflow-hidden">
                  <iframe className="w-full min-h-[40vh] h-auto" src={data[activeIndex].link} title={data[activeIndex].titulo}></iframe>
                </div>
              )}
            </div>
          </article>
        )}

        {/* About panel in main (mobile-first) */}
        {activeIndex === 'about' && (
          <article className="max-w-4xl mx-auto">
            <div className="mb-6">
              {/* <h2 className="text-3xl font-Terminal mb-4">About</h2> */}
              <div className="font-Authentic_n text-lg text-main">
                {about.map((a) => (
                  <div key={a.titulo}>
                    <p className="mb-4">{a.content}</p>
                    <p className="mb-2">Skills: {a.skills}</p>
                    <p className="mb-2">{a.contact} <a className="underline" href={`mailto:${a.email}`}>{a.email}</a></p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}
      </main>

      {/* Right info aside */}

    </div>
  );
};

export default ProjectList;
