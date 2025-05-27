import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Post {
  id: number;
  title: string;
  body: string;
}


export default function Details() {
  const [list, setList] = useState<Post[]>([]);;
  const [expandedItemId, setExpandedItemId] = useState<number | null>();

  const getData = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

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
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#5354af" }}
        accessibilityRole="header"
        accessibilityLabel="Post details page header"
      >
        Details </Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Pressable accessibilityRole="header" accessibilityLabel={`Post title - ${item.title}`} accessibilityHint="Tap to expand or collapse the post details" onPress={() => toggleExpand(item.id)}>
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
            {expandedItemId === item.id && (
              <Text accessibilityRole="text" accessibilityLabel={`Text for post titled ${item.title} - ${item.body}`} style={styles.body}>{item.body}</Text>
            )}
          </View>
        )}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
});