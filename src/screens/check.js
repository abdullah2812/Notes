import { View, Text } from 'react-native'
import React from 'react'

const Check = (props) => {
    const { navigation } = props
    return (
        <View>
            <Text>check</Text>
        </View>
    )
}

export default Check
    //   <FlatList
    //         contentContainerStyle={styles.flatListContainer}
    //         data={data}
    //         keyExtractor={(item) => item.id}
    //         showsVerticalScrollIndicator={false}
    //         renderItem={({ item }) => {
    //             return (
    //                 <View style={styles.mainDataContainer}>
    //                     <TouchableOpacity
    //                         style={styles.noteButton}
    //                     >
    //                         <View style={styles.noteContainer}>
    //                             <Text style={styles.noteText}>
    //                                 {item.note}
    //                             </Text>
    //                         </View>
    //                         <Text style={styles.dateText}>
    //                             {item.date}
    //                         </Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             )
    //         }}
    //     />