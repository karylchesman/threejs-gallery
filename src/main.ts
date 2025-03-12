import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SpotLight,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from "three";
import "./index.css";
import { FACTIONS } from "./config/factions";

const app = document.querySelector<HTMLDivElement>("#app")!;

const textureLoader = new TextureLoader();

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
app.appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const root_box = new Object3D();
scene.add(root_box);

const factions = Object.values(FACTIONS);
for (let i = 0; i < factions.length; i++) {
  const current_faction = factions[i];

  const texture = textureLoader.load(current_faction.bg);
  texture.colorSpace = SRGBColorSpace;

  const faction_box = new Object3D();
  faction_box.rotation.y = i * ((2 * Math.PI) / factions.length);
  root_box.add(faction_box);

  const border = new Mesh(
    new BoxGeometry(3.2, 2.2, 0.09),
    new MeshStandardMaterial({ color: 0x202020 })
  );
  border.position.z = -4;
  faction_box.add(border);

  const faction_img = new Mesh(
    new BoxGeometry(3, 2, 0.1),
    new MeshStandardMaterial({ map: texture })
  );
  faction_img.position.z = -4;
  faction_box.add(faction_img);
}

const spot_light = new SpotLight(0xffffff, 100.0, 10.0, 0.65, 0.5);
spot_light.position.set(0, 5, 0);
spot_light.target.position.set(0, 0.5, -5);
scene.add(spot_light);
scene.add(spot_light.target);
function animate() {
  root_box.rotation.y += 0.002;
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
