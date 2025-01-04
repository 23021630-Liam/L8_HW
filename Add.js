import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
// import { datasource } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [book, setbook] = useState('');
    const [ISBN, setISBN] = useState('');
    const [copies, setcopies] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    }

    const handleAdd = () => {
        if (!book.trim() || !ISBN || !copies || !imageUrl.trim()) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            Alert.alert('Error', 'Please enter a valid image URL.');
            return;
        }

        // Directly find the appropriate section index based on book name
        const sectionIndex = datasource.findIndex((section) => section.title === book);

        if (sectionIndex === -1) {
            Alert.alert('Error', 'Invalid book selection.');
            return;
        }

        datasource[sectionIndex].data.push({ book, img: imageUrl, ISBN, copies });
        Alert.alert('Success', `${book} has been added.`);
        navigation.navigate('Home');
    };

    return (
        <View style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Book Name:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    placeholder="Enter book name"
                    value={book}
                    onChangeText={setbook}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Image URL:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChangeText={setImageUrl}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>ISBN:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    placeholder="Enter ISBN"
                    value={ISBN}
                    onChangeText={setISBN}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Number of Copies:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    placeholder="Enter number of copies"
                    value={copies}
                    onChangeText={setcopies}
                />
            </View>

            <Button title='Submit'
                    onPress={()=>{
                        let mydata = JSON.parse(route.params.datastring);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                    }
                    }
            />
        </View>
    );
};

export default Add;
