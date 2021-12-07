import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import GraphScene from "./components/molecules/GraphScene";
import Button from "./components/atoms/Button/Button";

const MainView = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  margin: 30px;
`;

const networkValue = 2000;
const networkCost = 100;

const OverviewFlow = () => {
    const [elements, setElements] = useState([
        {
            id: '1',
            type: 'input',
            data: {
                label: (
                    <>
                        <strong>Górnik 1</strong>
                        Wartość: 800
                        Moc obliczeniowa: 500
                    </>
                ),
            },
            position: {x: 400, y: 200},
            actualValue: 0,
            power: 800,
            value: 500,
            style: {
                background: '#a2a1c4',
                color: '#333',
                border: '1px solid #222138',
                width: 180,
            }
        },
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            label: 'e1-2'
        },
        {
            id: 'e1-3',
            source: '1',
            target: '3',
            label: 'e1-3'
        },
        {
            id: 'e1-4',
            source: '1',
            target: '4',
            label: 'e1-4'
        }
    ]);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Dodawanie górnika
     * Dodawanie górnika działa dodaje do tablicy elements nowego górnika wraz z węzłem  łączącym go z poprzednim
     * górnikiem.
     * Tablica elements przechowuje zarówno górników jak i węzły pomiędzy nimi stąd też konieczność filtrowania elementów
     */
    const addMiner = () => {
        const newId = Number.parseInt(elements.filter(e => !e.target)[elements.filter(e => !e.target).length - 1].id, 10) + 1;
        // const xPosition = elements.filter(e => !e.target)[elements.filter(e => !e.target).length - 1].position.x + 70;
        // const yPosition = elements.filter(e => !e.target)[elements.filter(e => !e.target).length - 1].position.y + 70;
        const xPosition = getRandomInt(-500, 500);
        const yPosition = getRandomInt(-500, 500);
        const randomValue = getRandomInt(5, 20) * 10;
        const randomPower = getRandomInt(1, 6) * 100;
        const miner = {
            id: newId.toString(),
            type: 'input',
            value: randomValue,
            data: {
                label: (
                    <>
                        <strong>Górnik {newId} </strong>
                        Wartość: {randomValue}
                        Moc obliczeniowa: {randomPower}
                    </>
                ),
            },
            position: {x: xPosition, y: yPosition},
            actualValue: 0,
            power: randomPower,
            style: {
                background: '#a2a1c4',
                color: '#333',
                border: '1px solid #222138',
                width: 180,
            }
        }
        const edge1 = {
            id: `e${newId}-${newId + 1}`,
            source: `${newId}`,
            target: `${newId + 1}`,
            label: `e${newId}-${newId + 1}`
        };
        const edge2 = {
            id: `e${newId}-${newId + 2}`,
            source: `${newId}`,
            target: `${newId + 2}`,
            label: `e${newId}-${newId + 2}`
        };
        const edge3 = {
            id: `e${newId}-${newId + 3}`,
            source: `${newId}`,
            target: `${newId + 3}`,
            label: `e${newId}-${newId + 3}`
        };

        setElements(oldArr => [...oldArr, miner, edge1, edge2, edge3]);
    }

    /*
    Usuwa górnika o podanym ID i tworzy węzeł między poprzednim a następnym górnikiem
     */
    const deleteMiner = (id) => {
        console.log('delete func call');
        setElements(elements.filter(e => e.id !== id.toString()));
        const edge = {
            id: `e${id - 1}-${id + 1}`,
            source: `${id - 1}`,
            target: `${id + 1}`,
            label: ''
        };
        setElements(oldArr => [...oldArr, edge]);
    }
    const updateMiners = () => {
        const lastNode = elements.slice(-2, -1)
        const nodeQuantity = lastNode[0].id
        let cost = 0;
        let ifcost = false;
        setElements((els) => els.map((el) => {
            el.actualValue += el.power
            if (ifcost === true) {
                el.value = el.value - 50;
                cost = cost + 1;
                el.data = {
                    ...el.data, label: (
                        <>
                            <strong>Górnik {el.id} </strong>
                            Wartość: {el.value}
                            Moc obliczeniowa: {el.power}
                        </>
                    )
                }
            }
            if (cost === elements.length - 1) {
                cost = 0;
                ifcost = false;
            }
            if (el.actualValue >= networkValue) {
                ifcost = true;
                el.style = {...el.style, background: 'red'};
                el.value = el.value + 200
                el.actualValue = 0;
                el.data = {
                    ...el.data, label: (
                        <>
                            <strong>Górnik {el.id} </strong>
                            Wartość: {el.value}
                            Moc obliczeniowa: {el.power}
                        </>
                    )
                }

            }
            return el;
        }))

        for (let i = 1; i < nodeQuantity; i++) {
            if (elements[i].value <= 0) {
                const id = i;
                const preEdge = `e${id - 1}-${id}`
                const afterEdge = `e${id}-${id + 1}`
                setElements(elements.filter(e => e.id !== id.toString()));
                setElements(elements.filter(e => e.id !== preEdge))
                setElements(elements.filter(e => e.id !== afterEdge))
                const edge = {
                    id: `e${id - 1}-${id + 1}`,
                    source: `${id - 1}`,
                    target: `${id + 1}`,
                    label: ''
                };
                setElements(oldArr => [...oldArr, edge]);
            }
        }
        elements.forEach(el => {
            if (el.value <= 0) {
                deleteMiner(el.id);
            }
        })
        console.log(elements)
    }

    return (
        <MainView>
            <ButtonWrapper>
                <Button onClick={() => addMiner()}>
                    Dodaj
                </Button>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button onClick={() => deleteMiner(3)}>
                    Usuń
                </Button>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button onClick={() => updateMiners()}>
                    Aktualizuj
                </Button>
            </ButtonWrapper>
            <GraphScene elements={elements} setElements={setElements}/>
        </MainView>
    );
};

export default OverviewFlow;