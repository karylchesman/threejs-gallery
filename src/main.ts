import {
  BoxGeometry,
  CircleGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SpotLight,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";
import "./index.css";
import { FACTIONS } from "./config/factions";
import { Reflector } from "three/examples/jsm/Addons.js";
import caretLeft from "./assets/left.png";
import caretRight from "./assets/right.png";

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

const left_texture = textureLoader.load(caretLeft);
const right_texture = textureLoader.load(caretRight);

const factions = Object.values(FACTIONS);
for (let i = 0; i < factions.length; i++) {
  const current_faction = factions[i];

  const texture = textureLoader.load(current_faction.bg);
  texture.colorSpace = SRGBColorSpace;

  const faction_box = new Object3D();
  faction_box.rotation.y = i * ((2 * Math.PI) / factions.length);
  faction_box.name = `Faction-Box-${i}`;
  root_box.add(faction_box);

  const border = new Mesh(
    new BoxGeometry(3, 2.2, 0.005),
    new MeshStandardMaterial({ color: 0x202020 })
  );
  border.position.z = -4;
  border.name = `Faction-Box-Border-${i}`;
  faction_box.add(border);

  const faction_img = new Mesh(
    new BoxGeometry(2.8, 2, 0.01),
    new MeshStandardMaterial({ map: texture })
  );
  faction_img.position.z = -4;
  faction_img.name = `Faction-Box-Image-${i}`;
  faction_box.add(faction_img);

  const left_button = new Mesh(
    new BoxGeometry(0.3, 0.3, 0.01),
    new MeshStandardMaterial({ map: left_texture, transparent: true })
  );
  left_button.position.set(-1.8, 0, -4);
  left_button.name = `Faction-Box-Left`;
  faction_box.add(left_button);

  const right_button = new Mesh(
    new BoxGeometry(0.3, 0.3, 0.01),
    new MeshStandardMaterial({ map: right_texture, transparent: true })
  );
  right_button.position.set(1.8, 0, -4);
  right_button.name = `Faction-Box-Right`;
  faction_box.add(right_button);
}

const spot_light = new SpotLight(0xffffff, 100.0, 10.0, 0.65, 0.5);
spot_light.position.set(0, 5, 0);
spot_light.target.position.set(0, 0.5, -5);
scene.add(spot_light);
scene.add(spot_light.target);

const mirror = new Reflector(new CircleGeometry(10), {
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
  color: 0x303030,
});
mirror.position.y = -1.1;
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

/**
 * @param direction 1 for right, -1 for left
 */
function rotateGallery(direction: 1 | -1) {
  root_box.rotateY(
    direction *
      /* 
      If the minus signal is not passed bellow, then the side of the rotation 
      will be inverted in relation to the function params definition
      */
      -((2 * Math.PI) / factions.length)
  );
}

function animate() {
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  mirror.getRenderTarget().setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("click", (event) => {
  const ray_caster = new Raycaster();
  const mouse_ndc = new Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  ray_caster.setFromCamera(mouse_ndc, camera);
  const intersections = ray_caster.intersectObject(root_box, true);
  if (intersections.length > 0) {
    if (intersections[0].object.name === "Faction-Box-Left") {
      rotateGallery(-1);
    }
    if (intersections[0].object.name === "Faction-Box-Right") {
      rotateGallery(1);
    }
  }
});
