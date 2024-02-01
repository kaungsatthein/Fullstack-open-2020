import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import axios from "axios";
import services from "./services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null); // Define the notification state

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // Function to show notifications
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Notification disappears after 5 seconds
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      services.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showNotification(`Deleted ${personToDelete.name}`, "success"); // Show success notification
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        services
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            showNotification(
              `Updated ${updatedPerson.name}'s number`,
              "success"
            ); // Show success notification
          })
          .catch((error) => {
            console.error("Error updating person", error);
            showNotification("Failed to update person", "error"); // Show error notification
          });
      }
    } else {
      axios
        .post("http://localhost:3001/persons", {
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${response.data.name}`, "success"); // Show success notification
        })
        .catch((error) => {
          console.error("Error adding person", error);
          showNotification("Failed to add person", "error"); // Show error notification
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <div
          style={{
            backgroundColor: notification.type === "error" ? "red" : "green",
            color: "white",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {notification.message}
        </div>
      )}
      <Filter setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
