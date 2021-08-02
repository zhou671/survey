import Rendering from "./Rendering";
import Button from "./Button";
import { useState, useCallback } from 'react';
import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { registerCamera } from './cameraSync';
import './styles/survey.css'

const Survey = ({url, nextseq, userId}) =>{
    const [seqid, setSeqId] = useState(nextseq);
    const [orbitRef, setOrbitRef] = useState(undefined);
    const orbitRefHook = useCallback((camera) => {
        setOrbitRef({ current: camera });
        registerCamera(camera);
    }, []);
    const object1 = useLoader(OBJLoader, url+"rc1.obj")
    const object2 = useLoader(OBJLoader, url+"rc2.obj")
    const object3 = useLoader(OBJLoader, url+"rc3.obj")
    const onClick = () =>{
        setSeqId(seqid + 1)
    }

    return (
        <main id="main-holder">
            <h1 id="login-header">Survey</h1>
            <div class="float-container">
                
                <Rendering object={object1} orbitRef={orbitRefHook} onClick={onClick} model={"model1"} render={true}/>
                {/* <Button text="model1" onClick={onClick}/> */}
                <Rendering object={object2} orbitRef={orbitRefHook} render={false}/>
                <Rendering object={object3} orbitRef={orbitRefHook} onClick={onClick} model={"model2"} render={true}/>
                {/* <Button text="model2" onClick={onClick}/> */}
            </div>
        </main>
    )
}

export default Survey;
