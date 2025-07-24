/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useRef, useState, useEffect, memo, useMemo } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import {
  useFBO,
  Image,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import { easing } from 'maath'

export default function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {},
  imageUrl,
  children
}) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens
  const rawOverrides =
    mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps

  const modeProps = rawOverrides

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Enhanced lighting for better glass effects */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={0.8} />
      
      <Wrapper modeProps={modeProps}>
        {imageUrl && <BackgroundImage url={imageUrl} />}
        {children}
      </Wrapper>
    </Canvas>
  )
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  fallbackGeometry,
  ...props
}) {
  const ref = useRef()
  const buffer = useFBO()
  const { viewport: vp } = useThree()
  const [scene] = useState(() => new THREE.Scene())
  const geoWidthRef = useRef(1)
  
  // Use fallback geometry for now since we don't have 3D models
  const nodes = {}

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry || fallbackGeometry
    if (geo) {
      geo.computeBoundingBox()
      geoWidthRef.current =
        geo.boundingBox.max.x - geo.boundingBox.min.x || 1
    } else if (fallbackGeometry) {
      fallbackGeometry.computeBoundingBox()
      geoWidthRef.current =
        fallbackGeometry.boundingBox.max.x - fallbackGeometry.boundingBox.min.x || 1
    }
  }, [nodes, geometryKey, fallbackGeometry])

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state
    const v = viewport.getCurrentViewport(camera, [0, 0, 15])

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta)

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9
      const desired = maxWorld / geoWidthRef.current
      ref.current.scale.setScalar(Math.min(0.15, desired))
    }

    gl.setRenderTarget(buffer)
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    // Dark background for bars theme
    gl.setClearColor(0x0a0a0a, 0.8)
  })

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps

  // Use provided geometry or fallback
  const geometry = nodes[geometryKey]?.geometry || fallbackGeometry

  // If no geometry is available, don't render anything
  if (!geometry) {
    return null
  }

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  )
})

function Lens({ modeProps, ...p }) {
  // Fallback cylinder geometry
  const fallbackGeometry = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.2, 32), [])
  
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      fallbackGeometry={fallbackGeometry}
      {...p}
    />
  )
}

function Cube({ modeProps, ...p }) {
  // Fallback cube geometry
  const fallbackGeometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), [])
  
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      fallbackGeometry={fallbackGeometry}
      {...p}
    />
  )
}

function Bar({ modeProps = {}, ...p }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  }

  // Fallback bar geometry - make it wider and flatter for button-like appearance
  const fallbackGeometry = useMemo(() => new THREE.BoxGeometry(6, 1.2, 0.5), [])

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      fallbackGeometry={fallbackGeometry}
      {...p}
    />
  )
}

function BackgroundImage({ url }) {
  const { height } = useThree((s) => s.viewport)
  
  return (
    <Image
      position={[0, 0, 0]}
      scale={[6, height * 0.8, 1]}
      url={url}
    />
  )
}