// Media.jsx
import { useCallback } from "react";
import {
  isImagePost,
  calcDimensions,
  obtainYoutubeUrl,
  getGalleryImages,
} from "./utils";
import Gallery from "./Gallery";
import Video from "./Video";
import Image from "./Image";
import LinkImage from "./LinkImage";
import Youtube from "./Youtube";

const Media = ({
  post,
  shouldPreload = false,
  onImageLoaded = () => {},
  context = "feed",
}) => {
  const dims = calcDimensions(post);

  /* ---------- Decision tree ---------- */
  const renderMedia = useCallback(() => {
    /* ───── Simple image ───── */
    if (
      isImagePost(post) &&
      !post.url?.includes("gallery") &&
      !post.is_video &&
      !post.post_hint?.includes("video") &&
      post.post_hint !== "link"
    ) {
      return (
        <Image
          src={post.url ?? post.thumbnail}
          alt={post.title}
          dims={dims.img}
          eager={shouldPreload}
          onLoad={onImageLoaded}
        />
      );
    }

    /* ───── External link image ───── */
    if (
      isImagePost(post) &&
      !post.url?.includes("gallery") &&
      !post.is_video &&
      !post.post_hint?.includes("video") &&
      post.post_hint === "link"
    ) {
      return (
        <LinkImage
          href={post.url}
          src={post.url ?? post.thumbnail}
          alt={post.title}
          dims={dims.link}
          eager={shouldPreload}
          onLoad={onImageLoaded}
        />
      );
    }

    /* ───── Reddit hosted video ───── */
    if (post.is_video) {
      return (
        <Video
          src={post.media?.reddit_video?.fallback_url}
          dims={dims.img}
          controls
        />
      );
    }

    /* ───── YouTube embed ───── */
    if (post?.domain === "youtu.be") {
      return <Youtube src={obtainYoutubeUrl(post)} dims={dims.img} />;
    }

    /* ───── Gallery ───── */
    if (post.url?.includes("gallery")) {
      const imgs = getGalleryImages(post);
      if (imgs.length) {
        return (
          <Gallery
            id={`gallery-${post.id}-${context}`}
            images={imgs}
            eager={shouldPreload}
            onImageLoaded={onImageLoaded}
          />
        );
      }
    }

    /* ───── Fallback ───── */
    return null;
  }, [post, dims, shouldPreload, onImageLoaded, context]);

  return <>{renderMedia()}</>;
};

export default Media;
