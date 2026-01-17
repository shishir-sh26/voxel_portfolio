import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { VoxelData } from '../types';

interface VoxelModelProps {
  data: VoxelData[];
  scale?: number;
  position?: [number, number, number];
}

const VoxelModel: React.FC<VoxelModelProps> = ({ data, scale = 1, position = [0, 0, 0] }) => {
  const voxels = useMemo(() => {
    return data.map((v, i) => (
      <mesh 
        key={i} 
        position={[v.pos[0] * scale, v.pos[1] * scale, v.pos[2] * scale]}
      >
        <boxGeometry args={[scale, scale, scale]} />
        <meshStandardMaterial color={v.color} />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(scale, scale, scale)]} />
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
    ));
  }, [data, scale]);

  return <group position={position}>{voxels}</group>;
};

export default VoxelModel;