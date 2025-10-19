// Instagram Graph API integration
const token = "PASTE_YOUR_ACCESS_TOKEN_HERE";
const limit = 12; // number of posts to show
const url = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type&access_token=${token}&limit=${limit}`;

async function loadInstagram() {
  const gallery = document.getElementById("insta-gallery");
  try {
    const res = await fetch(url);
    const data = await res.json();
    gallery.innerHTML = ""; // clear "loading" text

    if (data.data && data.data.length > 0) {
      data.data.forEach((item) => {
        if (item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM") {
          const a = document.createElement("a");
          a.href = item.permalink;
          a.target = "_blank";
          a.innerHTML = `<img src="${item.media_url}" alt="${item.caption || 'Instagram photo'}" loading="lazy">`;
          gallery.appendChild(a);
        }
      });
    } else {
      gallery.innerHTML = "<p>No Instagram posts found.</p>";
    }
  } catch (err) {
    console.error("Error loading Instagram feed:", err);
    gallery.innerHTML = "<p>Unable to load feed. Please try again later.</p>";
  }
}

loadInstagram();