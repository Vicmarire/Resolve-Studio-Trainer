export interface RawQuestion {
  libro: string;
  leccion: number;
  pregunta_en: string;
  pregunta_es: string;
  respuesta_en: string;
  respuesta_es: string;
  pagina: number;
  argumento_en: string;
  argumento_es: string;
  distractores_en?: string[];
  distractores_es?: string[];
}

export interface Option {
  id: string;
  text_en: string;
  text_es: string;
  isCorrect: boolean;
}

export interface Question extends RawQuestion {
  id: string;
  options: Option[];
}

export type BookId = 
  | 'advanced_vfx' 
  | 'editors_guide' 
  | 'fairlight_guide' 
  | 'vfx_guide' 
  | 'colorist_guide' 
  | 'beginners_guide'
  | 'final_exam';

export interface BookMetadata {
  id: BookId;
  title: string;
  fileName: string;
}

export const BOOKS: BookMetadata[] = [
  { id: 'beginners_guide', title: "The Beginner's Guide to DaVinci Resolve 20", fileName: 'beginners_guide.json' },
  { id: 'editors_guide', title: "The Editor's Guide to DaVinci Resolve 20", fileName: 'editors_guide.json' },
  { id: 'colorist_guide', title: "The Colorist Guide to DaVinci Resolve 20", fileName: 'colorist_guide.json' },
  { id: 'vfx_guide', title: "The Visual Effects Guide to DaVinci Resolve 20", fileName: 'vfx_guide.json' },
  { id: 'advanced_vfx', title: "Advanced Visual Effects in DaVinci Resolve 20", fileName: 'advanced_vfx.json' },
  { id: 'fairlight_guide', title: "The Fairlight Audio Guide to DaVinci Resolve 20", fileName: 'fairlight_guide.json' },
];
