const Youtube = ({ src, dims }) => (
  <iframe
    title="YouTube video"
    src={src}
    style={dims}
    loading="lazy"
    className="post_vid"
    allowFullScreen
  />
);

export default Youtube;
