import React, { useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";

import useCalendar, { CalendarDay } from "../hooks/useCalendar";
import Days from "./Days";
import Header from "./Header";
import MonthPicker from "./MonthPicker";

import useEntranceAnimation from "../hooks/useEntranceAnimation";
import { capitalize } from "../utils";

const rootStyle = {
  width: 328,
};

type CalendarProps = {
  onChangeDay?: (day: CalendarDay) => void;
};

const Calendar = ({ onChangeDay }: CalendarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [dayPressed, setDayPressed] = useState<CalendarDay>();
  const {
    month,
    currentDate,
    nextMonth,
    previousMonth,
    months,
    changeYearAndMonth,
  } = useCalendar();
  const { animateEntrance, opacityAnimate, showAnimate } =
    useEntranceAnimation();

  const handleNextMonth = () => {
    nextMonth();
    animateEntrance("right");
  };

  const handlePreviousMonth = () => {
    previousMonth();
    animateEntrance("left");
  };

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const handleMonthPicker = () => {
    setIsVisible(!isVisible);

    Animated.timing(scaleAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const entranceAnimationShowView = {
    transform: [
      {
        scale: scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1.2, 1],
        }),
      },
    ],
    opacity: scaleAnim,
  };

  const entranceAnimationHideView = {
    transform: [
      {
        scale: scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
    opacity: scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderColor: "red",
          width: rootStyle.width + 16,
          padding: 8,
        }}
      >
        <Animated.View style={[entranceAnimationHideView, { gap: 8 }]}>
          <Header
            currentDate={capitalize(currentDate.format("MMM YYYY"))}
            handleNextMonth={handleNextMonth}
            handlePreviousMonth={handlePreviousMonth}
            opacityAnimate={opacityAnimate}
            containerWidth={rootStyle.width}
            showAnimate={showAnimate}
            onMonthPress={() => {
              handleMonthPicker();
            }}
          />
          <Animated.View
            style={{
              width: rootStyle.width,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ translateX: showAnimate }],
              opacity: opacityAnimate,
            }}
          >
            <Days
              onDayPress={(day) => {
                setDayPressed(day);

                onChangeDay?.(day);
              }}
              containerWidth={rootStyle.width}
              days={month}
              daypressed={dayPressed}
            />
          </Animated.View>
        </Animated.View>

        <Animated.View
          pointerEvents={!isVisible ? "auto" : "none"}
          style={[
            { position: "absolute", width: "100%", height: "100%" },
            entranceAnimationShowView,
          ]}
        >
          <MonthPicker
            changeYearAndMonth={changeYearAndMonth}
            containerWidth={rootStyle.width}
            months={months}
            onMonthPress={() => {
              handleMonthPicker();
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default Calendar;
