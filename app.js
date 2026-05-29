document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".site-nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const target = link.getAttribute("href");
    if (target === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const mediaItems = document.querySelectorAll(".media-item[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      mediaItems.forEach((item) => {
        const shouldShow = filter === "all" || item.dataset.category === filter;
        item.hidden = !shouldShow;
      });
    });
  });

  const creator = document.querySelector("#post-creator");
  const output = document.querySelector("#post-output");

  if (creator && output) {
    const title = creator.elements.title;
    const date = creator.elements.date;
    const text = creator.elements.text;
    const media = creator.elements.media;
    const previewTitle = document.querySelector("#preview-title");
    const previewDate = document.querySelector("#preview-date");
    const previewText = document.querySelector("#preview-text");
    const previewImage = document.querySelector("#preview-image");
    const copyButton = document.querySelector("#copy-post");
    const copyStatus = document.querySelector("#copy-status");

    date.value = new Date().toISOString().slice(0, 10);

    const escapePostValue = (value) => value
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n");

    const slugify = (value) => {
      const slug = value.toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      return slug || `update-${Date.now()}`;
    };

    const formatCreatorDate = (value) => {
      if (!value) return "Today";
      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(new Date(`${value}T12:00:00`));
    };

    const buildPostBlock = () => {
      const cleanTitle = title.value.trim() || "Untitled AIM Clash Update";
      const cleanDate = date.value || new Date().toISOString().slice(0, 10);
      const cleanText = text.value.trim() || "Write the update text here.";
      const cleanMedia = media.value.trim();
      const mediaLine = cleanMedia ? `,\n    media: "${escapePostValue(cleanMedia)}"` : "";

      return `  {\n    id: "${slugify(cleanTitle)}",\n    title: "${escapePostValue(cleanTitle)}",\n    date: "${cleanDate}",\n    text: "${escapePostValue(cleanText)}"${mediaLine}\n  },`;
    };

    const updateCreator = () => {
      const cleanTitle = title.value.trim() || "Post title preview";
      const cleanText = text.value.trim() || "Your post text will appear here.";
      const cleanMedia = media.value.trim() || "assets/screen-checkpoint.jpg";

      previewTitle.textContent = cleanTitle;
      previewDate.textContent = formatCreatorDate(date.value);
      previewDate.setAttribute("datetime", date.value || "");
      previewText.textContent = cleanText;
      previewImage.src = cleanMedia;
      output.value = buildPostBlock();
    };

    creator.addEventListener("input", updateCreator);
    creator.addEventListener("submit", (event) => {
      event.preventDefault();
      updateCreator();
      output.focus();
      output.select();
    });
    creator.addEventListener("reset", () => {
      window.setTimeout(updateCreator, 0);
    });

    copyButton.addEventListener("click", async () => {
      updateCreator();
      output.focus();
      output.select();

      try {
        await navigator.clipboard.writeText(output.value);
        copyStatus.textContent = "Copied. Paste it at the top of the posts array in posts.js.";
      } catch (error) {
        document.execCommand("copy");
        copyStatus.textContent = "Selected the block. Copy it, then paste it at the top of posts.js.";
      }
    });

    previewImage.addEventListener("error", () => {
      previewImage.src = "assets/screen-checkpoint.jpg";
    });

    updateCreator();
  }
});
