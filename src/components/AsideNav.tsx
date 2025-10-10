"use client"

import React from 'react';
import type { Project, About } from './types';

export default function AsideNav({
  data,
  about,
  activeIndex,
  setActiveIndex,
}: {
  data: Project[];
  about: About[];
  activeIndex: number | 'about' | null;
  setActiveIndex: (i: number | 'about' | null) => void;
}) {
  return (
    <aside className="md:w-1/4 w-full px-8 aside-left-bg md:h-[85vh] text-aside text-right border-b md:border-b-0 border-muted mt-8 relative">
      <div className="mb-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveIndex(null)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(null); }}
          className="text-[2em] font-Proto reinatch-logo cursor-pointer"
          aria-label="Show interactive visualization"
        >
          reinatch
        </div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <nav className=" text-right">
          {data.map((p, i) => (
            <button
              key={p.titulo}
              onClick={() => setActiveIndex(i)}
              className={`nav-btn block w-full text-right text-lg uppercase tracking-wider transition-all duration-10 ease-out hover:text-nav-active hover:font-bold ${i === activeIndex ? 'font-Proto text-nav-active' : 'font-Parasitype font-medium text-nav-inactive'}`}
            >
              {p.titulo}
            </button>
          ))}

          <button
            onClick={() => setActiveIndex('about')}
            className={`nav-btn block w-full text-right  uppercase tracking-wider transition-all duration-10 ease-out hover:text-nav-active hover:font-bold ${activeIndex === 'about' ? 'font-Proto text-nav-active' : 'font-Parasitype font-medium text-nav-inactive'}`}
          >
            about
          </button>
        </nav>

        <div className="md:w-full w-full py-8 aside-right-bg hidden md:block text-aside">
          {typeof activeIndex === 'number' ? (
            <div className="sticky top-8 space-y-4">
              <div className="font-Authentic_n text-base font-Acte  hidden md:block">
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
                  <div className="text-xl mt-2 font-Authentic_b">Contact</div>
                  <div className="mt-2 text-sm font-Authentic_n">{a.contact} <a className="underline" href={`mailto:${a.email}`}>{a.email}</a></div>
                  <div className="mt-4 text-sm uppercase font-Terminal">{a.skills}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
