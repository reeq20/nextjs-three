import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const loadGeometry = (url) =>
  new Promise((resolve, reject) =>
    new OBJLoader().load(
      url,
      (group) => {
        const geometries = {};

        for (const { name, geometry } of group.children) {
          geometries[name] = geometry;
        }
        resolve(geometries);
      },
      null,
      () => reject(new Error(`Error`))
    )
  );

export default loadGeometry;
