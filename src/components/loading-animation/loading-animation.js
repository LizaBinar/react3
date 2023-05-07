import classes from './loading-animation.module.scss';

const LoadingAnimation = () => {
  return (
    <div className={classes['loading-animation']}>
      <div className={classes['loading-animation-bar']}></div>
    </div>
  );
};

export default LoadingAnimation;
