import { Task } from "@/interfaces/tasks";
import LocalizationService from "@/utils/LocalizationService";

import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { TickSquare, Trash, MinusSquare } from "iconsax-react-native";
import { hexToRgba } from "@/utils/ColorUtils";
import useTheme from "@/hook/useTheme";

interface TaskCardProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onCheckTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  onCheckTask,
  onDeleteTask,
  task,
}) => {
  const theme = useTheme();

  const changeStatus = () => {
    const taskUpdated: Task = { ...task, isChecked: !task.isChecked };
    onCheckTask(taskUpdated);
  };

  const deleteTask = useCallback(() => {
    Alert.alert(
      LocalizationService.home.error.error,
      LocalizationService.home.error.title,
      [
        {
          text: LocalizationService.button.cancel,
          onPress: () => {},
          style: "cancel",
        },
        {
          text: LocalizationService.button.delete,
          onPress: () => onDeleteTask(task.id),
          style: "default",
        },
      ]
    );
  }, [task, onDeleteTask]);

  return (
    <View
      style={[
        styles.card,
        task.isChecked ? styles.cardChecked : styles.cardNotChecked,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.indicator,
          {
            backgroundColor: task.isChecked
              ? theme.colors.success
              : theme.colors.info,
          },
        ]}
      />
      <View style={styles.row}>
        <TouchableOpacity
          onPress={changeStatus}
          style={styles.buttonTick}
          activeOpacity={0.8}
        >
          {task.isChecked ? (
            <TickSquare color={theme.colors.success} size={RFValue(16)} />
          ) : (
            <MinusSquare color={theme.colors.info} size={RFValue(16)} />
          )}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: task.isChecked
                  ? theme.colors.subtext
                  : theme.colors.text,
              },
              task.isChecked && styles.textChecked,
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={deleteTask}
        style={[
          styles.trashContainer,
          { backgroundColor: hexToRgba(theme.colors.light_error, 0.3) },
        ]}
      >
        <Trash color={theme.colors.light_error} size={RFValue(16)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardChecked: {
    borderWidth: 2,
    borderColor: "#81C784",
  },
  cardNotChecked: {
    borderWidth: 2,
    borderColor: "#28BEF5",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
  },
  buttonTick: {
    marginRight: 10,
  },
  indicator: {
    width: 7,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: RFValue(12),
  },
  textChecked: {
    textDecorationLine: "line-through",
  },
  trashContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 2,
  },
});

export default TaskCard;
