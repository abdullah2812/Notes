import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export const HeaderComponent = (props) => {
    const { title } = props;
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                style={styles.button}
                {...props}
            >
                <Icon
                    name="check"
                    type="font-awesome-5"
                    size={18}
                />
            </TouchableOpacity>
        </View>
    )
}

export const MainComponent = (props) => {
    const { date } = props;
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.date}>
                {/* Date : {getCurrentDate()} */}
                {date}
            </Text>
            <TextInput
                multiline
                placeholder='Write here'
                placeholderTextColor="black"
                style={styles.input}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    headerContainer: {
        padding: 8,
        backgroundColor: "moccasin",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 20,
        padding: 8,
        fontWeight: "bold"
    },
    button: {
        padding: 8
    },
    date: {
        color: "black",
        paddingTop: 16,
        paddingLeft: 16
    },
    input: {
        color: "black",
        fontSize: 16,
        paddingRight: 16,
        paddingLeft: 16
    }
})