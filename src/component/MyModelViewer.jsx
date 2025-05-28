import { Canvas } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Stage, OrbitControls, useGLTF, Environment } from '@react-three/drei'


function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function AutoLightViewer(props) {
  const containerRef = useRef(null);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenActive(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        // setIsFullscreenActive(true); // Handled by event listener
      } catch (err) {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      }
    } else {
      if (document.exitFullscreen) {
        try {
          await document.exitFullscreen();
          // setIsFullscreenActive(false); // Handled by event listener
        } catch (err) {
          console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`);
        }
      }
    }
  };

  // SVG Icon for entering fullscreen
  const FullscreenEnterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
  );

  // SVG Icon for exiting fullscreen
  const FullscreenExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
    </svg>
  );

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'black' }}>
      {/* แสดง Canvas */}
      <Canvas shadows camera={{ position: [0, 0, 5] }} style={{height: '100%', width: '100%'  }}>
        <Environment preset={props.currentPreset} background />
        <Stage environment={null} intensity={1.5} adjustCamera shadows={false}>
          {props.modelUrl && <Model url={props.modelUrl} />} {/* Render Model only if modelUrl is set */}
        </Stage>
        <OrbitControls makeDefault /> {/* makeDefault ensures these controls are used by default */}
      </Canvas>
      <button
        onClick={toggleFullscreen}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '8px 12px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000 // Ensure button is on top
        }}
      >
        {isFullscreenActive ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
      </button>
    </div>
  )
}
