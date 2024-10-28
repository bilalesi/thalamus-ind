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

the file will go through all the db tables from `api/db.ts` (schema from the creed app)
and fetch the `columns/data` and return all dashboard as independent pages

## NOTE

This script saves data to an SQLite database, which can then be uploaded to an S3 bucket. It is primarily used when regenerating static pages due to changes in the data or design updates.

## NOTE

docker image is ready for deployment (works perfectly)
