import React, { useState, useEffect } from "react";
import FontModal from "./components/FontModal";
import fontList from "./fonts/00fontList";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [selectedFonts, setSelectedFonts] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getFormat = (url) => {
    if (url.endsWith(".otf")) return "opentype";
    if (url.endsWith(".ttf")) return "truetype";
    if (url.endsWith(".woff")) return "woff";
    if (url.endsWith(".woff2")) return "woff2";
    return "truetype";
  };

  useEffect(() => {
    const loadFonts = async () => {
      for (const font of fontList) {
        try {
          const format = getFormat(font.url);

          const fontFace = new FontFace(
            font.name,
            `url("${font.url}") format("${format}")`
          );

          await fontFace.load();
          document.fonts.add(fontFace);
        } catch (err) {
          console.error(`Error loading font ${font.name}:`, err);
        }
      }

      setLoading(false);
    };

    loadFonts();
  }, []);
useEffect(() => {
  if (window.keyman) {
    window.keyman.init({
      attachType: 'auto'
    });
    window.keyman.addKeyboards('@tamil99'); 
  }
}, []);
  // ✅ TOGGLE SELECT
  const handleFontSelect = (fontName) => {
    setSelectedFonts((prev) =>
      prev.includes(fontName)
        ? prev.filter((f) => f !== fontName)
        : [...prev, fontName]
    );
  };

  return (
    <div className="app">
      <h1>Font Picker</h1>

     <input
        className="input-box"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Here..."
      />

      <button onClick={() => setShowModal(true)}>
        Select Fonts
      </button>

      {/* ✅ SHOW SELECTED FONTS */}
<div className="selected-fonts">
  <h2>Selected Fonts</h2>

  {selectedFonts.length === 0 && <p>No fonts selected</p>}

  <div className="selected-grid">
    {selectedFonts.map((font, index) => (
      <div key={index} className="selected-card">
        
        {/* Preview */}
        <p className="selected-preview" style={{ fontFamily: font }}>
          {text || "Preview Text"}
        </p>

        {/* Font name */}
        <p className="selected-name">
          {font}
        </p>

        {/* Remove button */}
        <button
          className="remove-btn"
          onClick={() =>
            setSelectedFonts((prev) =>
              prev.filter((f) => f !== font)
            )
          }
        >
          ✖
        </button>

      </div>
    ))}
  </div>
</div>

      {showModal && (
        <FontModal
          text={text}
          loading={loading}
          selectedFonts={selectedFonts}
          onClose={() => setShowModal(false)}
          onSelect={handleFontSelect}
        />
      )}
    </div>
  );
}

export default App;