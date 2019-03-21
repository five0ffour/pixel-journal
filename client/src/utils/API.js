import axios from "axios";

export default {
  // Gets all journal
  getJournal: function() {
    return axios.get("/api/journal");
  },
  // Gets the journal entry with the given id
  getJournalEntry: function(id) {
    return axios.get("/api/journal/entry/" + id);
  },
  // Deletes the journal entry with the given id
  deleteJournalEntry: function(id) {
    return axios.delete("/api/journal/" + id);
  },
  // Saves a journal to the database
  saveJournal: function(journalData) {
    return axios.post("/api/journal", journalData);
  }
};
