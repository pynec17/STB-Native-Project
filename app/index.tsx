import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Details() {
  const [list, setList] = useState<Post[]>([]);

  const getData = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#5354af"
        }}
        accessibilityRole="header"
        accessibilityLabel="Post titles page header">
        Titles
      </Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text accessibilityRole="text" accessibilityLabel={`Post title - ${item.title}`}>{item.title}</Text>}
      />

    </View>
  );
}