export type TemplateKey =
  | 'pug-scss-js'
  | 'pug-scss-ts'
  | 'pug-less-js';

export const templates: Record<
  TemplateKey,
  { path: string; description: string }
> = {
  'pug-scss-js': {
    path: 'templates/pug-scss-js',
    description: 'Pug + SCSS + JavaScript'
  },
  'pug-scss-ts': {
    path: 'templates/pug-scss-ts',
    description: 'Pug + SCSS + TypeScript'
  },
  'pug-less-js': {
    path: 'templates/pug-less-js',
    description: 'Pug + LESS + JavaScript'
  }
};
