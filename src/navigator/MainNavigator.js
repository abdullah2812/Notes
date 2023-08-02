import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import NoteListScreen from "../screens/NoteListScreen"
import AddNoteScreen from "../screens/AddNoteScreen"
import EditNoteScreen from "../screens/EditNoteScreen"
import Check from "../screens/check"
const Stack = createStackNavigator()

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Notelist">
                <Stack.Screen
                    name="Notelist"
                    component={NoteListScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="createNote"
                    component={AddNoteScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="EditNote"
                    component={EditNoteScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="check"
                    component={Check}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator