import { basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const relativePath = filename => relative(__dirname, filename);
const cssExtension = filename => filename.endsWith('.module.css') ? '.module.css' : '.module.css.d.ts';
const cssBase = filename => relativePath(basename(filename, cssExtension(filename)));

export default {
  '*.{module.css,module.css.d.ts}': filenames => [
    // Make sure CSS type definitions are updated
    ...filenames.map(filename => `tcm -p ${cssBase(filename)}.module.css`),
    // Add any new CSS type definition files to git
    ...filenames.map(filename => `git add ${cssBase(filename)}.module.css.d.ts`),
  ],
  '*.css': filenames => [
    // Lint CSS
    `stylelint ${filenames.join(' ')}`,
  ],
  '*.{js,jsx,ts,tsx}': filenames => [
    // Lint JavaScript
    `eslint ${filenames.join(' ')}`,
  ],
  '*.{ts,tsx}': filenames => [
    // Lint Typescript
    `tsc-files ${filenames.join(' ')}`,
  ],
};
