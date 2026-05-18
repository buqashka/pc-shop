"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, Center, Environment } from "@react-three/drei"

const config: Record<string, { scale: number; camPos: [number, number, number]; fov: number; rot: [number, number, number] }> = {
  cpu: { scale: 0.8,  camPos: [2.5, 1.5, 4],   fov: 48, rot: [1.169, 0.175, -0.524] },
  gpu: { scale: 0.01, camPos: [6,   3,   18],  fov: 10, rot: [0, -1.571, 0] },
  mb:  { scale: 0.2,  camPos: [0.1, 7.9, 0.4], fov: 48, rot: [0, 0.2, 0] },
  ram: { scale: 2,    camPos: [2,   1.5, 3.5], fov: 15, rot: [0, 0.524, 0] },
  cooler: { scale: 1.2, camPos: [2.5, 2, 4],   fov: 67, rot: [-0.314, -0.803, 0.175] },
  psu: { scale: 4,    camPos: [2,   1.5, 3.5], fov: 17, rot: [0.087, -1.676, 0.140] },
  ssd: { scale: 0.4,  camPos: [2.5, 1.5, 4.5], fov: 28, rot: [0.524, -0.960, -0.960] },
}

function Model({ path, scale, rot }: { path: string; scale: number; rot: [number, number, number] }) {
  const { scene } = useGLTF(path)
  return <primitive object={scene} scale={scale} rotation={rot} />
}

function PartScene({ slug }: { slug: string }) {
  const cfg = config[slug] ?? { scale: 1, camPos: [2.5, 1.5, 4], fov: 35, rot: [0, 0, 0] }

  return (
    <Canvas camera={{ position: cfg.camPos, fov: cfg.fov }} dpr={[1, 2]} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#555555" />
      <directionalLight position={[5, 8, 4]} intensity={1.2} />
      <directionalLight position={[-4, 3, -3]} intensity={0.8} />
      <Suspense fallback={null}>
        <Center>
          <Model path={`/models/${slug}.glb`} scale={cfg.scale} rot={cfg.rot} />
        </Center>
        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  )
}

export default function Part3D({ slug }: { slug: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <PartScene slug={slug} />
    </div>
  )
}
