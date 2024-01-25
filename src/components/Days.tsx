import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { CalendarDay } from "../hooks/useCalendar";
type DayProps = {
  containerWidth: number;
  days: CalendarDay[];
  onDayPress: (day: CalendarDay) => void;
  daypressed?: CalendarDay;
};
const Days = ({ containerWidth, days, onDayPress, daypressed }: DayProps) => {
  const colors = {
    default: "#ececec",
    selected: "#d4d4d4",
    today: "#b9b9b9",
  };
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: containerWidth,
        justifyContent: "center",
        gap: 4,
      }}
    >
      {days.map((day) => (
        <TouchableOpacity
          key={day.id}
          onPress={() => onDayPress(day)}
          disabled={day.disabled}
          style={{
            width: (containerWidth - 20) / 7,
            height: (containerWidth - 20) / 7,
            borderRadius: 45,
            justifyContent: "center",
            alignItems: "center",
            opacity: day.disabled ? 0.5 : 1,
            backgroundColor:
              daypressed?.id === day.id
                ? colors.selected
                : day.isToday
                ? colors.today
                : colors.default,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: day.disabled ? "#b9b9b9" : "#292929",
            }}
          >
            {day.day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Days;
