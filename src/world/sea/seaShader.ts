/**
 * De "shader" van de zee: een klein programmaatje dat op de grafische chip van je iPhone draait.
 * - De vertex shader laat het water op en neer golven.
 * - De fragment shader kleurt elk vlakje, met platte facetten voor de low-poly look.
 */
export const seaVertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;

  void main() {
    vec3 p = position;
    p.y += sin(p.x * 0.55 + uTime * 0.9) * 0.16
         + cos(p.z * 0.48 + uTime * 0.7) * 0.16
         + sin((p.x + p.z) * 0.9 + uTime * 1.3) * 0.07;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const seaFragmentShader = /* glsl */ `
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform vec3 uLightDir;
  varying vec3 vWorld;

  void main() {
    // De richting van elk vlakje, berekend uit zijn buren: zo krijg je scherpe facetten
    vec3 normal = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (normal.y < 0.0) normal = -normal;
    float light = clamp(dot(normal, normalize(uLightDir)), 0.0, 1.0);

    // Ondiep (lichter) water dicht bij het midden, dieper water verder weg
    float depth = smoothstep(5.0, 45.0, length(vWorld.xz));
    vec3 color = mix(uShallow, uDeep, depth) * (0.62 + 0.5 * light);

    // Een glinstering op de vlakjes die naar de zon kijken
    color += vec3(1.0) * pow(light, 28.0) * 0.22;

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;
