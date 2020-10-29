import { TextureLoader } from "three";

const loadTexture = (url) => {
  return new Promise((resolve) => {
    new TextureLoader().load(url, (texture) => {
      resolve(texture);
    });
  });
};

export default loadTexture;
