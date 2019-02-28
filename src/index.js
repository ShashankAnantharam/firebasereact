import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import *  as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDwasymb0jOlZLhrc6tTZG4mtawSUH5PTs",
    authDomain: "trysharedpref.firebaseapp.com",
    databaseURL: "https://trysharedpref.firebaseio.com",
    projectId: "trysharedpref",
    storageBucket: "trysharedpref.appspot.com",
    messagingSenderId: "403672131828"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
