import React, {useEffect, useState} from 'react';

const MinersCollection = props  => {
    const [values, setValues] = useState([232, 452, 331, 459 , 467, 643, 310]);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomizeValues = () => {
        setValues([
            getRandomInt(300, 600),
            getRandomInt(300, 600),
            getRandomInt(300, 600),
            getRandomInt(300, 600),
            getRandomInt(300, 600),
            getRandomInt(300, 600),
            getRandomInt(300, 600),
        ]);
    };

    return (
        [
            {
                id: '1',
                type: 'input',
                data: {
                    label: (
                        <>
                            <strong>Górnik 1 </strong>
                            Wartość: {values[0]}
                        </>
                    ),
                },
                position: { x: 400, y: 200 },
                style: {
                    background: '#a2a1c4',
                    color: '#333',
                    border: '1px solid #222138',
                    width: 180,
                }
            },
            {
                id: '2',
                data: {
                    label: (
                        <>
                            <strong>Górnik 2 </strong>
                            Wartość: {values[1]}
                        </>
                    ),
                },
                position: { x: 300, y: 300 },
                style: {
                    background: '#fff0bc',
                    color: '#333',
                    border: '1px solid #222138',
                    width: 180,
                }
            },
            {
                id: '3',
                data: {
                    label: (
                        <>
                            <strong>Górnik  3 </strong>
                            Wartość: {values[2]}
                        </>
                    ),
                },
                position: { x: 400, y: 400 },
                style: {
                    background: '#bdffc0',
                    color: '#333',
                    border: '1px solid #222138',
                    width: 180,
                }
            },
            {
                id: '4',
                data: {
                    label: (
                        <>
                            <strong>Górnik  4 </strong>
                            Wartość: {values[3]}
                        </>
                    ),
                },
                position: { x: 600, y: 500 },
                style: {
                    background: '#e8bdff',
                    color: '#333',
                    border: '1px solid #222138',
                    width: 180,
                }
            },
            {
                id: '5',
                data: {
                    label: (
                        <>
                            <strong>Górnik  5 </strong>
                            Wartość: {values[4]}
                        </>
                    ),
                },
                position: { x: 810, y: 300 },
                style: {
                    background: '#ffb3b3',
                    color: '#333',
                    border: '1px solid #222138',
                    width: 180,
                }
            },
            {
                id: '6',
                data: {
                    label: (
                        <>
                            <strong>Górnik  6 </strong>
                            Wartość: {values[5]}
                        </>
                    ),
                },
                position: { x: 660, y: 120 },
                style: {
                    background: '#ffe3ce',
                    color: '#333',
                    border: '1px solid #222138',
                    width: 180,
                }
            },
            {
                id: '7',
                data: {
                    label: (
                        <>
                            <strong>Górnik  7 </strong>
                            Wartość: {values[6]}
                        </>
                    ),
                },
                position: { x: 550, y: 300 },
                style: {
                    background: '#c9fffe',
                    color: '#333',
                    border: '1px solid #222138',
                    width: 180,
                }
            },
            { id: 'e1-2', source: '1', target: '2', label: '' },
            { id: 'e2-3', source: '2', target: '3', label: '' },
            { id: 'e3-4', source: '3', target: '4', label: '' },
            { id: 'e5-4', source: '5', target: '4', label: '' },
            { id: 'e5-6', source: '5', target: '6', label: '' },
            { id: 'e6-1', source: '6', target: '1', label: '' },
            { id: 'e1-7', source: '1', target: '7', label: '' },
            { id: 'e2-7', source: '2', target: '7', label: '' },
            { id: 'e3-7', source: '3', target: '7', label: '' },
            { id: 'e4-7', source: '4', target: '7', label: '' },
            { id: 'e5-7', source: '5', target: '7', label: '' },
            { id: 'e6-7', source: '6', target: '7', label: '' },
        ]
    )
};

export default MinersCollection;