# @MaddyGuthridge/marked-mermaid

A simple Marked extension to render mermaid diagrams.

````md
# Example document

```mermaid
sequenceDiagram
  User->>Marked: Request document containing mermaid
  Marked-->>User: Generates HTML which Mermaid will convert into a diagram
```
````
<!--
Quadruple backticks for outer code block
https://stackoverflow.com/a/25943045/6335363
-->

Heavily inspired by:

* [marked-mermaid](https://github.com/MichielDeMey/marked-mermaid)
* [dbolack-ab/marked-mermaidjs](https://github.com/dbolack-ab/marked-mermaidjs)

But with up-to-date dependencies (as of August 2025).

* Mermaid 11
* Marked 16

Additional notes:

* The diagram will only be rendered in a browser, since the process for
  generating it server-side is [horrific](https://github.com/mermaid-js/mermaid/issues/3650).
  As such, this extension won't work nicely with the `marked` CLI.
* You will need to call `mermaid.run()` manually once the page loads, and again
  whenever your document changes.
* This doesn't attempt to do any fancy memoization, which makes the
  implementation much simpler than alternatives. It's still fast enough for
  real-time editing.

## Usage

```js
import {Marked} from "marked";
import markedMermaid from "@MaddyGuthridge/marked-mermaid";

const marked = new Marked(markedMermaid());

const diagram = [
  '```mermaid',
  'sequenceDiagram',
  '  User->>Marked: Request document containing mermaid',
  '  Marked-->>User: Generates HTML which Mermaid will convert into a diagram',
  '```'
].join('\n');

marked.parse(diagram);
// Mermaid will render it as soon as it is inserted into the DOM (or as soon as
// the page loads in the browser)
```
