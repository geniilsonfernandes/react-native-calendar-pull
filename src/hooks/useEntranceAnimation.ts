import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export type EntranceAnimation = 'right' | 'left';

export type useEntranceAnimationType = {
  showAnimate: Animated.Value;
  opacityAnimate: Animated.Value;
  animateEntrance: (direction: EntranceAnimation) => void;
};

const useEntranceAnimation = (): useEntranceAnimationType => {
  const showAnimate = useRef(new Animated.Value(0)).current;
  const opacityAnimate = useRef(new Animated.Value(1)).current;

  const animateEntrance = (direction: 'right' | 'left') => {
    const animationConfig = {
      toValue: 0,
      duration: 300,
      easing: Easing.bezier(0.33, 0.66, 0.54, 1),
      useNativeDriver: true,
    };

    const opacityConfig = {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    };

    if (direction === 'right') {
      showAnimate.setValue(30);
      opacityAnimate.setValue(0);
      Animated.parallel([
        Animated.timing(showAnimate, animationConfig),
        Animated.timing(opacityAnimate, opacityConfig),
      ]).start();
    } else if (direction === 'left') {
      showAnimate.setValue(-30);
      opacityAnimate.setValue(0);
      Animated.parallel([
        Animated.timing(showAnimate, animationConfig),
        Animated.timing(opacityAnimate, opacityConfig),
      ]).start();
    }
  };

  return { showAnimate, opacityAnimate, animateEntrance };
};

export default useEntranceAnimation;
