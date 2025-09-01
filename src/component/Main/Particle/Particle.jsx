import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#222');
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Points
    const particleCount = 300; // 점 개수
    const positions = [];
    for (let i = 0; i < particleCount; i++) {
      positions.push((Math.random() - 0.5) * 6); // x
      positions.push((Math.random() - 0.5) * 6); // y
      positions.push((Math.random() - 0.5) * 6); // z
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02 // 점 크기
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse move 이벤트
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      targetRotation.current.x = y * 0.3; // 마우스 반응 강도 조절
      targetRotation.current.y = x * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // 부드럽게 마우스 회전 따라가기
      points.rotation.x += (targetRotation.current.x - points.rotation.x) * 0.05;
      points.rotation.y += (targetRotation.current.y - points.rotation.y) * 0.05;

      // 기본 회전
      points.rotation.x += 0.0005;
      points.rotation.y += 0.001;

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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      // renderer.domElement 제거는 mountRef.current에서
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };

  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
