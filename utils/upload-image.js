const dotenv = require("dotenv");

dotenv.config({ path: `./.env` });

module.exports = (file) => {
  const formData = new FormData();

  const blob = new Blob([file.buffer], { type: file.mimetype });

  formData.append("imagedata", blob, {
    filename: file.originalname,
  });
  formData.append("access_token", process.env.GYAZO_ACCESS_TOKEN);

  return fetch("https://upload.gyazo.com/api/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((data) => data.url)
    .catch((error) => {
      this.catchError(error.status);
      throw new Error(error.statusText);
    });
};
