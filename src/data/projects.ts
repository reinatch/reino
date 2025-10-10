export interface Project {
  titulo: string;
  link: string;
  year: string;
  category: string;
  frontend: string;
  backend: string;
  content: string;
  designer: string;
  // preview can be a single URL or an array of URLs for a gallery
  preview?: string | string[];
}

export interface About {
  titulo: string;
  email: string;
  skills: string;
  content: string;
  contact: string;
}

export const data: Project[] = [
  {
    titulo: 'artworks',
    link: 'https://artworks.pt/',
    year: '2020',
    category: 'Category 1',
    frontend: 'React, TypeScript',
    backend: 'Node.js, Express',
    designer: 'Luisa Martelo',
    preview: [
      '/site_artworks.gif',
      'https://picsum.photos/seed/artworks-2/1600/900',
      'https://picsum.photos/seed/artworks-3/1600/900'
    ],
    content:
      "Artworks is a project aimed at showcasing creative works of various artists. It utilizes React and TypeScript for the frontend, with Node.js and Express powering the backend. Luisa Martelo, a talented designer, was instrumental in shaping the project's visual aesthetics.",
  },
  {
    titulo: 'entulho',
    link: 'https://noentulho.com/en',
    year: '2020',
    category: 'Category 2',
    frontend: 'Vue.js, JavaScript',
    backend: 'Django, Python',
    designer: 'Luisa Martelo',
    preview: [
      'https://picsum.photos/seed/entulho-1/1600/900',
      'https://picsum.photos/seed/entulho-2/1600/900'
    ],
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
  preview: 'https://picsum.photos/seed/noentulho/1600/900',
    content:
      "NoEntulho is a community-driven initiative to promote eco-friendly waste management practices. It utilizes Angular and JavaScript for the frontend, with Ruby on Rails powering the backend services. Luisa Martelo's design sensibilities ensured an intuitive user experience for the platform.",
  },
  {
    titulo: 'joana perez',
    link: 'https://joana-peres.com/',
    year: '2020',
    category: 'Category 1',
    frontend: 'Angular, TypeScript',
    backend: 'Ruby on Rail',
    designer: 'Luisa Marteo',
    preview: [
      'https://picsum.photos/seed/joana-1/1600/900',
      'https://picsum.photos/seed/joana-2/1600/900'
    ],
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
    preview: 'https://picsum.photos/seed/vera_mota/1600/900',
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
    preview: 'https://picsum.photos/seed/valentina/1600/900',
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
    preview: 'https://picsum.photos/seed/offworld/1600/900',
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
    preview: 'https://picsum.photos/seed/primeira_idade/1600/900',
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
    preview: 'https://picsum.photos/seed/luisa_martelo/1600/900',
    content:
      "Luisa Martelo is a personal portfolio website showcasing the diverse design projects undertaken by Luisa Martelo. It's built using React and TypeScript for the frontend, with Ruby on Rails powering the backend services. Luisa Martelo's design expertise shines through in every aspect of the portfolio.",
  },
];

export const about: About[] = [
  {
    titulo: 'about',
    skills: "REACT, TYPESCRIPT, NODE.JS, EXPRESS",
    contact: "Reach out for ideas, quotes, collaborations at:",
    email: "reinatchnatch@gmail.com",
    content:
      "Rei is a web designer and web developer with experience in Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quaeab illo inventore veritatis et quasi architecto beatae vitae dictasunt explicabo. Nemo enim ipsam voluptatem quia voluptas sitaspernatur aut odit aut fugit, sed quia consequuntur magni doloreseos qui ratione voluptatem sequi nesciunt.",
  },
];
