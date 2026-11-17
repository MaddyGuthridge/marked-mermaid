# Example

```mermaid
sequenceDiagram
    actor u as User
    participant site as Your Website
    participant marked as Marked
    participant mermaid as Mermaid
    participant dom as DOM

    activate u
    u->>+site: Request webpage<br>containing mermaid
    site->>+marked: Renders Markdown<br>document, using<br>mermaid extension
    marked-->>-site: Provides HTML
    site->>+mermaid: mermaid.initialize();
    mermaid-->>-site: OK
    site->>+dom: Add raw HTML to DOM
    dom-->>-site: OK
    site-)+mermaid: mermaid.run()
    mermaid->>+dom: Replace mermaid<br>code blocks<br>with diagrams.
    dom-->>-mermaid: OK
    deactivate mermaid
    site-->>-u: Page is displayed to user
    deactivate u
```

Or, using an alternative (HTML-like) syntax:

<pre class="mermaid">
sequenceDiagram
    actor User
    User->>GitHub: Clicks star button
    GitHub-->>User: Repo gets starred, making Maddy happy
</pre>
