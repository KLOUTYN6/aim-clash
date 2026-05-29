# AIM Clash Site Guide

This site is static, so GitHub Pages can host it without a backend.

## Post Updates

Open `admin.html` in the site to fill out a post form and copy the generated block.

Then paste the generated block near the top of the `posts` array in `posts.js`.

Open `posts.js` and add a new object inside the `posts` array:

```js
{
  id: "short-update-name",
  title: "New Update Title",
  date: "2026-05-29",
  text: "Write your update here.",
  media: "assets/your-image.jpg"
}
```

Use `media: ""` or remove the `media` line if the post has no image.

## Add Downloads

For small files under 100 MB:

1. Create a `downloads` folder.
2. Put the ZIP inside it.
3. Link to it like `downloads/my-build.zip`.

For bigger builds, use Google Drive, GitHub Releases, or Itch.io and paste that URL into `downloads.html`.

Your current build is too large for a normal GitHub repo, so the site links to Google Drive.

## Add Media

Put screenshots or GIFs in `assets`, then add a new item in `media.html`.

Categories currently used:

- `weapons`
- `status`
- `accessories`
- `maps`
- `systems`

Example:

```html
<figure class="media-item" data-category="weapons">
  <img src="assets/my-weapon.jpg" alt="Weapon screenshot">
  <figcaption><span>Weapons</span>Rifle test</figcaption>
</figure>
```
