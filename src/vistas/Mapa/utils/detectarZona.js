import { point } from '@turf/helpers';
import distance from '@turf/distance';

export function detectarZonaPorRadio(lat, lng, zonas) {
  const punto = point([lng, lat]);
  

  for (const zona of zonas) {
    const centro = point([zona.longitud, zona.latitud]); // centro de la zona
    const distancia = distance(punto, centro, { units: 'meters' });

    if (distancia <= zona.radio) {
      return zona; // está dentro de esta zona
    }
  }

  return null; // no está dentro de ninguna zona
}
