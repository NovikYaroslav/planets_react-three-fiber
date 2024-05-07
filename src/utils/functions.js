import { planetsFacts } from '../data/data';
import { FIRST_ELEMENT } from '../data/const';

export function planetExtractor(name) {
  const planetData = planetsFacts.filter((planet) => planet.name === name);
  return planetData[FIRST_ELEMENT];
}
