import React, { useState } from "react";
import "./FontModal.css";
import fontList from "../fonts/00fontList";

function FontModal({ onClose, onSelect, text, selectedFonts }) {

  const [search, setSearch] = useState("");

  // ✅ Filter fonts
  const filteredFonts = fontList.filter((font) =>
    font.originalName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <h2>Select Fonts</h2>

        {/* ✅ Search Box */}
        <input
          type="text"
          placeholder="Search font..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-search"
        />

        <div
          className="grid"
          style={{
            gridTemplateColumns:
              (text || "").length > 15 ? "1fr" : "repeat(2, 1fr)"
          }}
        >
          {filteredFonts.map((font, index) => {

            const isSelected = selectedFonts.includes(font.name);

            return (
              <div
                key={font.name}
                className={`card ${isSelected ? "selected" : ""}`}
                style={{ fontFamily: font.name }}
                onClick={() => onSelect(font.name)}
              >

                <span className="card-number">{index + 1}</span>

                <p className="preview-text">
                  {text || "Preview Text"}
                </p>

                <span className="font-name-label">
                  {font.originalName}
                </span>

                {isSelected && <span className="tick">✔</span>}
              </div>
            );
          })}
        </div>

        {selectedFonts.length > 0 && (
          <button className="close-btn" onClick={onClose}>
            Done ({selectedFonts.length})
          </button>
        )}

      </div>
    </div>
  );
}

export default FontModal;