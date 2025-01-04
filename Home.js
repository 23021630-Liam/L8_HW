import React, {useState} from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from "./Data";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    opacityStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 5,
        backgroundColor: 'white',
    },
    textStyle: {
        fontSize: 20,
        flex: 1,
        textAlign: 'left',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        textAlign: 'center',
    },
    headerText: {
        fontSize: 21,
        marginLeft: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginLeft: 10,
        resizeMode: 'contain',
    },
});

const Home = ({ navigation }) => {

    const [mydata, setMydata] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if(datastr!=null){
            let jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        } else {
            setMydata(datasource);
        }
    };

    getData();

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={[styles.opacityStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                onPress={() => {
                    navigation.navigate("Edit", {
                        index: index,
                        book: item.book,
                        image: item.img,
                        ISBN: item.ISBN,
                        copies: item.copies,
                    });
                }}
            >
                {/* Text Section */}
                <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={[styles.textStyle, { fontWeight: 'bold', textAlign: 'left' }]}>{item.book}</Text>
                    <Text style={[styles.textStyle, { textAlign: 'left' }]}>
                        {item.ISBN}
                    </Text>
                    <Text style={[styles.textStyle, { textAlign: 'left' }]}>
                        {item.copies}
                    </Text>
                </View>

                {/* Image Section */}
                <Image source={{ uri: item.img }} style={styles.imageStyle} />
            </TouchableOpacity>
        );
    };


    return (
        <View>
            <StatusBar/>
            <Button title='Add book' onPress={()=>{
                let datastr = JSON.stringify(mydata)
                navigation.navigate("Add", {datastring:datastr});
            }}/>
            <SectionList
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
                        {title}
                    </Text>
                )}
            />
        </View>
    );
};

export default Home;
