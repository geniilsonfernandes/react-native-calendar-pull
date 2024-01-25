import { Animated, Image, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  currentDate: string;
  handleNextMonth: () => void;
  handlePreviousMonth: () => void;
  containerWidth: number;
  showAnimate: Animated.Value;
  opacityAnimate: Animated.Value;
  onMonthPress: () => void;
};
const Header = ({
  currentDate,
  handleNextMonth,
  handlePreviousMonth,
  opacityAnimate,
  containerWidth,
  showAnimate,
  onMonthPress,
}: HeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 38,
        width: containerWidth,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: 8,
        }}
        onPress={handlePreviousMonth}
      >
        <Image source={require("../assets/arrow.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onMonthPress}>
        <Animated.Text
          style={{
            fontSize: 16,
            color: "#292929",
            width: 100,
            textAlign: "center",
            transform: [{ translateX: showAnimate }],
            opacity: opacityAnimate,
          }}
        >
          {currentDate}
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 8,
        }}
        onPress={handleNextMonth}
      >
        <Image
          source={require("../assets/arrow.png")}
          style={{
            transform: [{ rotate: "180deg" }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
