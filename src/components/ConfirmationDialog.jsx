import React from "react";
import "../styles/ConfirmationDialog.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <div>
        <button onClick={onConfirm} className="confirm-btn">
          Yes
        </button>
        <button onClick={onCancel} className="cancel-btn">
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
