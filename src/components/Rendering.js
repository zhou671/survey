import React, {useEffect} from "react";
import Button from "./Button";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei';
import "./styles/rendering.css"
import * as THREE from 'three';

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

    //const new_object = (object.children && object.children.length > 0) ? {...object, children: object.children[0]} : object;
    // var new_object = object
    // console.log(object.children.length)
    // console.log(object.children[0])
    // console.log(object)
    // new_object.children = [new_object.children[0]]
    // console.log(new_object)

    const check_obj = (obj) => {
        return obj;
    } 

    return (
        <div class="float-child">
            <Canvas camera={{position:[0,0,1], fov:60}}>
                <OrbitControls ref={orbitRef} />
                {lights}
                <mesh position={[0,0,0]}>
                    <primitive object={check_obj(object)} />
                    <meshPhongMaterial attach="material" color="#ffffff" />
                </mesh>
            </Canvas>
            {button}
        </div>
    )
}

export default Rendering
