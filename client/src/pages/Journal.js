import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API.js";

class Journal extends Component {
  // Initialize this.state.journal as an empty array
  state = {
    journal: [],
    title: "",
  };

  // Add code here to get journal entries from the database and save them to this.state.journal
   componentDidMount = () => {
     
    this.loadJournal();

  }

  handleInputChange = (event) => {
    // event.target.name:   name of the field
    // event.target.value:  values entered
    this.setState ({
      [event.target.name]: event.target.value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();  
    API.saveJournal({
      title: this.state.title,
    })
      .then(() => {
        this.loadJournal()
      })
      .catch(err => console.log(err));
  }

  loadJournal = () => {
    API.getJournal().then((res) => {
      console.log(res);
      this.setState({journal : res.data});
    });
  }

  handleDelete = (id) => {
    API.deleteJournalEntry(id).then(() => {
      this.loadJournal()
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Pixel Journal</h1>
            </Jumbotron>
            <form>
              <Input name="title" val={this.state.title} placeholder="Title (required)" onChange={this.handleInputChange}/>
              <FormBtn onClick={this.handleFormSubmit}>Submit Entry</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Journal Entries</h1>
            </Jumbotron>
            {this.state.journal.length ? (
              <List>
                {this.state.journal.map(journal => (
                  <ListItem key={journal._id}>
                    <a href={"/journal/" + journal._id}>
                      <strong>
                        {journal.title}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => {this.handleDelete(journal._id)}}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Journal;
