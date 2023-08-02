import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Icon } from "react-native-elements"
import { CheckBox } from "react-native-elements"
import realm from "../../store/realm"
import { FlatList } from 'react-native-gesture-handler'

const NoteListScreen = (props) => {
    const { route, navigation } = props;
    const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [searchText, setSearchText] = useState("")

    const dateFormat = (date) => {
        const months = [
            "January", "February", "March",
            "April", "Mei", "June", "July",
            "August", "September", "October",
            "November", "December"
        ]
        const noteDate = new Date(date)
        const dateOnly = noteDate.getDate()
        const monthOnly = noteDate.getMonth()
        const yearOnly = noteDate.getFullYear()

        return months[monthOnly] + " " + dateOnly + " " + yearOnly
    }

    const SearchData = (value) => {
        const dataFromDatabase = realm.objects("Note").sorted("date", true)

        const searchedData = dataFromDatabase.filter((item) => {
            const itemData = item.note.toLowerCase();
            const valueData = value.toLowerCase()
            return itemData.indexOf(valueData) > -1
        })

        setData(searchedData)
        setSearchText(value)
    }

    const setCheckBox = (id, status) => {
        const newData = data.map((item) => {
            if (item.id === id) {
                item.checkedStatus = !status
            }
            return item
        })
        setData(newData)
    }

    const removeNotes = () => {
        const checkTrue = [];

        data.forEach((item) => {
            if (item.checkedStatus) {
                checkTrue.push(item.id)
            }
        })
        if (checkTrue.length !== 0) {
            realm.write(() => {
                for (i = 0; i < checkTrue.length; i++) {
                    const data = realm.objects("Note").filtered(`id = ${checkTrue[i]}`)
                    realm.delete(data)
                }
            })
            const collect = realm.objects("Note").sorted("date", true)
            const newData = collect.map((item) => {
                item.checkedStatus = false;
                return item
            })
            setData(newData)
            setIsEdit(false)
        } else {
            alert("Nothing to remove!")
        }
    }

    useEffect(() => {
        const noteListPage = navigation.addListener(
            "focus", () => {
                const notes = realm.objects("Note")
                const sortedNotesByDate = notes.sorted('date', true)
                setData(sortedNotesByDate)
                const newData = sortedNotesByDate.map((item) => {
                    item.checkedStatus = false
                    return item
                })
                console.log(newData)
                setData(newData)
                setSearchText("")
            }
        )
        // check = (realm.objects("Note"))
        // setCheckData(check)

        return noteListPage
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    Notes
                </Text>
                {
                    data.length !== 0 ?
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => setIsEdit(!isEdit)}
                        >
                            {
                                isEdit ?
                                    <Text>Cancel</Text>
                                    :
                                    <Text>Edit</Text>
                            }

                        </TouchableOpacity>
                        :
                        null
                }
            </View>
            <FlatList
                contentContainerStyle={styles.flatListConainer}
                data={data}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={styles.mainDataContainer}
                        >
                            <TouchableOpacity
                                style={styles.noteButton}
                                onPress={() => navigation.navigate("EditNote", { note_id: item.id })}
                            // onPress={() => navigation.navigate("check")}
                            >
                                <View style={styles.noteContainer}>
                                    <Text style={styles.noteText}>
                                        {item.note}
                                    </Text>
                                </View>
                                <Text style={styles.dateText}>
                                    {dateFormat(item.date)}
                                </Text>
                            </TouchableOpacity>
                            {
                                isEdit ?
                                    <CheckBox
                                        size={20}
                                        containerStyle={styles.checkBox}
                                        onPress={() => setCheckBox(item.id, item.checkedStatus)}
                                        checked={item.checkedStatus}
                                    />
                                    :
                                    null
                            }
                        </View>
                    )
                }}
                ListHeaderComponent={
                    <View style={styles.searchBox}>
                        <Icon
                            name="search"
                            type="font-awesome"
                            size={18}
                            style={styles.searchIcon}
                            color="grey"
                        />
                        <TextInput
                            placeholder='search here'
                            style={styles.searchInput}
                            onChangeText={(text) => SearchData(text)}
                            value={searchText}
                        />
                    </View>
                }
                keyboardShouldPersistTaps={"handled"}
                ListEmptyComponent={
                    <View style={{ alignItems: "center" }}>
                        <Text>
                            No item in this category
                        </Text>
                    </View>
                }
            />
            {
                isEdit ?
                    null :
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate("createNote")}
                        >
                            <Icon
                                name="plus"
                                type="antdesign"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
            }

            {
                isEdit ?
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeNotes()}
                    >
                        <Icon
                            name="delete"
                            type='antdesign'
                            size={20}
                            color="white"
                        />
                        <View style={styles.containerDeleteText}>
                            <Text style={styles.deleteText}>
                                Delete
                            </Text>
                        </View>
                    </TouchableOpacity>
                    :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    headerContainer: {
        padding: 8,
        backgroundColor: "moccasin",
        justifyContent: "center",
        alignItems: "center"
    },
    headerTitle: {
        fontSize: 20,
        padding: 8,
        fontWeight: "bold"
    },
    buttonContainer: {
        position: "absolute",
        bottom: 16,
        right: 16
    },
    addButton: {
        backgroundColor: "pink",
        padding: 16,
        borderRadius: 100
    },
    flatListConainer: {
        padding: 8
    },
    mainDataContainer: {
        margin: 8,
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    noteButton: {
        flex: 1,
        margin: 8,
        padding: 8
    },
    noteContainer: {
        maxHeight: 40,
        paddingBottom: 10
    },
    noteText: {
        textAlign: "justify",
        color: "black"
    },
    dateText: {
        fontSize: 12,
        color: "black"
    },
    searchBox: {
        flexDirection: "row",
        borderWidth: 1,
        margin: 8,
        marginTop: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: "center"
    },
    searchIcon: {
        padding: 8,
        paddingRight: 0
    },
    searchInput: {
        height: 30,
        padding: 8,
        flex: 1
    },
    checkBox: {
        paddingLeft: 0,
        paddingRight: 0
    },
    editButton: {
        position: "absolute",
        padding: 16,
        right: 8
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    containerDeleteText: {
        marginLeft: 8
    },
    deleteText: {
        color: "white"
    }
})

export default NoteListScreen