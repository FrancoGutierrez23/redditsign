const Video = ({ src, dims, controls = true }) => (
  <video style={dims} className="post_vid" loading="lazy" controls={controls}>
    <source src={src} type="video/mp4" />
  </video>
);

export default Video;
