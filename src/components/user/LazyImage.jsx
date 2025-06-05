export const LazyImage = ({ src, alt = "image", ...props }) => {
  return <img src={src} alt={alt} loading="lazy" {...props} />;
};
