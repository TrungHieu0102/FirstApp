import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import api, { endpoints } from "../../APIs/api";
import styles from "../../styles/styles";
import RenderHTML from "react-native-render-html";

export default LessonDetail = ({ route }) => {
  const [lesson, setLesson] = useState(null);
  const { lessonId } = route.params;
  useEffect(() => {
    const loadLesson = async () => {
      const res = await api.get(endpoints["lessonDetail"](lessonId));
      console.info(res.data);
      setLesson(res.data);
    };
    loadLesson();
  }, [lessonId]);

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.subject, textAlign: "center" }}>
        CHI TIẾT BÀI HỌC
      </Text>
      {lesson === null ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView>
            <View style={styles.row}>
              <Image
                source={{ uri: lesson.image }}
                style={{ width: 100, height: 100 }}
              />
              <Text> {lesson.name}</Text>
            </View>
            {/* <Text>{lesson.description}</Text> */}
            <RenderHTML source={{ html: lesson.description }}></RenderHTML>
          </ScrollView>
        </>
      )}
    </View>
  );
};
