import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { HeaderComponent } from '../components/NoteComponents'
import { MainComponent } from '../components/NoteComponents'
import realm from "../../store/realm/index"

const AddNoteScreen = (props) => {
    const { navigation } = props;
    const [tempNote, setTempNote] = useState("")

    useEffect(() => {
        const data = realm.objects("Note")
        console.log(data)
    })

    const getCurrentDate = () => {
        const months = [
            "January", "February", "March",
            "April", "Mei", "June", "July",
            "August", "September", "October",
            "November", "December"
        ]
        const currentDate = new Date()
        const dateOnly = currentDate.getDate()
        const monthOnly = currentDate.getMonth()
        const yearOnly = currentDate.getFullYear()

        return months[monthOnly] + " " + dateOnly + " " + yearOnly
    }

    const saveNote = (newNote) => {
        const allData = realm.objects("Note")
        const dataLength = allData.length
        let lastIdFromRealm = 0

        if (dataLength !== 0) {
            lastIdFromRealm = allData[dataLength - 1].id
        }

        const countId = lastIdFromRealm === 0 ? 1 : lastIdFromRealm + 1

        if (newNote !== "") {
            realm.write(() => {
                realm.create("Note", {
                    id: countId,
                    note: newNote,
                    date: new Date().toString()
                })
            })
            alert("Succesfully save your note!")
            navigation.navigate("Notelist")
            const data = realm.objects("Note")
            console.log(data)
            setTempNote("")
        } else {
            alert("Empty note!")
        }
    }

    return (
        <View style={styles.mainContainer}>
            <HeaderComponent
                title="create"
                onPress={() => saveNote(tempNote)}
            />
            <MainComponent
                date={getCurrentDate()}
                onChangeText={(text)=>setTempNote(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})

export default AddNoteScreen