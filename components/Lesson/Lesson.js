import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import api, { endpoints } from "../../APIs/api";
import styles from "../../styles/styles";
import moment from "moment";

export default Lesson = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [lessons, setLesson] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      console.info(endpoints["lessons"](courseId));
      const res = await api.get(endpoints["lessons"](courseId));
      console.info(res.data);
      setLesson(res.data);
    };
    loadLesson();
  }, [courseId]);

  const goToLessonDetail = (lessonId) => {
    navigation.navigate("LessonDetail", { lessonId: lessonId });
  };

  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.subject, textAlign: "center" }}>
        DANH SÁCH BÀI HỌC
      </Text>
      {lessons === null ? (
        <ActivityIndicator color={"green"} />
      ) : (
        <ScrollView>
          {lessons.map((c) => (
            <View key={c.id} style={[styles.row, { padding: 5 }]}>
              <View>
                <TouchableOpacity onPress={() => goToLessonDetail(c.id)}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: c.image }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => goToLessonDetail(c.id)}>
                  <Text style={styles.title}>{c.name}</Text>
                  <Text style={{ marginLeft: 5 }}>
                    {moment(c.created_date).fromNow()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
