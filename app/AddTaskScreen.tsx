import { MAX_CHARS } from "@/constants/constants";
import { SCREEN_TITLE } from "@/enums/Screens";
import useTheme from "@/hook/useTheme";
import TaskSlice from "@/store/Slice/TaskSlice";
import LocalizationService from "@/utils/LocalizationService";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useDispatch } from "react-redux";

const AddTaskScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const theme = useTheme();

  const [title, setTitle] = useState(route.params?.task?.title || "");
  const [desc, setDesc] = useState(route.params?.task?.description || "");
  const isValid = useMemo(() => title.length > 0, [title]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.task) {
      navigation.setOptions({
        title: SCREEN_TITLE.EDIT_TASK,
      });
    } else {
      navigation.setOptions({
        title: SCREEN_TITLE.ADD_TASK,
      });
    }
  }, [navigation, route.params?.task]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSave = useCallback(() => {
    if (!isValid) {
      Alert.alert(
        LocalizationService.addTask.error.error,
        LocalizationService.addTask.error.title
      );
      return;
    }
    if (!route.params?.task) {
      dispatch(
        TaskSlice.actions.newTask({
          task: {
            title: title,
            description: desc,
            isChecked: false,
          },
        })
      );
    } else {
      dispatch(
        TaskSlice.actions.updateTask({
          task: {
            id: route.params.task.id,
            title,
            description: desc,
            isChecked: route.params.task.isChecked,
          },
        })
      );
    }
    navigation.goBack();
  }, [desc, dispatch, isValid, title, navigation, route.params]);

  const onChangeTitle = (value: string) => {
    setTitle(value);
  };
  const onChangeDesc = (value: string) => {
    setDesc(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.inputLabel}>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.text }]}
              >
                {LocalizationService.addTask.titleInput}
              </Text>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.danger }]}
              >
                *
              </Text>
              <Text
                style={[
                  styles.inputLabelCount,

                  {
                    color:
                      title.length === MAX_CHARS
                        ? theme.colors.danger
                        : theme.colors.subtext,
                  },
                ]}
              >
                ({title.length}/{MAX_CHARS})
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder={LocalizationService.addTask.titleInputPlaceholder}
              maxLength={MAX_CHARS}
              placeholderTextColor={"gray"}
              onChangeText={onChangeTitle}
              value={title}
            />
          </View>
        </View>
        <KeyboardAwareScrollView
          disableScrollOnKeyboardHide={true}
          contentContainerStyle={styles.container}
        >
          <View style={styles.textAreaContainer}>
            <View style={styles.inputLabel}>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.text }]}
              >
                {LocalizationService.addTask.descriptionInput}
              </Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={
                LocalizationService.addTask.descriptionInputPlaceholder
              }
              multiline
              onChangeText={onChangeDesc}
              value={desc}
              numberOfLines={100}
              placeholderTextColor={"gray"}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCancel}
              style={[
                styles.button,
                styles.buttonCancel,
                {
                  borderColor: theme.colors.subtext,
                  backgroundColor: theme.colors.background,
                },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: theme.colors.subtext }]}
              >
                {LocalizationService.button.cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.8}
              style={[
                styles.button,
                styles.buttonConfirm,
                { backgroundColor: theme.colors.success },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: theme.colors.background }]}
              >
                {LocalizationService.button.save}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingVertical: 10,
  },
  title: {
    fontSize: RFValue(20),
  },
  inputContainer: {},
  input: {
    marginTop: 5,
    fontSize: RFValue(15),
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  inputLabel: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 2,
  },
  inputLabelText: {
    fontSize: RFValue(12),
    fontWeight: "500",
  },
  inputLabelCount: {
    fontSize: RFValue(6),
    paddingBottom: RFValue(2),
    fontWeight: "bold",
  },
  textAreaContainer: {
    marginTop: 10,
    flex: 1,
  },
  textArea: {
    flex: 1,
    textAlignVertical: "top",
    paddingTop: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: "45%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonCancel: {
    borderWidth: 2,
  },
  buttonConfirm: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "transparent",
  },
  buttonText: {
    fontSize: RFValue(12),
    fontWeight: "500",
  },
});

export default AddTaskScreen;
