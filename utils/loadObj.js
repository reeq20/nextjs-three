import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const loadGeometry = (url) =>
  new Promise((resolve, reject) =>
    new OBJLoader().load(
      url,
      (object) => {
        resolve(object);
      },
      null,
      () => reject(new Error(`Error`))
    )
  );

export default loadGeometry;
