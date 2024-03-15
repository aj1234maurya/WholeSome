import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import NavBar from "./Navbar";
import MangaModal from "./MangaModal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";

import { FaPlus } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

function Home() {
  const [mangaData, setMangaData] = useState([]);
  const [selectedMangaId, setSelectedMangaId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const notify = () => toast("Added!");
  const notify2 = () => toast("Delete Success!");
  const notify3 = () => toast("Edit Success!");

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/viewlist", {
        withCredentials: true,
      });
      setMangaData(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  }

  function handleClickDelete(id) {
    setShow(true);
    setDeleteId(id);
  }

  function handleClose() {
    setShow(false);
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/delete/${id}`,
        { withCredentials: true }
      );
      setMangaData(mangaData.filter((item) => item._id !== id));
      setShow(false);
      if (response.status === 204) {
        notify2();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(id) {
    console.log("Edit button clicked for ID:", id);
    setSelectedMangaId(id);
    setIsModalOpen(true);
    const selectedManga = mangaData.find((item) => item._id === id);
    setModalData(selectedManga);
  }

  function handleMangaAdded(newManga) {
    setMangaData([...mangaData, newManga]);
  }

  function handleModalClose() {
    setIsModalOpen(false);
    setSelectedMangaId(null);
    setModalData(null);
  }

  async function handleModalSubmit(formData) {
    try {
      let response;
      if (selectedMangaId) {
        response = await axios.put(
          `http://localhost:5000/api/edit/${selectedMangaId}`,
          formData,
          { withCredentials: true }
        );
        if (response.status === 200) {
          notify3();
        }
      } else {
        response = await axios.post(
          "http://localhost:5000/api/addmanga",
          formData,
          { withCredentials: true }
        );
        handleMangaAdded(response.data);
        if (response.status === 201) {
          console.log(response.status);
          notify();
        }
      }
      handleModalClose();
      fetchData();
      setModalData(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        className={` homeDiv ${
          theme === "dark" ? "dark-theme" : "light-theme"
        } `}
      >
        {" "}
        <NavBar />
        <DeleteModal
          handleClose={handleClose}
          show={show}
          deleteId={deleteId}
          handleDelete={handleDelete}
          theme={theme}
        />
        <MangaModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          mangaData={modalData}
          theme={theme}
        />
        <div
          className={`tableContainer ${
            theme === "dark" ? "dark-theme" : "light-theme"
          }`}
        >
          <div className="addBtn">
            <button
              type="button"
              id="modalBtn"
              className={theme === "dark" ? "dark-theme" : "light-theme"}
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus size={"15px"} /> <h6>Add</h6>
            </button>
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th
                  className={` leftSide ${
                    theme === "dark" ? "dark-theme" : "light-theme"
                  } `}
                >
                  Name
                </th>
                <th
                  className={` textCenter ${
                    theme === "dark" ? "dark-theme" : "light-theme"
                  } `}
                >
                  Chapter
                </th>
                <th
                  className={` textCenter ${
                    theme === "dark" ? "dark-theme" : "light-theme"
                  } `}
                >
                  Link
                </th>

                <th
                  className={` textCenter ${
                    theme === "dark" ? "dark-theme" : "light-theme"
                  } `}
                  colSpan={2}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mangaData.map((list) => (
                <tr key={list._id}>
                  <td
                    className={` leftSide ${
                      theme === "dark" ? "dark-theme" : "light-theme"
                    } `}
                  >
                    {list.manga_name}
                  </td>

                  <td
                    className={` textCenter ${
                      theme === "dark" ? "dark-theme" : "light-theme"
                    } `}
                  >
                    {list.manga_chapter}
                  </td>
                  <td
                    className={` textCenter ${
                      theme === "dark" ? "dark-theme" : "light-theme"
                    } `}
                  >
                    <a
                      href={list.manga_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        theme === "dark" ? "dark-anchor" : "light-theme"
                      }
                    >
                      <FaExternalLinkAlt size={"15px"} />
                    </a>
                  </td>
                  <td
                    className={` textCenter ${
                      theme === "dark" ? "dark-theme" : "light-theme"
                    } `}
                  >
                    <a href="#" onClick={() => handleEdit(list._id)}>
                      <CiEdit color="blue" size={"20px"} />
                    </a>
                  </td>
                  <td
                    className={` textCenter ${
                      theme === "dark" ? "dark-theme" : "light-theme"
                    } `}
                  >
                    <a href="#" onClick={() => handleClickDelete(list._id)}>
                      <MdDelete color="red" size={"20px"} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
