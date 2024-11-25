# Thalamus studio

```
# install Bun runtime
brew install node@20
node -v # should print `v20.18.0`

# install dependencies
npm install

npm run dev (for testing)

npm run build (to check the output of the build as pages size ...)
```

### portal details (title, description)

1. if the portal has details as title, description,

   - copy it from the query and past it in the  `markdown/studio-art.md` file.
     the astro framework will take care of rendering the page into html
2. the `layouts/layout.astro` is the main layout of the application

   - it has the header (can be updated based on feedback, logo, ....).

### Entrypoint (`pages/result/[ws]-[type]/index.astro`)

this file will generate all the static files based on the config that you provided

the file will use the `/api/nexus`  and fetch the `columns/data` and return all dashboard as independent pages

> **NOTE**: do not forget to change the names of the workspaces/dashboards in the 
>
> - `web/src/components/workspaces/breadcrumb.tsx`
> - `web/src/lib/shared.ts`
> - `api/nexus`
>
> **NOTE**: update the entry point to the "portal results" in the header
