import React, { useCallback, useEffect } from "react";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Task } from "@/interfaces/tasks";
import TaskSlice from "@/store/Slice/TaskSlice";
import { SCREEN_NAME } from "@/enums/Screens";
import EmptyTaskList from "./EmptyTaskList";
import TaskCard from "./TaskCard";

interface TaskListProps {
  data: Task[];
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      navigation.navigate(SCREEN_NAME.ADD_TASK, { task });
    },
    [navigation]
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
