import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Courses from "./components/Courses/Courses";
import Login from "./components/Login/Login";
import Lesson from "./components/Lesson/Lesson";
import LessonDetail from "./components/Lesson/LessonDetail";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import api, { endpoints } from "./APIs/api";

const Drawer = createDrawerNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={MyDrawerContent}>
        <Drawer.Screen
          name="Courses"
          component={Courses}
          options={{
            title: "Trang chủ",
            headerStyle: { backgroundColor: "#86EBE1" },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ title: "Đăng nhập" }}
        />
        <Drawer.Screen
          name="Lesson"
          component={Lesson}
          options={{
            title: "Danh sách bài học",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="LessonDetail"
          component={LessonDetail}
          options={{
            title: "Chi tiết bài học",
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const MyDrawerContent = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      const res = await api.get(endpoints["categories"]);
      setCategories(res.data);
    };
    loadCategory();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {categories.map((c) => (
        <DrawerItem
          label={c.name}
          key={c.id}
          onPress={() => props.navigation.navigate("Courses", { cateId: c.id })}
        ></DrawerItem>
      ))}
    </DrawerContentScrollView>
  );
};
