import { View } from "react-native";

export default function ProgressBar({ progress }) {
  return (
    <View className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <View
        className="h-3 bg-indigo-500 rounded-full"
        style={{ width: `${progress * 100}%` }}
      />
    </View>
  );
}
