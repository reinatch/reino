"use client"


import React, { useState, useEffect } from 'react';
import AsideNav from './AsideNav';
import HomeExample from './home';
import ProjectGallery from './ProjectGallery';

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
  // activeIndex === null -> show interactive list
  const [activeIndex, setActiveIndex] = useState<number | 'about' | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    // reset iframe visibility when switching projects/tabs
    setShowIframe(false);
  }, [activeIndex]);
  // Note: palette/ swatch logic removed to keep colors static (white backgrounds + CSS vars)

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left navigation aside (delegated to AsideNav) */}
      <AsideNav data={data} about={about} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      
  {/* Vertical divider (md and up) - positioned absolutely so it can be animated */}
  <div aria-hidden="true" className="hidden md:block top-0 my-10  w-[2px] bg-[var(--p2)] transform-gpu origin-center transition-transform duration-300" />


      {/* Main center content */}
  <main className="flex-1 p-8 overflow-auto bg-main no-scrollbar">
       
       
        {/* Interactive visualization (list) shown before any project is selected */}
        {activeIndex === null && (
          <div className="max-w-6xl mx-auto mb-6">
            <HomeExample projects={data} activeIndex={null} onSelect={(i) => setActiveIndex(i)} />
          </div>
        )}

        {typeof activeIndex === 'number' && (
          <ProjectGallery data={data} activeIndex={activeIndex as number} showIframe={showIframe} setShowIframe={setShowIframe} />
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
