import React, { useEffect, useState } from "react";
import { query, onSnapshot} from "firebase/firestore";
import {ScrollView, StyleSheet, Text, View, Button,TextInput} from "react-native";
import { firestore, collection, addDoc,    MESSAGES, serverTimestamp,} from "./firebase/Config";
import { convertFirebaseTimeStampToJS } from "./helpers/Functions";
export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created) // Convert Firestore timestamp to JavaScript Date object
        };
        tempMessages.push(messageObject);
      });
      setMessages(tempMessages);
    });
    return () => unsubscribe();
  }, []);

  const [newMessage, setNewMessage] = useState("");

  const save = async () => {
    try {
      await addDoc(collection(firestore,MESSAGES), {
        text: newMessage,
        created: serverTimestamp(),
      });
      setNewMessage("");
      console.log("Message saved");
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={(text) => setNewMessage(text)}
        value={newMessage}
      />
      <Button onPress={save} title="Save Message" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
    borderColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
  },
  messageInfo: {
    color: "#999",
    fontSize: 12,
  },
});
