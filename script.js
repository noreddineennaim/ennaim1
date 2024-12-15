function addEvent(event) {
    event.preventDefault();  // Prevent form submission

    let name = document.getElementById("nom1").value;
    let date = document.getElementById("date1").value;
    let location = document.getElementById("location1").value;
    let type = document.getElementById("type1").value;

    if (name && date && location && type) {
        const newEvent = {
            name: name,
            date: date,
            location: location,
            type: type
        };

        // Get the events from localStorage or initialize it as an empty array
        let events = JSON.parse(localStorage.getItem("events")) || [];

        // Add the new event to the events array
        events.push(newEvent);

        // Save the updated events array back to localStorage
        localStorage.setItem("events", JSON.stringify(events));

        // Update the table with the new event
        updateEventTable();

        // Reset the form fields
        document.getElementById("nom1").value = "";
        document.getElementById("date1").value = "";
        document.getElementById("location1").value = "";
        document.getElementById("type1").value = "";
    } else {
        alert("Veuillez remplir tous les champs");
    }
}

// Function to delete an event
function deleteEvent(button) {
    const row = button.closest("tr");
    const eventName = row.cells[0].textContent;

    // Get events from localStorage
    let events = JSON.parse(localStorage.getItem("events")) || [];

    // Remove the event from the array
    events = events.filter(event => event.name !== eventName);

    // Save the updated events array back to localStorage
    localStorage.setItem("events", JSON.stringify(events));

    // Update the table
    updateEventTable();
}

// Function to update the events table
function updateEventTable() {
    const table = document.getElementById("eventsTable").getElementsByTagName('tbody')[0];
    table.innerHTML = "";  // Clear existing table rows

    // Get events from localStorage
    const events = JSON.parse(localStorage.getItem("events")) || [];

    // Populate the table with events
    events.forEach(event => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.type}</td>
            <td><button class="btn" onclick="deleteEvent(this)">Supprimer</button></td>
        `;
    });
}

// Bind the addEvent function to the form submission event
document.getElementById('add-event-form').addEventListener('submit', addEvent);

// Update the table with events when the page loads
window.onload = updateEventTable;