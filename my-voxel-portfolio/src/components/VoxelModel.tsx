import React, { useMemo } from 'react';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import type { VoxelData } from '../types';
import type { ThreeElements } from '@react-three/fiber';

// Fix for JSX intrinsic elements errors in React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

interface VoxelModelProps {
  data: VoxelData[];
  scale?: number;
  position?: [number, number, number];
}

const VoxelModel: React.FC<VoxelModelProps> = ({ data, scale = 1, position = [0, 0, 0] }) => {
  const voxels = useMemo(() => {
    return data.map((v, i) => (
      <Box 
        key={i} 
        position={[v.pos[0] * scale, v.pos[1] * scale, v.pos[2] * scale]} 
        args={[scale, scale, scale]}
      >
        <meshStandardMaterial color={v.color} />
        {/* Black edges to enhance the voxel look */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(scale, scale, scale)]} />
          <lineBasicMaterial color="black" />
        </lineSegments>
      </Box>
    ));
  }, [data, scale]);

  return <group position={position}>{voxels}</group>;
};

export default VoxelModel;