// components/EditableField.js
import { useState } from "react";

const EditableField = ({
  value,
  placeholder = "Ingresar",
  onSave,
  type = "text",
  loading = false,
  color = "#0d6efd",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleSave = async () => {
    if (inputValue !== value) {
      await onSave(inputValue);
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      type={type}
      className="form-control"
      style={{
        maxWidth: "200px",
        border: "none",
        outline: "none",
        borderRadius: "4px",
      }}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => e.key === "Enter" && handleSave()}
      disabled={loading}
      autoFocus
    />
  ) : (
    <span
      style={{
        // color: value ? "orange" : color,
        cursor: value ? "default" : "pointer",
      }}
      onClick={() => !loading && setIsEditing(true)}
    >
      {value || placeholder}
    </span>
  );
};

export default EditableField;
