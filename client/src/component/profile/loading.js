import React from 'react';
import ContentLoader from 'react-content-loader';
export default function loading() {
  return (
    <ContentLoader>
      {/* Only SVG shapes */}
      <rect x='0' y='20' rx='3' ry='3' width='350' height='5' />
      <rect x='0' y='35' rx='3' ry='3' width='380' height='5' />
      <rect x='0' y='50' rx='3' ry='3' width='201' height='5' />

      <rect x='0' y='80' rx='3' ry='3' width='350' height='5' />
      <rect x='0' y='95' rx='3' ry='3' width='380' height='5' />
      <rect x='0' y='110' rx='3' ry='3' width='201' height='5' />
    </ContentLoader>
  );
}
