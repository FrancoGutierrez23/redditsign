// utils.js
export const isImagePost = (post) =>
  post?.post_hint?.startsWith("image") ||
  ["jpeg", "jpg", "png", "gif"].some((ext) => post?.url?.includes(ext));

export const calcDimensions = (post) => {
  const big = window.innerWidth > 500; // breakpoint
  const w = post.thumbnail_width || 320;
  const h = post.thumbnail_height || 320;

  return {
    img: { width: big ? w * 3 : w * 2, height: big ? h * 3 : h * 2 },
    link: { width: big ? w * 1.2 : w, height: big ? h * 1.2 : h },
  };
};

export const obtainYoutubeUrl = (post) => {
  if (!post?.media_embed?.content) return null;
  const match = post.media_embed.content.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

export const getGalleryImages = (post) => {
  if (!post.gallery_data || !post.media_metadata) return [];
  const reg = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;

  return Object.values(post.media_metadata)
    .map((m) => m.s.u.match(reg)?.[0])
    .filter(Boolean)
    .map((url) => url.slice(0, 8) + "i" + url.slice(15)); // swap preview → i.redd.it
};
