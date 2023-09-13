import React, { useContext } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { Avatar, Button, Icon, ListItem } from "react-native-elements";

import users from "../data/users";
import { UsersContext } from "../context/UsersContext";

export default props => {

  useContext(UsersContext)

  function confirmUserDeletion(user) {
    Alert.alert("Excluir Usuário", "Deseja excluir o usuário?", [
      {
        text: "Sim",
        onPress() {
          console.warn("delete " + user.id);
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function getAction(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
        />
      </>
    );
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem bottomDivider>
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getAction(user)}
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={users}
        renderItem={getUserItem}
      />
    </View>
  );
}
