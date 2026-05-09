const fontFiles = require.context('./', false, /\.(ttf|otf|woff|woff2)$/);

const fontList = fontFiles.keys().map((filePath) => {
  const rawName = filePath.replace('./', '').split('.')[0];

  // Safe font name (used internally)
  const safeName = rawName.replace(/[^a-zA-Z0-9]/g, "_");

  const fontUrl = fontFiles(filePath);

  return {
    name: safeName,
    originalName: rawName,
    url: fontUrl,
  };
});

export default fontList;