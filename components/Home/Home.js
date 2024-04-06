import { View, Text, FlatList, Image, ScrollView } from "react-native";
import styles from "../../styles/styles";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  const getCourse = async () => {
    try {
      const response = await fetch(
        "https://haunguyen.pythonanywhere.com/courses/"
      );
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <View >
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.subject}>{item.name}</Text>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}
      />
    </View>
  );
};
export default Home;
