import { useState } from 'react';
import LoadingAnimation from '../loading-animation/loading-animation';
import PropTypes from 'prop-types';

const MyImg = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={className}>
      {isLoading && <LoadingAnimation />}
      <img src={src} alt={alt} onLoad={handleImageLoad} style={{ display: isLoading ? 'none' : 'block' }} />
    </div>
  );
};

MyImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default MyImg;
