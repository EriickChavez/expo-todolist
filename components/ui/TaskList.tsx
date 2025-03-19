import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Task } from "@/interfaces/tasks";
import TaskSlice from "@/store/Slice/TaskSlice";
import EmptyTaskList from "./EmptyTaskList";
import TaskCard from "./TaskCard";

import { router } from "expo-router";

interface TaskListProps {
  data: Task[];
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const dispatch = useDispatch();

  const setDraggableData = useCallback(
    (data: Task[]) => {
      dispatch(TaskSlice.actions.setDraggableData({ data }));
    },
    [dispatch]
  );

  const removeTask = useCallback(
    (id: string) => {
      dispatch(
        TaskSlice.actions.removeTask({
          id: id,
        })
      );
    },
    [dispatch]
  );

  const onCheckTask = useCallback(
    (task: Task) => {
      dispatch(
        TaskSlice.actions.updateTask({
          task,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setDraggableData(props.data);
  }, [props.data, setDraggableData]);

  const onTaskPress = useCallback(
    (task: Task) => {
      router.navigate("/AddTaskScreen", { task });
    },
    [router]
  );

  const renderItem = useCallback(
    (item: Task) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={() => onTaskPress(item)}
        >
          <TaskCard
            task={item}
            onDeleteTask={removeTask}
            onCheckTask={onCheckTask}
          />
        </TouchableOpacity>
      );
    },
    [removeTask, onCheckTask, onTaskPress]
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.draggableList}
        data={props.data}
        automaticallyAdjustKeyboardInsets={true}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        extraData={[props.data]}
        ListEmptyComponent={EmptyTaskList}
      />
      {/* <DraggableFlatList
        containerStyle={styles.draggableList}
        data={props.data}
        automaticallyAdjustKeyboardInsets={true}
        keyExtractor={(_, index) => String(index)}
        onDragEnd={({ data }) => setDraggableData(data)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        extraData={[props.data]}
        ListEmptyComponent={EmptyTaskList}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  draggableList: {
    flex: 1,
  },
  card: {
    marginVertical: 5,
  },
});

export default TaskList;
