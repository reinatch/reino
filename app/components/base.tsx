"use client";
import React, { Suspense, memo, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  CameraControls,
  Grid,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
} from "@react-three/drei";
import Wildlife from "./Wildlife";
import { Fisheye } from "../Fisheye";
import { gsap } from "gsap";
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
interface Project {
  titulo: string;
  link: string;
  year:string;
}

const data: Project[] = [
  {
    titulo: "artworks",
    link: "https://artworks.pt/",
    year: "2020",
  },
  {
    titulo: "entulho",
    link: "https://noentulho.pt/",
    year: "2020",
  },
  {
    titulo: "noentulho",
    link: "https://noentulho.com/",
    year: "2020",
  },
  {
    titulo: "vera mota",
    link: "https://veramota.com/",
    year: "2020",
  },
  {
    titulo: "valentina",
    link: "https://valentinapelayoatilano.com/projects",
    year: "2020",
  },
  {
    titulo: "offworld",
    link: "https://offworld.live/",
    year: "2020",
  },
  {
    titulo: "primeira idade",
    link: "http://www.primeira-idade.pt/",
    year: "2020",
  }
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
    console.log("Project clicked");
    closeProjectsDropdown();
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-white shadow-md">
      <div className="relative inline-block">
        <button
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleProjectsDropdown}
        >
          Projects
        </button>
        {isProjectsDropdownOpen && (
          <div className="absolute left-0 bottom-[2em] bg-white border rounded shadow-lg">
            {/* Main projects menu */}
            <ul>
              <li>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleProjectClick}
                >
                  Project 1
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleProjectClick}
                >
                  Project 2
                </button>
              </li>
              {/* Add more projects as needed */}
            </ul>

            {/* Submenu */}
            <div className="py-2 px-4">
              <p className="text-gray-500 text-sm">Submenu Item 1</p>
              <p className="text-gray-500 text-sm">Submenu Item 2</p>
              {/* Add more submenu items as needed */}
            </div>
          </div>
        )}
      </div>
      <button
        className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={onControlButtonClick}
      >
        about
      </button>
      <button
        className="ml-2 bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);
  const handleControlButtonClick = () => {
    // Implement the logic to control the instance
    console.log("Control button clicked");
  };
  const handleIncreaseAnimals = () => {
    setAnimalsQuantity((prevQuantity) => prevQuantity + 1);
  };

  const accordionItemRefs: React.RefObject<HTMLDivElement>[] = data.map(() => useRef<HTMLDivElement>(null));

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
    <div className="h-screen flex flex-col w-full overflow-hidden">
      <Canvas
        flat
        className="flex-grow"
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
          <color attach="background" args={["white"]} />
          <PerspectiveCamera />
        </Fisheye>
      </Canvas>
      <div className="x-accordion absolute tabs w-screen overflow-hidden">
      <Tabs defaultValue="item-0" variant="unstyled" classNames={classes} className="overflow-hidden">
                        <Tabs.List className="relative ">
                  {data.map(({ titulo, link }, index) => (
                    
                    <Tabs.Tab value={`item-${index}`} className="mix-blend-exclusion h-[10vh]">
                              <span className="text-[2em] text-yellow-500 font-Ogg ">{titulo}</span> 
                              <span className="icon text-[2em]"> →</span>
                              </Tabs.Tab>
                           
                           ))}
                           </Tabs.List>
                           
                        {data.map(({ titulo, link,year }, index) => (
                           <Tabs.Panel className="faq-item faq-item--section-0 accordion__section h-full w-[80vw] flex justify-center" value={`item-${index}`} >
                        <div className="accordion__question header">
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                      
                            {/* <div >
                              <img
                                v-for="(logo, index) in filme.acf.financiamento.logos"
                                className="img-responsive"
                                v-bind:src="logo.sizes.thumbnail"
                                fluid-grow
                                alt="logo.name"
                              />
                            </div> */}
                            <iframe className="h-[90vh] w-[80vw] margin-auto" src={link} title={titulo}></iframe>
                            <p>{year}</p>
                          </div>
                        </div>
                        </div>
                      </Tabs.Panel>
                     ))}
                     
      

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
