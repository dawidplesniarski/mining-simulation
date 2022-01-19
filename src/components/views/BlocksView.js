import React, {useState} from 'react';
import BlocksGraphScene from "../molecules/BlocksGraphScene";
import styled from "styled-components";

const BlocksGraphSceneWrapper = styled.div`
  width: 20%;
  height: 100%;
  border-top: 1px solid black;
  border-right: 1px solid black;
`;

const BlocksView = props => {
    const [blockElements, setBlockElements] = useState([
        {
            id: '1',
            type: 'input',
            data: {
                label: (
                    <>
                        CADB57556454E6
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
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            label: 'e1-2'
        },
        {
            id: '2',
            type: 'input',
            data: {
                label: (
                    <>
                        CLS3343FVAL
                    </>
                ),
            },
            position: {x: 400, y: 300},
            style: {
                background: '#ffcdcd',
                color: '#333',
                border: '1px solid #222138',
                width: 180,
            }
        },
    ]);

    return (
        <BlocksGraphSceneWrapper>
            <BlocksGraphScene elements={blockElements} setElements={setBlockElements}/>
        </BlocksGraphSceneWrapper>
    );
};

export default BlocksView;
