import dayjs from "dayjs";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Header from "./Header";
import { IUserCalendar } from "../hooks/useCalendar";

import useEntranceAnimation from "../hooks/useEntranceAnimation";

type MonthPickerProps = {
  onMonthPress: (month: string) => void;
  months: IUserCalendar["months"];
  containerWidth: number;
  changeYearAndMonth: IUserCalendar["changeYearAndMonth"];
};

const MonthPicker = ({
  containerWidth,
  months,
  onMonthPress,
  changeYearAndMonth,
}: MonthPickerProps) => {
  const [year, setYear] = useState(dayjs().year());
  const { animateEntrance, opacityAnimate, showAnimate } =
    useEntranceAnimation();

  const handleNextYear = () => {
    setYear(year + 1);
    changeYearAndMonth(year + 1, dayjs().month());
    animateEntrance("right");
  };

  const handlePreviousYear = () => {
    setYear(year - 1);
    changeYearAndMonth(year - 1, dayjs().month());
    animateEntrance("left");
  };

  const handleMonth = (month: number) => {
    onMonthPress(months[month]);
    changeYearAndMonth(year, month);
  };

  return (
    <View
      style={{
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header
        currentDate={year.toString()}
        handleNextMonth={() => handleNextYear()}
        handlePreviousMonth={() => handlePreviousYear()}
        opacityAnimate={opacityAnimate}
        containerWidth={containerWidth}
        showAnimate={showAnimate}
        onMonthPress={() => {}}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginTop: 16,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {months.map((month, i) => (
          <TouchableOpacity
            onPress={() => handleMonth(i)}
            key={month}
            style={{
              width: 80,
              height: 56,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#292929",
                textAlign: "center",
              }}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MonthPicker;
