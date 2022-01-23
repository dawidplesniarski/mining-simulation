import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import GraphScene from "../components/molecules/GraphScene";
import BlocksGraphScene from "../components/molecules/BlocksGraphScene";
import produce from "immer";
import stopIcon from "../assets/stop-button.png";
import playIcon from "../assets/play-button.png";
import resetIcon from "../assets/reset-button.png";

const MainView = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.button`
  border: 0;
  background-color: #fff;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  width: 100%;
  height: 90%;
`;

const BlocksGraphSceneWrapper = styled.div`
  width: 20%;
  height: 100%;
  border-top: 1px solid black;
  border-right: 1px solid black;
`;

const MinersGraphSceneWrapper = styled.div`
  width: 80%;
  height: 100%;
  border-top: 1px solid black;
`;

let networkValue = 2000;
let yPositionBlock = 400;

const generateHash = () => {
  var hash = "";

  for (var i = 0; i < 9; i++) {
    const value = Math.floor(Math.random() * 10 + 1);
    const hashvalue = value.toString();
    hash = hash.concat(hashvalue);
  }
  return hash;
};

const blocks = [
  {
    id: "1",
    type: "input",
    data: {
      label: <>hash: {generateHash()}</>,
    },
    position: { x: 400, y: 200 },
    style: {
      background: "#a2a1c4",
      color: "#333",
      border: "1px solid #222138",
      width: 120,
    },
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    data: "1",
  },
  {
    id: "2",
    type: "input",
    data: {
      label: <>hash: {generateHash()}</>,
    },
    position: { x: 400, y: 300 },
    style: {
      background: "#a2a1c4",
      color: "#333",
      border: "1px solid #222138",
      width: 120,
    },
  },
];

const startingElements = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <>
          <strong>Górnik 1</strong>
          Wartość: 800 Moc obliczeniowa: 500
        </>
      ),
    },
    position: { x: 400, y: 400 },
    actualValue: 0,
    power: 800,
    value: 500,
    style: {
      background: "#a2a1c4",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "e1-2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    label: "e1-3",
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    label: "e1-4",
  },
  {
    id: "2",
    type: "input",
    data: {
      label: (
        <>
          <strong>Górnik 2</strong>
          Wartość: 600 Moc obliczeniowa: 400
        </>
      ),
    },
    position: { x: 700, y: 600 },
    actualValue: 0,
    power: 600,
    value: 400,
    style: {
      background: "#a2a1c4",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "e1-2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    label: "e1-3",
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    label: "e1-4",
  },
];
const colors = [
  "#fdb47e",
  "#bdff7e",
  "#7efdf2",
  "#7ec2fd",
  "#fdb47e",
  "#F5EEF8",
  "#F5B7B1",
  "#D7BDE2",
  "#A9CCE3",
  "#FCF3CF",
  "#FCF3CF",
  "#7DCEA0",
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let nodeValue = 1;
let newId = 2;
let testBlocks = blocks;

const MainPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;
  const [blockElements, setBlockElements] = useState(blocks);
  const [elements, setElements] = useState(startingElements);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setElements(
      produce((elementsCopy) => {
        const newIde =
          Number.parseInt(
            elementsCopy.filter((e) => !e.target)[
              elementsCopy.filter((e) => !e.target).length - 1
            ].id,
            10
          ) + 1;
        const xPosition = getRandomInt(-200, 1000);
        const yPosition = getRandomInt(-200, 1000);
        const randomValue = getRandomInt(10, 25) * 10;
        const randomPower = getRandomInt(1, 6) * 100;
        const Random = Math.random();
        console.log(newIde);
        if (Random > 0.5 || nodeValue < 5) {
          const miner = {
            id: newIde.toString(),
            type: "input",
            value: randomValue,
            data: {
              label: (
                <>
                  <strong>Górnik {newIde} </strong>
                  Wartość: {randomValue}
                  Moc obliczeniowa: {randomPower}
                </>
              ),
            },
            position: { x: xPosition, y: yPosition },
            actualValue: 0,
            power: randomPower,
            style: {
              background: "#a2a1c4",
              color: "#333",
              border: "1px solid #222138",
              width: 180,
            },
          };
          const edge1 = {
            id: `e${newIde}-${newIde + 1}`,
            source: `${newIde}`,
            target: `${newIde + 1}`,
            label: `e${newIde}-${newIde + 1}`,
          };
          const edge2 = {
            id: `e${newIde}-${newIde + 2}`,
            source: `${newIde}`,
            target: `${newIde + 2}`,
            label: `e${newIde}-${newIde + 2}`,
          };
          const edge3 = {
            id: `e${newIde}-${newIde + 3}`,
            source: `${newIde}`,
            target: `${newIde + 3}`,
            label: `e${newIde}-${newIde + 3}`,
          };

          elementsCopy.push(miner);
          elementsCopy.push(edge1);
          elementsCopy.push(edge2);
          elementsCopy.push(edge3);
          if (newIde > 5) {
            for (let i = 1; i < 3; i++) {
              let rId = Math.floor(Math.random * (newIde - 1) + 1);
              let edge4;
              if (newIde > rId) {
                edge4 = {
                  id: `e${rId}-${newIde}`,
                  source: `${rId}`,
                  target: `${newIde}`,
                  label: `e${rId}-${newIde}`,
                };
              } else {
                edge4 = {
                  id: `e${newIde}-${rId}`,
                  source: `${newIde}`,
                  target: `${rId}`,
                  label: `e${newIde}-${rId}`,
                };
              }

              elementsCopy.push(edge4);
            }
          }

          nodeValue++;
        }
        if (Random < 0.5 && nodeValue > 4) {
          const lastNode = elementsCopy.at(-1);
          const nodeQuantity = lastNode.source;

          let cost = 0;
          let ifcost = false;
          elementsCopy.map((el) => {
            el.actualValue += el.power;
            if (ifcost === true) {
              el.value = el.value - 50;
              cost = cost + 1;
              el.data = {
                ...el.data,
                label: (
                  <>
                    <strong>Górnik {el.id} </strong>
                    Wartość: {el.value}
                    Moc obliczeniowa: {el.power}
                  </>
                ),
              };
            }
            if (cost === elementsCopy.length - 1) {
              cost = 0;
              ifcost = false;
            }
            if (el.actualValue >= networkValue) {
              //belements = addBlock(belements);
              //addBlock();
              //newBlocks++;
              ifcost = true;
              el.style = {
                ...el.style,
                background: colors[getRandomInt(0, 11)],
              };
              el.value = el.value + 200;
              el.actualValue = 0;
              el.data = {
                ...el.data,
                label: (
                  <>
                    <strong>Górnik {el.id} </strong>
                    Wartość: {el.value}
                    Moc obliczeniowa: {el.power}
                  </>
                ),
              };
              newId = newId + 1;
              const edge1 = {
                id: `e${newId - 1}-${newId}`,
                source: `${newId - 1}`,
                target: `${newId}`,
                label: `e${newId - 1}-${newId}`,
                data: "1",
              };
              const block = {
                id: newId.toString(),
                type: "input",
                data: {
                  label: <>hash: {generateHash()}</>,
                },
                position: { x: 400, y: yPositionBlock },
                style: {
                  background: "#a2a1c4",
                  color: "#333",
                  border: "1px solid #222138",
                  width: 120,
                },
              };

              yPositionBlock = yPositionBlock + 100;
              testBlocks = [...testBlocks, edge1, block];
              console.log(testBlocks);
            }
            return el;
          });
          for (let i = 1; i < nodeQuantity; i++) {
            var Node = elementsCopy.findIndex(
              (element) => element.id === i.toString()
            );
            if (Node === -1) {
            } else {
              if (elementsCopy[Node].value <= 0) {
                const id = i;
                console.log(id);
                const edge = {
                  id: `e${id - 1}-${id + 1}`,
                  source: `${id - 1}`,
                  target: `${id + 1}`,
                  label: "",
                };
                elementsCopy.splice(Node - 1, 4, edge);
              }
            }
          }
        }
        setBlockElements(testBlocks);
      })
    );

    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <MainView>
      <RowWrapper>
        <BlocksGraphSceneWrapper>
          <BlocksGraphScene
            elements={blockElements}
            setElements={setBlockElements}
          />
        </BlocksGraphSceneWrapper>
        <MinersGraphSceneWrapper>
          <PlayButton
            onClick={() => {
              setIsRunning(!isRunning);
              if (!isRunning) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            <img src={isRunning ? stopIcon : playIcon} alt={"icon"} />
          </PlayButton>
          <PlayButton onClick={()=>{
            setBlockElements(blocks)
            setElements(startingElements)
            newId = 2
            testBlocks = blocks
            yPositionBlock = 400
          }}>
            {" "}
            <img src={resetIcon} alt={"icon"} />
          </PlayButton>
          <GraphScene elements={elements} setElements={setElements} />
        </MinersGraphSceneWrapper>
      </RowWrapper>
    </MainView>
  );
};

export default MainPage;
