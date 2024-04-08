import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import api, { endpoints } from "../../APIs/api";
import moment from "moment/moment";

const Courses = ({ route, navigation }) => {
  const [courses, setCourses] = useState(null);
  const cateId = route.params?.cateId;

  useEffect(() => {
    let url = endpoints["courses"];
    if (cateId !== undefined && cateId !== "") {
      url = `${url}?category_id=${cateId}`;
    }
    const loadCourse = async () => {
      const res = await api.get(url); //?category_id=
      setCourses(res.data.results);
    };
    loadCourse();
  }, [cateId]);

  const goToLesson = (courseId) => {
    navigation.navigate("Lesson", { courseId: courseId });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.subject, { textAlign: "center" }]}>
        DANH SÁCH KHÓA HỌC
      </Text>
      {courses === null ? (
        <ActivityIndicator color={"green"} />
      ) : (
        <ScrollView>
          {courses.map((c) => (
            <View
              key={c.id}
              style={[
                styles.row,
                { padding: 5 },
                { borderColor: "green" },
                { borderStyle: "solid" },
              ]}
            >
              <View>
                <TouchableOpacity onPress={() => goToLesson(c.id)}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: c.image }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => goToLesson(c.id)}>
                  <Text style={styles.title}>{c.name}</Text>
                  <Text style={{ marginLeft: 10, fontStyle: "italic" }}>
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

export default Courses;
