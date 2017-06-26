import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import List from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var data = [
    {
        name: 'John1',
        age: 37,
        grade: 1
    },
    {
        name: 'John2',
        age: 19,
        grade: 2
    },
    {
        name: 'John3',
        age: 25,
        grade: 3
    },
    {
        name: 'John4',
        age: 11,
        grade: 4
    },
    {
        name: 'John5',
        age: 44,
        grade: 5
    },
    {
        name: 'John6',
        age: 27,
        grade: 6
    },
    {
        name: 'John7',
        age: 29,
        grade: 7
    },
    {
        name: 'John8',
        age: 41,
        grade: 4
    }
];

ReactDOM.render(<List students={data} />, document.getElementById('root'));
registerServiceWorker();
