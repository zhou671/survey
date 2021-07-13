import Rendering from "./Rendering";
import Button from "./Button";
import { useState } from 'react';
import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Survey = ({url, nextseq, userId}) =>{
    const [seqid, setSeqId] = useState(nextseq);
    const object1 = useLoader(OBJLoader, url+"rc1.obj")
    const object2 = useLoader(OBJLoader, url+"rc2.obj")
    const object3 = useLoader(OBJLoader, url+"rc3.obj")
    const onClick = () =>{
        setSeqId(seqid + 1)
    }

    return (
        <div>
            <Rendering object={object1} />
            <Button text="model1" onClick={onClick}/>
            <Rendering object={object2} />
            <Rendering object={object3} />
            <Button text="model2" onClick={onClick}/>
        </div>
    )
}

export default Survey;
