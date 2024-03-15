import React, { useState, useEffect } from "react";

function MangaModal({ isOpen, onClose, onSubmit, mangaData, theme }) {
  const [formData, setFormData] = useState({
    manga_name: "",
    manga_link: "",
    manga_chapter: "",
  });

  useEffect(() => {
    if (mangaData) {
      setFormData(mangaData);
    } else {
      setFormData({
        manga_name: "",
        manga_link: "",
        manga_chapter: "",
      });
    }
  }, [mangaData]);

  useEffect(() => {
    const form = document.querySelector(".needs-validation");
    if (!isOpen) {
      setFormData({
        manga_name: "",
        manga_link: "",
        manga_chapter: "",
      });
      form.classList.remove("was-validated");
    }
  }, [isOpen]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = document.querySelector(".needs-validation");
    if (
      !formData.manga_name ||
      !formData.manga_link ||
      !formData.manga_chapter ||
      isNaN(formData.manga_chapter)
    ) {
      form.classList.add("was-validated");
      return;
    } else {
      form.classList.remove("was-validated");
    }
    onSubmit(formData);
    setFormData({ manga_name: "", manga_link: "", manga_chapter: "" });
  }

  return (
    <>
      <div
        id="modalBackground"
        className={isOpen ? "modal fade show" : "modal fade"}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              theme === "dark" ? "dark-modal " : "light-theme"
            }`}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                {mangaData ? "Edit" : "Add"} Details
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit}
                className="needs-validation "
                noValidate
              >
                <div className="formDiv form-group ">
                  <label className="form-label" htmlFor="label1">
                    Manga Name
                  </label>
                  <input
                    id="label1"
                    required
                    className={`form-control ${
                      theme === "dark" ? "input-dark" : "input-light"
                    }`}
                    type="text"
                    value={formData.manga_name}
                    name="manga_name"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">This field is required</div>
                </div>
                <div className="formDiv form-group">
                  <label HtmlFor="label2" className="form-label">
                    Website Link
                  </label>
                  <input
                    id="label2"
                    required
                    className={`form-control ${
                      theme === "dark" ? "input-dark" : "input-light"
                    }`}
                    type="url"
                    value={formData.manga_link}
                    name="manga_link"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">This field is required</div>
                </div>
                <div className="formDiv form-group ">
                  <label className="form-label" HtmlFor="label3">
                    Total Chapter (Numbers Only)
                  </label>
                  <input
                    id="label3"
                    required
                    className={`form-control ${
                      theme === "dark" ? "input-dark" : "input-light"
                    }`}
                    type="number"
                    value={formData.manga_chapter}
                    name="manga_chapter"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {formData.manga_chapter
                      ? "Only Numbers"
                      : "This field is required"}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {mangaData ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MangaModal;
