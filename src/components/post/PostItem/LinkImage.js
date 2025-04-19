import Image from "./Image";
const LinkImage = ({ href, src, alt, dims, eager, onLoad }) => (
  <a className="link" href={href} target="_blank" rel="noopener noreferrer">
    <Image src={src} alt={alt} dims={dims} eager={eager} onLoad={onLoad} />
    <span className="source">{href}</span>
  </a>
);

export default LinkImage;
