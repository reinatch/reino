'use client';
import React, { Suspense, memo, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  AccumulativeShadows,
  CameraControls,
  Grid,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
} from '@react-three/drei';
import Wildlife from './Wildlife';
import { Fisheye } from '../Fisheye';
import { gsap } from 'gsap';

import {
  Lato,
  Six_Caps,
  Archivo_Black,
  Cinzel,
  Abril_Fatface,
  Playfair_Display_SC,
  Yeseva_One
} from 'next/font/google';

// import { TimelineLite } from "gsap";
// function Ground() {
//   const gridConfig = {
//     cellSize: 10,
//     cellThickness: 0.5,
//     cellColor: "#808080",
//     sectionSize: 100,
//     sectionThickness: 0.5,
//     sectionColor: "#909090",
//     fadeDistance: 1000,
//     fadeStrength: 0.5,
//     followCamera: true,
//     infiniteGrid: true,
//   };
//   return <Grid position={[0, 0, 0]} args={[10, 10]} {...gridConfig} />;
// }
import classes from '../styles/tabs.module.scss';
import { Tabs } from '@mantine/core';

const six = Six_Caps({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-six',
  weight: '400',
});

const abril = Yeseva_One({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-abril',
  weight: '400',
});
const archivo = Archivo_Black({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: '400',
});
const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: '400',
});
const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  weight: '400',
});

interface Project {
  titulo: string;
  link: string;
  year: string;
  category: string;
  frontend: string;
  backend: string;
  content: string;
  designer: string;
}

const data: Project[] = [
  {
    titulo: 'artworks',
    link: 'https://artworks.pt/',
    year: '2020',
    category: 'Category 1',
    frontend: 'React, TypeScript',
    backend: 'Node.js, Express',
    designer: 'Luisa Martelo',
    content:
      "Artworks is a project aimed at showcasing creative works of various artists. It utilizes React and TypeScript for the frontend, with Node.js and Express powering the backend. Luisa Martelo, a talented designer, was instrumental in shaping the project's visual aesthetics.",
  },
  {
    titulo: 'entulho',
    link: 'https://noentulho.pt/',
    year: '2020',
    category: 'Category 2',
    frontend: 'Vue.js, JavaScript',
    backend: 'Django, Python',
    designer: 'Luisa Martelo',
    content:
      "Entulho is an innovative platform designed to manage construction debris efficiently. It leverages Vue.js and JavaScript on the frontend, while Django and Python handle the backend operations. Luisa Martelo's design expertise brought a modern and user-friendly interface to the project.",
  },
  {
    titulo: 'noentulho',
    link: 'https://noentulho.com/',
    year: '2020',
    category: 'Category 1',
    frontend: 'Angular, JavaScript',
    backend: 'Ruby on Rails',
    designer: 'Luisa Martelo',
    content:
      "NoEntulho is a community-driven initiative to promote eco-friendly waste management practices. It utilizes Angular and JavaScript for the frontend, with Ruby on Rails powering the backend services. Luisa Martelo's design sensibilities ensured an intuitive user experience for the platform.",
  },
  {
    titulo: 'joana perez',
    link: 'https://joana-peres.com/',
    year: '2020',
    category: 'Category 1',
    frontend: 'Angular, JavaScript',
    backend: 'Ruby on Rail',
    designer: 'Luisa Marteo',
    content:
      "Joana Perez is a personal portfolio website showcasing the creative works of an aspiring artist. It's built using Angular and JavaScript for the frontend, with Ruby on Rails handling the backend functionalities. Luisa Martelo's design vision brought elegance and sophistication to the portfolio.",
  },
  {
    titulo: 'vera mota',
    link: 'https://veramota.com/',
    year: '2020',
    category: 'Category 3',
    frontend: 'HTML, CSS',
    backend: 'PHP, Laravel',
    designer: 'Luisa Martelo',
    content:
      "Vera Mota is a fashion e-commerce platform offering a curated collection of trendy clothing and accessories. It's crafted using HTML and CSS for the frontend, with PHP and Laravel powering the backend operations. Luisa Martelo's design flair infused the platform with style and elegance.",
  },
  {
    titulo: 'valentina',
    link: 'https://valentinapelayoatilano.com/projects',
    year: '2020',
    category: 'Category 2',
    frontend: 'React, JavaScript',
    backend: 'Firebase',
    designer: 'Luisa Martelo',
    content:
      "Valentina is a social networking application connecting people with similar interests and hobbies. It's developed using React and JavaScript for the frontend, with Firebase providing the backend services. Luisa Martelo's design prowess gave the app a vibrant and engaging look.",
  },
  {
    titulo: 'offworld',
    link: 'https://offworld.live/',
    year: '2020',
    category: 'Category 3',
    frontend: 'Vue.js, TypeScript',
    backend: 'Java, Spring Boot',
    designer: 'Luisa Martelo',
    content:
      "Offworld is a gaming platform offering an immersive virtual reality experience for gamers. It's built using Vue.js and TypeScript on the frontend, with Java and Spring Boot powering the backend infrastructure. Luisa Martelo's design ingenuity elevated the platform's visual appeal.",
  },
  {
    titulo: 'primeira idade',
    link: 'http://www.primeira-idade.pt/',
    year: '2020',
    category: 'Category 1',
    frontend: 'Angular, TypeScript',
    backend: 'Node.js, Express',
    designer: 'Luisa Martelo',
    content:
      "Primeira Idade is an educational platform designed to provide learning resources for children. It's developed using Angular and TypeScript for the frontend, with Node.js and Express handling the backend functionalities. Luisa Martelo's creative design approach made learning fun and interactive for kids.",
  },
  {
    titulo: 'luisa martelo',
    link: 'http://www.primeira-idade.pt/',
    year: '2020',
    category: 'Category 2',
    frontend: 'React, TypeScript',
    backend: 'Ruby on Rails',
    designer: 'Luisa Martelo',
    content:
      "Luisa Martelo is a personal portfolio website showcasing the diverse design projects undertaken by Luisa Martelo. It's built using React and TypeScript for the frontend, with Ruby on Rails powering the backend services. Luisa Martelo's design expertise shines through in every aspect of the portfolio.",
  },
];

console.log(data);

interface NavbarProps {
  onControlButtonClick: () => void;
  onIncreaseAnimals: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onControlButtonClick,
  onIncreaseAnimals,
}) => {
  const [isProjectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const toggleProjectsDropdown = () => {
    setProjectsDropdownOpen((prevState) => !prevState);
  };

  const closeProjectsDropdown = () => {
    setProjectsDropdownOpen(false);
  };

  const handleProjectClick = () => {
    // Add your logic for handling project click
    // For example, navigating to a project page
    console.log('Project clicked');
    closeProjectsDropdown();
  };

  return (
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2 transform bg-white p-4 shadow-md'>
      <div className='relative inline-block'>
        <button
          className='rounded bg-black px-4 py-2 font-bold text-white hover:bg-gray-700'
          onClick={toggleProjectsDropdown}
        >
          Projects
        </button>
        {isProjectsDropdownOpen && (
          <div className='absolute bottom-[2em] left-0 rounded border bg-white shadow-lg'>
            {/* Main projects menu */}
            <ul>
              <li>
                <button
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  onClick={handleProjectClick}
                >
                  Project 1
                </button>
              </li>
              <li>
                <button
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  onClick={handleProjectClick}
                >
                  Project 2
                </button>
              </li>
              {/* Add more projects as needed */}
            </ul>

            {/* Submenu */}
            <div className='px-4 py-2'>
              <p className='text-sm text-gray-500'>Submenu Item 1</p>
              <p className='text-sm text-gray-500'>Submenu Item 2</p>
              {/* Add more submenu items as needed */}
            </div>
          </div>
        )}
      </div>
      <button
        className='ml-2 rounded bg-red-900 px-4 py-2 font-bold text-white hover:bg-red-700'
        onClick={onControlButtonClick}
      >
        about
      </button>
      <button
        className='ml-2 rounded bg-green-900 px-4 py-2 font-bold text-white hover:bg-green-700'
        onClick={onIncreaseAnimals}
      >
        Add
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const [animalsQuantity, setAnimalsQuantity] = React.useState(1);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      //if (e.key === 'c') showAllys();
    };

    document.addEventListener('keydown', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);
  const handleControlButtonClick = () => {
    // Implement the logic to control the instance
    console.log('Control button clicked');
  };
  const handleIncreaseAnimals = () => {
    setAnimalsQuantity((prevQuantity) => prevQuantity + 1);
  };

  const accordionItemRefs: React.RefObject<HTMLDivElement>[] = data.map(() =>
    useRef<HTMLDivElement>(null)
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // const staggerDayGroups = (items: NodeListOf<HTMLElement>) => {
  //   const dayGroups = items;
  //   const tl = gsap.timeline();
  //   tl.staggerTo(dayGroups, 0.6, { opacity: 1, x: 0, delay: 0.3 }, 0.15, 0);
  // };

  // const handleMouseEnter = (index: number) => {
  //   setActiveIndex(index);
  //   const $xAccordPanels = document.querySelectorAll<HTMLElement>(".x-accordion-panel");
  //   const $xAccordDayGroups = document.querySelectorAll<HTMLElement>(".x-day-group");
  //   const parent = $xAccordPanels[index];
  //   if (parent) {
  //     const dayGroups = parent.querySelectorAll<HTMLElement>(".x-day-group");
  //     $xAccordPanels.forEach(panel => panel.classList.remove("is-active"));
  //     parent.classList.add("is-active");
  //     staggerDayGroups(dayGroups);
  //   }
  // };

  // useEffect(() => {
  //   const $xAccordDayGroups = document.querySelectorAll<HTMLElement>(".x-day-group");
  //   const hideDayGroups = () => {
  //     console.log("Hiding all day groups");
  //     const tl = gsap.timeline();
  //     tl.to($xAccordDayGroups, 0, { opacity: 0, x: -50 });
  //   };

  //   hideDayGroups();

  //   return () => {
  //     // Clean up any resources or event listeners if necessary
  //   };
  // }, []);

  return (
    // <div tabIndex={0}>
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <Canvas
        flat
        className='flex-grow'
        camera={{ fov: 5, near: 0.1, far: 1000, position: [0, 150, 125] }}
      >
        <Fisheye zoom={0}>
          <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
          <ambientLight intensity={(Math.PI / 2) * 2} />

          {/* <ambientLight intensity={0.9} /> */}
          <Suspense fallback={null}>
            <Wildlife animalsQuantity={animalsQuantity} />
          </Suspense>
          {/* <Ground /> */}
          {/* <Shadows /> */}
          <OrbitControls enableRotate={true} />
          <color attach='background' args={['white']} />
          <PerspectiveCamera />
        </Fisheye>
      </Canvas>
      <div className='x-accordion tabs absolute w-screen overflow-hidden  p-4'>
        <Tabs
          defaultValue='item-0'
          variant='unstyled'
          classNames={classes}
          className={`${lato.className}`}
          orientation="vertical"
        >
          <Tabs.List className='relative p-0'>
            {data.map(({ titulo, link }, index) => (
              <Tabs.Tab
                value={`item-${index}`}
                className=''
                key={`o-${index}`}
              >
                <span
                  className={`${abril.className} text-[2vw] uppercase text-black`}
                >
                  {titulo}
                </span>
                {/* <span className='icon text-[2vw]'> →</span> */}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {data.map(
            (
              {
                titulo,
                link,
                year,
                designer,
                content,
                category,
                frontend,
                backend,
              },
              index
            ) => (
              <Tabs.Panel
                className='faq-item faq-item--section-0 accordion__section flex  h-full w-screen justify-between pl-4'
                value={`item-${index}`}
                key={`no-${index}`}
              >
                <div className='accordion__question header'>
                  <div className='tab-body overflow-hidden p-0 [transition:all_0.3s_ease]'>
                    <div className='tab-content flex flex-col gap-2 '>
                      {/* <div >
                              <img
                                v-for="(logo, index) in filme.acf.financiamento.logos"
                                className="img-responsive"
                                v-bind:src="logo.sizes.thumbnail"
                                fluid-grow
                                alt="logo.name"
                              />
                            </div> */}
                      <iframe
                        key={`frame-${index}`}
                        className='margin-auto h-[60vh] w-full'
                        src={link}
                        title={titulo}
                      ></iframe>
                      <div className='w-full text-black' key={`k-${index}`}>
                        <p
                          className={`${lato.className} text-[1vw] w-2/3`}
                          key={`content-${index}`}
                        >
                          {content}
                        </p>
                        
                        <span className={` `} key={`designer-${index}`}> designed by </span>
                        <span className={`${abril.className} text-[1vw] uppercase `} key={`designer-${index}`}>
                         {designer}
                        </span>
                        <p
                          className={`${cinzel.className} text-[1vw] uppercase `}
                          key={`frontend-${index}`}
                        >
                          {frontend}
                        </p>
                        <p
                          className={`${archivo.className} text-[1vw] uppercase `}
                          key={`backend-${index}`}
                        >
                          {backend}
                        </p>
                        <p
                          className={`${six.className}  text-[1vw] `}
                          key={`category-${index}`}
                        >
                          {category}
                        </p>
                        <p
                          className={`${six.className} text-[2vw] uppercase `}
                          key={`ano-${index}`}
                        >
                          {year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
            )
          )}
        </Tabs>
      </div>

      {/* <Navbar
        onControlButtonClick={handleControlButtonClick}
        onIncreaseAnimals={handleIncreaseAnimals}
      /> */}
    </div>
  );
};

export default Home;
