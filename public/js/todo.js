var existingEvents = JSON.parse(localStorage.getItem("todos")) || [];
let selectedId = ""; // keeps track of ID in the event

sortList(existingEvents);

// Open modal function
function openModal() {
	document.getElementById("todoForm").onsubmit = addEvent;
	document.getElementById("todoModal").style.display = "flex"; // Change 'flex' to 'block' if you prefer
}

// Function to close the modal
function closeModal() {
	document.getElementById("todoModal").style.display = "none";
}

// Close the modal if the user clicks outside the modal
window.onclick = function (event) {
	const modal = document.getElementById("todoModal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

// add new event function
function addEvent(e) {
	e.preventDefault();
	var title = document.getElementById("titleToDo").value;
	var date = document.getElementById("dateToDo").value;
	var time = document.getElementById("timeToDo").value;

	var newEvent = {
		title: title,
		date: date,
		time: time,
		id: title + date + time, //create an id for the event
	};

	existingEvents.push(newEvent);

	localStorage.setItem("todos", JSON.stringify(existingEvents));

	updateEventList(existingEvents);
	closeModal();
	loadEvents();
	renderCalendar();
}

// sort list function (it sorts by date and time)
function sortList(todos) {
	const sortedList = todos.sort((a, b) => {
		const aDateTime = `${a.date} ${a.time}`;
		const bDateTime = `${b.date} ${b.time}`;
		return aDateTime.localeCompare(bDateTime);
	});
	localStorage.setItem("todos", JSON.stringify(sortedList));
}

// Function to update the event list on the page
function updateEventList(todos) {
	const eventList = document.getElementById("eventList");
	eventList.innerHTML = "";

	todos.forEach(function (todo) {
		var listItem = document.createElement("li");

		// Create a span for event-info
		var eventInfo = document.createElement("span");
		eventInfo.className = "liEvents";
		eventInfo.textContent = `${todo.date} at ${todo.time}\r\n${todo.title}`;

		listItem.appendChild(eventInfo);

		// edit button
		const editButton = document.createElement("button");
		editButton.setAttribute("data-cy", "edit-todo-button");
		editButton.className = "editButton";
		editButton.innerHTML =
			'<i class="far fa-pen-to-square" style="color: #000000;"></i>';
		editButton.addEventListener("click", (event) => {
			handleEditClick(todo);
		});
		listItem.appendChild(editButton);
		eventList.appendChild(listItem);

		// delete button
		const deleteButton = document.createElement("button");
		deleteButton.setAttribute("data-cy", "delete-todo-button");
		deleteButton.className = "deleteButton";
		deleteButton.innerHTML =
			'<i class="fa-regular fa-trash-can" style="color: #000000;"></i>';
		deleteButton.addEventListener("click", (event) => {
			handleDeleteClick(todo);
		});
		listItem.appendChild(deleteButton);

		eventList.appendChild(listItem);
	});
}

// edit function
function handleEditClick(todo) {
  selectedId = todo.id;
	fillEditModal(todo);
}

// delete function
function handleDeleteClick(todoToRemove) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter(todo => todo.id !== todoToRemove.id)
	localStorage.setItem("todos", JSON.stringify(todos));
	updateEventList(todos);
	renderCalendar();
}

function fillEditModal(selectedEvent) {
	document.getElementById("titleToDo").value = selectedEvent.title;
	document.getElementById("dateToDo").value = selectedEvent.date;
	document.getElementById("timeToDo").value = selectedEvent.time;
	document.getElementById("todoForm").onsubmit = updateEventInLocalStorage;

	document.getElementById("todoModal").style.display = "flex";
}

function updateListIdById(dataList, idToUpdate, newValues) {
	const itemToUpdate = dataList.find((item) => item.id === idToUpdate);
	if (idToUpdate) {
		Object.assign(itemToUpdate, newValues);
	}
}

function updateEventInLocalStorage(e) {
	e.preventDefault();
	const updatedTitle = document.getElementById("titleToDo").value;
	const updatedDate = document.getElementById("dateToDo").value;
	const updatedTime = document.getElementById("timeToDo").value;

	const updatedEvent = {
		title: updatedTitle,
		date: updatedDate,
		time: updatedTime,
	};

	updateListIdById(existingEvents, selectedId, updatedEvent);
	localStorage.setItem("todos", JSON.stringify(existingEvents)); // saves it to local storage
	updateEventList(existingEvents);
	renderCalendar();
}

// Function to load todos from local storage and update the list on page load
function loadEvents() {
  sortList(existingEvents);
	updateEventList(existingEvents);
}

window.onload = function () {
	loadEvents();
};
