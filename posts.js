const posts = [
  {
    id: "fog-pass-02",
    title: "Fog Pass 02: Visibility as Pressure",
    date: "2026-05-29",
    text: "The latest atmosphere pass uses thicker ground fog, harder silhouettes, and selective warm light to make every route choice feel less certain.",
    media: "assets/screen-industrial-fog.jpg"
  },
  {
    id: "checkpoint-loop",
    title: "Checkpoint Encounter Loop",
    date: "2026-05-18",
    text: "A new encounter test focuses on sparse ammo, short sightlines, and a retreat path that only becomes obvious after the player commits.",
    media: "assets/screen-checkpoint.jpg"
  },
  {
    id: "safehouse-tone",
    title: "Safehouse Tone Study",
    date: "2026-04-30",
    text: "Safe spaces should still feel exposed. This pass explores weak pools of light, broken cover, and distant movement outside the perimeter.",
    media: "assets/screen-safehouse.jpg"
  },
  {
    id: "night-raid",
    title: "Night Raid Lighting Prototype",
    date: "2026-04-12",
    text: "Testing colder shadows, muzzle-flash readability, and how much information the player can lose before tension turns into confusion.",
    media: "assets/screen-night-raid.jpg"
  }
];

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${dateString}T12:00:00`));
}

function renderPosts() {
  const root = document.querySelector("#posts-root");
  if (!root) return;

  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  root.innerHTML = sortedPosts.map((post) => {
    const media = post.media
      ? `<img src="${post.media}" alt="${post.title} media" loading="lazy">`
      : "";

    return `
      <article class="post-card" id="${post.id}">
        ${media}
        <div class="post-body">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <h2>${post.title}</h2>
          <p>${post.text}</p>
        </div>
      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderPosts);
