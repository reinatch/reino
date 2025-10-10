export interface Project {
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

export interface About {
  titulo: string;
  email: string;
  skills: string;
  content: string;
  contact: string;
}
