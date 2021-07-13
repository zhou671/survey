import React from "react";
import { Canvas, useThree} from "@react-three/fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect } from "react";

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);

            controls.minDistance = 1;
            controls.maxDistance = 20;
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

const Rendering = ({object}) => {
    return (
        <div style={{width: 300, height:300}}>
            <Canvas camera={{position:[0,0,1], fov:60}}>
                <CameraController />
                <mesh position={[0,0,0]}>
                    <primitive object={object} />
                </mesh>
            </Canvas>
        </div>
    )
}

export default Rendering
