import React, { useState, useEffect } from 'react';
import {Text, Button, View, TextInput} from 'react-native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type FirebaseUserState = FirebaseAuthTypes.User | null;

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('success!');
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    if (loading) {
        return <Text>Loading</Text>;
    } else {
        return (
            <View>
                <TextInput
                    value={email}
                    placeholder="Email"
                    onChangeText = {setEmail}
                />
                <TextInput
                    value={password}
                    placeholder="Password"
                    onChangeText ={setPassword}
                />
                <Button title="Sign in" onPress={handleSubmit} />
            </View>
        );
    }
};

const Dashboard = () => {
    const handleSignOut = () => {
        auth().signOut();
    };

    return (
        <View>
            <Text>Hello!</Text>
            <Button title="Sign Out" onPress={handleSignOut}/>
        </View>
    );
};

const App = () : JSX.Element => {
    const [currentUser, setUser] = useState<FirebaseUserState>(null);
    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            setUser(user);
        });
    });

    return currentUser ? <Dashboard /> : <SignIn />;
};

export default App;