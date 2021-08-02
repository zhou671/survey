import React from "react";
import Button from "./Button";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei';
import "./styles/rendering.css"

const Rendering = ({object, orbitRef, onClick, model, render}) => {
    const icosaedron = [
        [0.57735026918962576451, -1, -1.5115226281523414610],
        [-1.1547005383792515290,   0, -1.5115226281523414610],
        [0.57735026918962576451,  1, -1.5115226281523414610],
        [-0.93417235896271569645, -1.6180339887498948482, -0.35682208977308993194],
        [1.8683447179254313929,   0,                     -0.35682208977308993194],
        [-0.93417235896271569645,  1.6180339887498948482, -0.35682208977308993194],
        [0.93417235896271569645, -1.6180339887498948482, 0.35682208977308993194],
        [-1.8683447179254313929,   0,                     0.35682208977308993194],
        [0.93417235896271569645,  1.6180339887498948482, 0.35682208977308993194],
        [-0.57735026918962576451, -1, 1.5115226281523414610],
        [1.1547005383792515290,   0, 1.5115226281523414610],
        [-0.57735026918962576451,  1, 1.5115226281523414610]
    ]
    const button = render ? <Button text={model} onClick={onClick}/> : null;
    const lights = [];
    for(const [_, value] of icosaedron.entries()){
        lights.push(<pointLight position={value} intensity={0.1}/>)
    }

    return (
        <div class="float-child">
            <Canvas camera={{position:[0,0,1], fov:60}}>
                <OrbitControls ref={orbitRef} />
                {lights}
                {/* <pointLight position={[10, 10, 10]} intensity={1} /> */}
                <mesh position={[0,0,0]}>
                    <primitive object={object} />
                    <meshPhongMaterial attach="material" color="#ffffff" />
                </mesh>
            </Canvas>
            {button}
        </div>
    )
}

export default Rendering
