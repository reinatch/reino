"use client"

import React from 'react';
import type { Project, About } from './types';
import Media from './Media';

export default function ProjectGallery({
  data,
  activeIndex,
  showIframe,
  setShowIframe,
}: {
  data: Project[];
  activeIndex: number | null;
  showIframe: boolean;
  setShowIframe: (v: boolean) => void;
}) {
  if (activeIndex === null) return null;

  const project = data[activeIndex];

  return (
    <article className="max-w-6xl ">
      <div className="mb-6">
        {project.preview ? (
          Array.isArray(project.preview) ? (
            <div className="rounded-lg overflow-hidden card-bg space-y-2 p-2">
              {(project.preview as string[]).map((src: string, idx: number) => (
                <div key={idx} className="w-full">
                  <Media src={src} alt={`${project.titulo} preview ${idx + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden card-bg">
              <Media src={(project.preview as string) || `/previews/${project.titulo.replace(/\s+/g, '_')}.jpg`} alt={`${project.titulo} preview`} className="w-full h-auto object-contain" />
            </div>
          )
        ) : (
          <div className="rounded-lg overflow-hidden card-bg w-full h-auto" />
        )}
      </div>

      <div className="mt-8 font-Authentic_n text-lg text-main block md:hidden">
        <p>{project.content}</p>
        <div className="mt-4 flex gap-4">
          <button onClick={() => setShowIframe(true)} className="inline-block px-6 py-2 border rounded-full font-Authentic_n border-accent text-accent">Open site</button>
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 border rounded-full border-accent text-accent">Open in new tab</a>
        </div>
        {showIframe && (
          <div className="mt-6 rounded-lg overflow-hidden">
            <iframe className="w-full min-h-[40vh] h-auto" src={project.link} title={project.titulo}></iframe>
          </div>
        )}
      </div>
    </article>
  );
}
