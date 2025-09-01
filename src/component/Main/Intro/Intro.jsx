import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Intro.css';

function Intro() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('rgb(243, 239, 230)');

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        camera.position.z = 3;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Geometry (정20면체)
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transparent: true,
        opacity: 0.25,
        transmission: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 0.9,
        side: THREE.DoubleSide,
        });
        const icosahedron = new THREE.Mesh(geometry, material);
        scene.add(icosahedron);

        // Edges (금속 모서리)
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x999999, linewidth: 1 });
        const line = new THREE.LineSegments(edges, lineMaterial);
        scene.add(line);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = false;

        // 마우스 기반 회전 변수
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2; // -1 ~ 1
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        const animate = () => {
        requestAnimationFrame(animate);

        // 자동 회전
        icosahedron.rotation.y += 0.002;
        icosahedron.rotation.x += 0.001;

        // 마우스 이동에 따라 조금씩 회전
        icosahedron.rotation.y += mouseX * 0.01;
        icosahedron.rotation.x += mouseY * 0.01;

        line.rotation.copy(icosahedron.rotation);

        controls.update();
        renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <div className="main-intro-wrap">
                <div className='main-line-div'>
                    <div className='hori-line'></div>
                    <div className='ver-ti-line'></div>
                </div>
                <div className='main-four-div'>
                    <div className='main-four-section left-top-div'>
                        <div className='over-flow-div'>
                            <p className='int-large-text'>김근영</p>
                        </div>
                    </div>
                    <div className='main-four-section right-top-div'>
                        <div className='over-flow-div'>
                            <p className='int-large-text'>FRONTEND</p>
                        </div>                        
                    </div>
                    <div className='main-four-section left-bottom-div'>
                        <div className='over-flow-div'>
                            <p className='int-large-text'>PORTFOLIO</p>
                        </div>                          
                    </div>
                    <div className='main-four-section right-bottom-div'>
                        <div className='sprinkle-text-wrapper'>
                            <p className='sparkle-text'></p>
                            <p className='context-text-wrap'></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Three.js 캔버스 */}
            <div className='main-three-bottom' ref={mountRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default Intro;
