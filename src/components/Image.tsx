import { useEffect, useState } from "react";

type ImageProps = {
  src: string;
  width?: number;
  height?: number;
  className?: string;
};

const ImageComponent = ({ src, width, height, className }: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div>
      <img
        className={currentSrc === src ? className : `${className} blur-md`}
        width={width}
        height={height}
        src={currentSrc}
      />
    </div>
  );
};
export default ImageComponent;
