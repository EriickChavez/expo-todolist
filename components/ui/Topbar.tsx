import { AddCircle, ArrowLeft2 } from "iconsax-react-native";
import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import useTheme from "@/hook/useTheme";
import { taskSelector } from "@/store/Slice/TaskSlice";
import { SCREEN_NAME, SCREEN_TITLE } from "@/enums/Screens";
import LocalizationService from "@/utils/LocalizationService";
import { router } from "expo-router";

const Topbar: React.FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { taskList } = useSelector(taskSelector);

  const completedTaskCount = useMemo(
    () => taskList.filter((task) => task.isChecked).length,
    [taskList]
  );
  const taskCount = useMemo(() => taskList.length, [taskList]);

  const onAddPress = useCallback(() => {
    router.navigate("/AddTaskScreen");
  }, [navigation]);

  const paddingTop = Platform.OS === "ios" ? insets.top : insets.top * 2;

  const isHomeScreen = useMemo(() => route.name === SCREEN_NAME.HOME, [route]);

  const headerTitle = useMemo(() => {
    if (isHomeScreen) {
      return LocalizationService.home.titleScreen;
    } else if (options.title === SCREEN_TITLE.ADD_TASK) {
      return LocalizationService.addTask.titleAddScreen;
    } else {
      return LocalizationService.addTask.titleEditScreen;
    }
  }, [options.title, isHomeScreen]);

  const showProgress = useMemo(() => {
    return route.name === SCREEN_NAME.HOME;
  }, [route.name]);

  const renderBackButton = useMemo(() => {
    if (!navigation.canGoBack()) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={navigation.goBack}
        style={styles.backButton}
      >
        <ArrowLeft2 size={RFValue(18)} color={theme.colors.text} />
      </TouchableOpacity>
    );
  }, [navigation, theme.colors.text]);

  const isTasksCompleted = useMemo(() => {
    return completedTaskCount === taskCount && taskCount > 0;
  }, [completedTaskCount, taskCount]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingTop },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.row}>
          {renderBackButton}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {headerTitle}
          </Text>
        </View>
        {isHomeScreen && (
          <TouchableOpacity onPress={onAddPress}>
            <AddCircle size={RFValue(18)} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      {showProgress && (
        <Text
          style={[
            styles.taskCount,
            {
              color: isTasksCompleted
                ? theme.colors.success
                : theme.colors.subtext,
            },
          ]}
        >
          ({completedTaskCount}/{taskCount}){" "}
          {LocalizationService.home.completedTasks}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: RFValue(20),
  },
  taskCount: {
    fontSize: RFValue(8),
  },
});

export default Topbar;
