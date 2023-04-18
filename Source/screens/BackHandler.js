import { BackHandler, Platform } from "react-native";
import { SimpleToast } from "./Const";

let currentCount = 0;
export const useDoubleBackPressExit = (
) => {
  if (Platform.OS === "ios") return;
  const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
    if (currentCount === 1) {
      // BackHandler.exitApp();
      subscription.remove();
      return true;
    }
    backPressHandler();
    return true;
  });
};

const backPressHandler = () => {
  if (currentCount < 1) {
    SimpleToast({ title: 'Press twice to exit!' });
    currentCount += 1;
  };
  setTimeout(() => {
    currentCount = 0;
  }, 1000);
};
