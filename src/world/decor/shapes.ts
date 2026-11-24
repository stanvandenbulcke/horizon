import {
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry,
  TorusGeometry,
} from 'three';

/**
 * Vormen die veel decorstukken delen, één keer gemaakt. Elk stuk schaalt ze naar zijn eigen maat.
 * Weinig hoekjes (segmenten) = chunky low-poly look én zuinig voor je iPhone.
 */
export const shapes = {
  box: new BoxGeometry(1, 1, 1),
  /** Cilinder van 1 hoog en 1 breed, met 7 hoekjes */
  cylinder: new CylinderGeometry(0.5, 0.5, 1, 7),
  /** Iets smaller bovenaan, zoals een boomstam of toren */
  taperedCylinder: new CylinderGeometry(0.4, 0.5, 1, 7),
  /** Kegel met 4 kanten: een piramide (dak, palmblad) */
  pyramid: new ConeGeometry(0.5, 1, 4),
  cone: new ConeGeometry(0.5, 1, 7),
  rock: new DodecahedronGeometry(0.5, 0),
  /** Een bol met straal 1, rond genoeg voor schattige wezentjes */
  sphere: new IcosahedronGeometry(1, 2),
  /** Een ring (sjaal, kroon) met straal 1 */
  ring: new TorusGeometry(1, 0.2, 6, 16),
};
