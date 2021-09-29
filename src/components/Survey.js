import Rendering from "./Rendering";
import Button from "./Button";
import { useState, useCallback } from 'react';
import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { registerCamera } from './cameraSync';
import './styles/survey.css'
import { render } from "@testing-library/react";

const axios = require('axios');


const Survey = ({url, nextseq, userId, fileNames, choiceurl, uniqueurl}) =>{
    const [nameid, setNameId] = useState(0);
    const [seqid, setSeqId] = useState(nextseq);
    const [orbitRef, setOrbitRef] = useState(undefined);
    const [isEnd, setIsEnd] = useState(false);
    const orbitRefHook = useCallback((camera) => {
        setOrbitRef({ current: camera });
        registerCamera(camera);
    }, []);
    const [uniqueCode, setUniqueCode] = useState('0');
    var names = [];
    fileNames.forEach((element, idx, arr) => {
        if(element === "null"){
            if (idx != 0){
                console.log(arr[idx - 1])
            }
            if (idx != fileNames.length - 1){
                console.log(arr[idx + 1])
            }
        }
        names.push(url+element+"-ori.obj")
        names.push(url+element+"-1.obj")
        names.push(url+element+"-2.obj")
    });

    const objs = useLoader(OBJLoader, names);

    const selection = (num) => {
        return () => {
            axios.get(choiceurl+userId+"/"+seqid+"/"+num+"/"+fileNames[nameid])
            setSeqId(seqid + 1)
            setNameId(nameid + 1)
            console.log(nameid)
            console.log(objs.length)
            if(nameid * 3 == objs.length - 3) {
                axios.get(uniqueurl+userId).then((res) =>{
                    var jsonresp = res.data
                    console.log(jsonresp.uniqueCode)
                    setUniqueCode(jsonresp.uniqueCode)
                    setIsEnd(true)
                })
            } else {
                objs[3 * nameid + 0].children.splice(-1)
                objs[3 * nameid + 1].children.splice(-1)
                objs[3 * nameid + 2].children.splice(-1)
            }
        }
    }

    const renderContent = () => {
        if(isEnd){
            return <p> You have completed all the tasks! Your unique code is {uniqueCode}. Thanks for taking this survey! However, please refresh the page to check if you have completed the survey. </p>
                
        } else {
            return [
                <Rendering object={objs[3 * nameid + 1]} orbitRef={orbitRefHook} onClick={selection("1")} model={"Left shape"} render={true}/>,
                <Rendering object={objs[3 * nameid + 0]} orbitRef={orbitRefHook} onClick={selection("3")} model={"Choose none"} render={true}/>,
                <Rendering object={objs[3 * nameid + 2]} orbitRef={orbitRefHook} onClick={selection("2")} model={"Right shape"} render={true}/>
            ]
        }
    }

    return (
        <main id="main-holder">
            <h1 id="login-header">Survey</h1>
            <p>Please click the left or right shape button that you think which is more similar to the middle one.</p>
            <p>In the case of failing to load shape or it is too close to determine, please click "Choose none"</p>
            <div class="float-container">
                {renderContent()}
                {/* <Rendering object={objs[nameid * 3 + 1]} orbitRef={orbitRefHook} onClick={onClick} model={"model1"} render={true}/>
                <Rendering object={objs[nameid * 3]} orbitRef={orbitRefHook} render={false}/>
                <Rendering object={objs[nameid * 3 + 2]} orbitRef={orbitRefHook} onClick={onClick} model={"model2"} render={true}/> */}
            </div>
            
        </main>
    )
}

export default Survey;
