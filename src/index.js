import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import List from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var data = [
    {
        name: 'Amy',
        age: 37,
        grade: 1
    },
    {
        name: 'John',
        age: 19,
        grade: 2
    },
    {
        name: 'Stuff',
        age: 25,
        grade: 3
    },
    {
        name: 'Hoke',
        age: 11,
        grade: 4
    },
    {
        name: 'Tom',
        age: 44,
        grade: 5
    },
    {
        name: 'Johny',
        age: 27,
        grade: 6
    },
    {
        name: 'Alis',
        age: 29,
        grade: 7
    },
    {
        name: 'Tomas',
        age: 41,
        grade: 4
    },
    {
        name: '李燕',
        age: 41,
        grade: 4
    }
];

var empty = [];

ReactDOM.render(<List students={data} />, document.getElementById('root'));
registerServiceWorker();
