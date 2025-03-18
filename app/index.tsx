import TaskList from "@/components/ui/TaskList";
import useTheme from "@/hook/useTheme";
import { taskSelector } from "@/store/Slice/TaskSlice";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { taskList } = useSelector(taskSelector);
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <View style={styles.list}>
          <TaskList data={taskList} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flex: 1,
  },
});
