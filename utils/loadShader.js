const loadShader = (url) =>
  new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = handleReadyStateChange;
    xhr.open("GET", url);
    xhr.send(null);

    function handleReadyStateChange() {
      if (+xhr.readyState === 4) {
        const status = +xhr.status;

        if ((200 <= status && status < 300) || status === 304) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Could not load file (${status}): ${url}`));
        }
      }
    }
  });

export default loadShader;
