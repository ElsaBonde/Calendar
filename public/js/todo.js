/**Open modal function */


function openModal() {
	document.getElementById("todoModal").style.display = "flex"; // Change 'flex' to 'block' if you prefer
}

// Function to close the modal
function closeModal() {
	document.getElementById("todoModal").style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
	var modal = document.getElementById("todoModal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
