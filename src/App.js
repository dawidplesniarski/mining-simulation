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


const OverviewFlow = () => {
    const [elements, setElements] = useState([
        {
            id: '1',
            type: 'input',
            data: {
                label: (
                    <>
                        <strong>Górnik 1 </strong>
                        Wartość: 500
                    </>
                ),
            },
            position: {x: 400, y: 200},
            style: {
                background: '#a2a1c4',
                color: '#333',
                border: '1px solid #222138',
                width: 180,
            }
        },
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
        const xPosition = elements.filter(e => !e.target)[elements.filter(e => !e.target).length - 1].position.x + 70;
        const yPosition = elements.filter(e => !e.target)[elements.filter(e => !e.target).length - 1].position.y + 70;
        const miner = {
            id: newId.toString(),
            type: 'input',
            data: {
                label: (
                    <>
                        <strong>Górnik {newId} </strong>
                        Wartość: {getRandomInt(0, 500)}
                    </>
                ),
            },
            position: {x: xPosition, y: yPosition},
            style: {
                background: '#a2a1c4',
                color: '#333',
                border: '1px solid #222138',
                width: 180,
            }
        }
        const edge = {
            id: `e${elements.filter(e => !e.target)[elements.filter(e => !e.target).length - 1].id}-${newId}`,
            source: `${elements.filter(e => !e.target)[elements.filter(e => !e.target).length - 1].id}`,
            target: `${newId}`,
            label: ''
        };

        setElements(oldArr => [...oldArr, miner, edge]);
    }

    /*
    Usuwa górnika o podanym ID i tworzy węzeł między poprzednim a następnym górnikiem
     */
    const deleteMiner = (id) => {
        setElements(elements.filter( e => e.id !== id.toString() ));
        const edge = {
            id: `e${id - 1}-${id + 1}`,
            source: `${id - 1}`,
            target: `${id + 1}`,
            label: ''
        };
        setElements(oldArr => [...oldArr, edge]);
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
            <GraphScene elements={elements} setElements={setElements}/>
        </MainView>
    );
};

export default OverviewFlow;