import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Utility function to generate initials
const getInitials = (fullname) => {
  return `${fullname[0]}`.toUpperCase();
};
const Some = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null);
  const [renameInput, setRenameInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state for mobile screens
  // Create a ref for the new note input field
  const newNoteInputRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const navigate = useNavigate();
  const user = {
    id: userInfo.username,
    firstName: userInfo.fullname,
    lastName: "",
  };
  
  const initials = getInitials(userInfo.fullname);
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(`notes_${user.id}`));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, [user.id]);
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`notes_${user.id}`, JSON.stringify(notes));
    }
  }, [notes, user.id]);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const addNewNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        title: newNoteTitle,
        content: "",
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
      setIsAddingNote(false);
      setSelectedNoteIndex(notes.length);
      setNoteContent("");
    }
  };
  const openNote = (index) => {
    setSelectedNoteIndex(index);
    setNoteContent(notes[index].content);
  };
  const updateNoteContent = (content) => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNoteIndex].content = content;
    setNotes(updatedNotes);
    setNoteContent(content);
  };
  const handleRename = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].title = renameInput;
    setNotes(updatedNotes);
    setIsRenaming(null);
    setIsMenuOpen(null);
  };
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setSelectedNoteIndex(null);
    setIsMenuOpen(null);
  };
  useEffect(() => {
    if (isAddingNote && newNoteInputRef.current) {
      newNoteInputRef.current.focus();
    }
  }, [isAddingNote]);
  const handleLogout = () => {
    localStorage.removeItem(`notes_${user.id}`);
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="flex min-h-screen">
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden p-4 bg-gray-900 text-gray-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-900 p-4 flex flex-col justify-between transition-transform duration-300 transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static z-50`}
      >
        {/* Top Section */}
        <div>
          {/* User Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-700 text-gray-300 rounded-full mr-3">
                <span className="text-lg font-bold">{initials}</span>
              </div>
              <span className="text-sm font-semibold text-gray-300">
                {user.firstName}
              </span>
            </div>
            {/* Button to Add New Note */}
            <button
              className="bg-gray-700 text-gray-300 p-2 rounded hover:bg-gray-600"
              onClick={() => setIsAddingNote(true)}
            >
              <FaPlus />
            </button>
          </div>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full p-2 rounded bg-gray-800 text-gray-300 border-2 border-gray-700 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* My Notes Section */}
          <div className="mt-8">
            <button className="flex items-center justify-between w-full text-sm uppercase text-gray-400 mb-3">
              My Notes
            </button>
            <ul className="space-y-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center hover:bg-gray-800 p-2 rounded cursor-pointer"
                  >
                    {isRenaming === index ? (
                      <input
                        type="text"
                        className="bg-gray-900 text-gray-300 p-2 rounded border-2 border-gray-700 focus:outline-none focus:border-blue-500"
                        value={renameInput}
                        onChange={(e) => setRenameInput(e.target.value)}
                        onBlur={() => handleRename(index)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleRename(index)
                        }
                        autoFocus
                      />
                    ) : (
                      <div onClick={() => openNote(index)} className="flex-1">
                        {note.title}
                      </div>
                    )}
                    <div className="relative">
                      <button
                        className="text-gray-300"
                        onClick={() =>
                          setIsMenuOpen(isMenuOpen === index ? null : index)
                        }
                      >
                        ⋮
                      </button>
                      {isMenuOpen === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-gray-300 rounded shadow-lg">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => {
                              setIsRenaming(index);
                              setRenameInput(note.title);
                            }}
                          >
                            Rename
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => deleteNote(index)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No notes found</li>
              )}
            </ul>
          </div>
          {isAddingNote && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="New note title"
                className="w-full p-2 rounded bg-gray-900 text-gray-300 border-2 border-gray-700 focus:outline-none focus:border-blue-500"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                ref={newNoteInputRef}
              />

              <div className="flex justify-between mt-2">
                <button
                  className="bg-gray-700 text-gray-300 p-2 rounded hover:bg-gray-600"
                  onClick={addNewNote}
                >
                  Add Note
                </button>
                <button
                  className="bg-gray-700 text-gray-300 p-2 rounded hover:bg-gray-600"
                  onClick={() => setIsAddingNote(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Logout Button */}
        <button
          className="flex items-center text-gray-300 text-sm bg-gray-800 hover:bg-red-600 p-2 rounded"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span className="ml-2">Logout</span>
        </button>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6 bg-gray-900">
        <div className="flex-1 flex flex-col bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {selectedNoteIndex !== null ? (
            <>
              <div className="p-4 border-b bg-gray-800">
                <h2 className="text-xl font-semibold text-gray-300">
                  {notes[selectedNoteIndex]?.title}
                </h2>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <textarea
                  className="w-full h-full p-4 bg-gray-900 text-gray-300 rounded-lg resize-none border-2 border-gray-800 focus:outline-none focus:border-gray-500"
                  value={noteContent}
                  onChange={(e) => updateNoteContent(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a note or create a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Some;
