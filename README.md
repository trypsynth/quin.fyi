# quin.fyi

My blog, built with [Cobalt](https://cobalt-org.github.io/) and deployed to GitHub Pages on every push to `master`.

## Writing

- `cobalt serve --drafts` previews the site, drafts included, at http://localhost:1024.
- `cobalt new -f _drafts "Post title"` starts a draft.
- `cobalt publish _drafts/post-title.md` dates it and moves it to `posts/`. The date is in UTC, so an evening post can land on tomorrow; fix `published_date` by hand if it matters.

Every post uses `layout: post.liquid`. The post title is the page's only `h1`, so headings inside a post start at `##`.

## License

The site's code (templates, styles, workflow) is MIT licensed; see `LICENSE`. Posts are licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
