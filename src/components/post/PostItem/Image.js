const Image = ({ src, alt, dims, eager, onLoad }) => (
  <img
    src={src}
    alt={alt}
    className="post_img"
    loading={eager ? "eager" : "lazy"}
    onLoad={onLoad}
    style={dims}
  />
);

export default Image;
