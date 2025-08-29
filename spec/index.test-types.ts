import { Marked } from 'marked';
import markedMermaid from '../src/index.ts';

const marked = new Marked(markedMermaid());

const html: string = marked.parse('example markdown', { async: false });
console.log(html);
