import axios from "axios";

export default {
  // Gets all journal
  getJournal: function() {
    const accessString = localStorage.getItem("Bearer");
    return axios.get("/api/journal", {
      headers: { Authorization: "Bearer " + accessString }
    });
  },
  // Gets the journal entry with the given id
  getJournalEntry: function(id) {
    const accessString = localStorage.getItem("Bearer");
    return axios.get("/api/journal/entry/" + id, {
      headers: { Authorization: "Bearer " + accessString }
    });
  },
  // Deletes the journal entry with the given id
  deleteJournalEntry: function(id) {
    const accessString = localStorage.getItem("Bearer");
    return axios.delete("/api/journal/" + id, {
      headers: { Authorization: "Bearer " + accessString }
    });
  },
  // Saves a journal to the database
  saveJournal: function(journalData) {
    const accessString = localStorage.getItem("Bearer");
    return axios.post("/api/journal", journalData, {
      headers: { Authorization: "Bearer " + accessString }
    });
  },
  getUser: async function() {
    const accessString = localStorage.getItem("Bearer");
    return await axios.get("/api/user", {
      headers: { Authorization: "Bearer " + accessString }
    });
  }
};
