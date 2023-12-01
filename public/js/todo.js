function openModal() {
	console.log("openModal function is called!");
	document.getElementById("todoModal").style.display = "flex"; // Change 'flex' to 'block' if you prefer
}

function closeModal() {
	document.getElementById("todoModal").style.display = "none";
}

window.onclick = function (event) {
	const modal = document.getElementById("todoModal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

function addEvent() {
	var title = document.getElementById("titleToDo").value;
	var date = document.getElementById("dateToDo").value;
	var time = document.getElementById("timeToDo").value;

	var newEvent = {
		title: title,
		date: date,
		time: time,
	};

	var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
	existingEvents.push(newEvent);
	localStorage.setItem("events", JSON.stringify(existingEvents));

	updateEventList(existingEvents);

	closeModal();

	loadEvents();
}

function updateEventList(events) {
	const eventList = document.getElementById("eventList");
	eventList.innerHTML = ""; // Clear existing list

	sortList(events);

	events.forEach(function (event) {
		const listItem = document.createElement("li");

		const eventInfo = document.createElement("span");
		eventInfo.className = "liEvents";
		eventInfo.textContent = `${event.date} at ${event.time}\r\n${event.title}`;
		listItem.appendChild(eventInfo);

		const editButton = document.createElement("button");
		editButton.className = "editButton";
		editButton.innerHTML = '<i class="far fa-pen-to-square" style="color: #000000;"></i>';
		editButton.onclick = function () {};
		listItem.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.className = "deleteButton";
		deleteButton.innerHTML = '<i class="fa-regular fa-trash-can" style="color: #000000;"></i>'
		deleteButton.dataset.cy = "delete-todo-button";
		deleteButton.onclick = function () {
			const listItem = this.parentNode;
			const eventList = listItem.parentNode;
			eventList.removeChild(listItem);
		};

		listItem.appendChild(deleteButton);
		eventList.appendChild(listItem);
	});
}

function sortList(events) {
	events.sort((a, b) => {
		const aDateTime = `${a.date} ${a.time}`;
		const bDateTime = `${b.date} ${b.time}`;
		return aDateTime.localeCompare(bDateTime);
	});
}

let selectedDate = null;

function showEventsForDate(event) {
	const clickedDate = event.target.dataset.date;

	if (selectedDate === clickedDate) {
		loadEvents();
		selectedDate = null;
		return;
	}

	if (clickedDate) {
		const [clickedYear, clickedMonth, clickedDay] = clickedDate.split("-");
		const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

		const eventsForYear = existingEvents.filter((evt) =>
			evt.date.startsWith(`${clickedYear}`)
		);

		const eventsForDate = eventsForYear.filter(
			(evt) => evt.date === clickedDate
		);

		updateEventList(eventsForDate);
		selectedDate = clickedDate;
	}
}

function loadEvents() {
	const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
	updateEventList(existingEvents);
}

// Initial load on page load
loadEvents();
