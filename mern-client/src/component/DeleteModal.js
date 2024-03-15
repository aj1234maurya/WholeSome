import React from "react";

function DeleteModal({ show, handleDelete, deleteId, handleClose, theme }) {
  return (
    <>
      <div
        id="modalBackground"
        className={`modal ${show ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              theme === "dark" ? "dark-modal" : "light-theme"
            }`}
          >
            <div className="modal-header">
              <h5 className="modal-title">Delete</h5>
              <button
                type="button"
                className={`btn-close ${
                  theme === "dark" ? "dark-button" : "light-theme"
                }`}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>Do you want to delete it ?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleDelete(deleteId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
