import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";
import React from "react";

const firstFiveContact = contacts.slice(0, 5);
const remainingContact = contacts.slice(5);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contactOneToFive: firstFiveContact,
      remainingContact: remainingContact,
    };
  }

  //iteration 3
  handleAddRandomContact = () => {
    const copyContactOneToFive = [...this.state.contactOneToFive];
    const randomContact = Math.floor(Math.random() * remainingContact.length);
    copyContactOneToFive.push(remainingContact[randomContact]);

    this.setState({
      contactOneToFive: copyContactOneToFive,
    });
  };

  //iteration 4.1
  handleSortByPopularity = () => {
    const popularitySort = this.state.contactOneToFive.sort(
      (a, b) => b.popularity - a.popularity
    );
    this.setState({
      ...this.state,
      contactOneToFive: popularitySort,
    });
  };

  //iteration 4.2
  handleSortByName = () => {
    const nameSort = this.state.contactOneToFive.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.setState({
      ...this.state,
      contactOneToFive: nameSort,
    });
  };

  //iteration 5
  handleDeleteArtist = (id) => {
    const updateContact = this.state.contactOneToFive.filter((contact) => {
      return contact.id !== id;
    });

    this.setState({
      contactOneToFive: updateContact,
    });
  };

  render() {
    //iteration one
    const topFive = this.state.contactOneToFive.map((contact) => {
      return (
        <tr key={contact.id}>
          <td>
            <img className="photo" src={contact.pictureUrl} />
          </td>
          <td>{contact.name}</td>
          <td>{contact.popularity}</td>

          {/* iteration 2 */}
          <td>{contact.wonOscar ? "🏆" : " "}</td>
          <td>{contact.wonEmmy ? "⭐" : " "}</td>
          <button onClick={() => this.handleDeleteArtist(contact.id)}>
            Delete
          </button>
        </tr>
      );
    });
    return (
      <div className="App">
        <button onClick={this.handleAddRandomContact}>
          Add random contact
        </button>
        <button onClick={this.handleSortByPopularity}>
          Sort by popularity
        </button>
        <button onClick={this.handleSortByName}>Sort by name</button>
        <table style={{ width: "100%" }}>
          <caption>IronContact</caption>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{topFive}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
