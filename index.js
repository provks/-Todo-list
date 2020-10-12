var taskNumber = 0;

var deleteTaskButtons = document.querySelectorAll('.delete-task');
console.log('deleteTaskButtons', deleteTaskButtons);
console.log('1');

var checkboxes = document.querySelectorAll("input[type=checkbox]");
console.log("checkboxes length", checkboxes.length);

// intitialize function
(function() {
	countTask();
	deleteTask(deleteTaskButtons);
	taskStatus(checkboxes);
	
})();


// COUNT NUMBER OF TASKS LEFT TO DO
function countTask () {
	checkboxes = document.querySelectorAll('input[type="checkbox"]');
	let tasksCount = 0;
	for (let checkbox of checkboxes) {
		if(checkbox.checked === false) {
			tasksCount++;
		}
	}

	let para = document.getElementById('no-task');
	console.log("para", para);
	if (checkboxes.length > 0) {
		para.style.display = 'none';
	} else {
		para.style.display = 'block';
	}

	// update count task in dom
	document.getElementById('tasks-count').innerHTML = tasksCount + ((tasksCount > 1) ? ' tasks left' : ' task left');
};


// CREATE NEW TASK TO THE LIST
document.getElementById('task-form').onsubmit = function(e) {
	e.preventDefault();

	let task = document.getElementById('task');	
	++taskNumber;

	let li = document.createElement("LI");                 // Create a <li> node
	li.className = "list-group-item border-0 p-0 pt-3";	// Adding class to <li>
	
	let div = document.createElement("div");	// <div> within <li>
	div.className = "task d-flex";
	
	// <div> and <a> within <div>
	let div1 = document.createElement("div");
	div1.className = "form-check form-check-inline flex-grow-1 m-0 pr-2";
	
	let anchor = document.createElement("a");
	anchor.className = "d-none delete-task";
	anchor.title = 'remove task';
	anchor.href = `#`;

	let delBtn = document.createElement("i");
	delBtn.className = "far fa-times-circle fa-lg";

	// <input> AND <label> within DIV1
	let input = document.createElement('input');
	input.className = "form-check-input mr-3";
	input.id = `inlineCheckbox${taskNumber}`;	// Adding id to the element
	input.type = 'checkbox';
	input.value = `option${taskNumber}`;

	let label = document.createElement('label');
	label.className = "form-check-label";
	label.htmlFor = input.id;

	li.append(div);
	div.append(div1, anchor);
	anchor.append(delBtn);
	div1.append(input, label);

	var textnode =  document.createTextNode(`${task.value}`);         // Create a text node
	label.appendChild(textnode);                              // Append the text to <label>
	
	document.getElementById("task-list").append(li); 		// Append <li> at end of <ul>

	// let uList = document.getElementById("task-list");
	// uList.insertBefore(li, uList.firstChild); 		// Append <li> in the top of the <ul>
	
	this.reset();	// RESET FORM

	// 2. update tasks left
	countTask();

	// delete task buttons list
	deleteTaskButtons = document.querySelectorAll('.delete-task');
	deleteTask(deleteTaskButtons);

	// list of checkboxes
	checkboxes = document.querySelectorAll("input[type=checkbox]");
	taskStatus(checkboxes);
}


// MARK ALL TASKS COMPLETE
document.getElementById('select-all').onclick = function() {
	// 1. check all unchecked tasks
	for (let checkbox of checkboxes) {
		checkbox.checked = true;
	}
	// 2. update tasks left
	countTask();
}

// CLEAR ALL COMPLETED TASK
document.getElementById('remove-completed').onclick = function() {
	// 1. remove completed tasks from the DOM
	for (let checkbox of checkboxes) {
		if (checkbox.checked === true) {
			checkbox.parentNode.parentNode.parentNode.remove();
		}
	}
	// 2. update tasks left
	countTask();
}


// DELETE TASK FROM THE DOM
function deleteTask (deleteTaskButtons) {
	console.log('deleteTaskButtons', deleteTaskButtons);
	for (let delBtn of deleteTaskButtons) {
		delBtn.addEventListener('click', function() {
			this.parentNode.parentNode.remove(this);	// 1. DELETE TASK FROM DOM
			countTask();								// 2. UPDATE REMAINING TASKS COUNT
		});
	}
}

// SHOW ALL TASKS
const allTab = document.getElementById('all-tab');
allTab.onclick = function() {
	completedTab.classList.remove("active");
	incompleteTab.classList.remove("active");
	for (let checkbox of checkboxes) {	
		checkbox.parentNode.parentNode.parentNode.style.display = 'block';
	}
}

// SHOW COMPLETED TASKS
const completedTab = document.getElementById('completed-tab');
completedTab.onclick = function() {
	allTab.classList.remove("active");
	incompleteTab.classList.remove("active");
	for (let checkbox of checkboxes) {
		if (checkbox.checked) {
			checkbox.parentNode.parentNode.parentNode.style.display = 'block';
		} else {
			checkbox.parentNode.parentNode.parentNode.style.display = 'none';
		}
	}
}

// SHOW INCOMPLETE TASKS
const incompleteTab = document.getElementById('incomplete-tab');
incompleteTab.onclick = function() {
	allTab.classList.remove("active");
	completedTab.classList.remove("active");
	for (let checkbox of checkboxes) {
		if (checkbox.checked) {
			checkbox.parentNode.parentNode.parentNode.style.display = 'none';
		} else {
			checkbox.parentNode.parentNode.parentNode.style.display = 'block';
		}
	}
}

// CHECK / UNCHECK EVENT ON TASK 
function taskStatus(checkboxes){
	for (let checkbox of checkboxes) {
		checkbox.addEventListener( 'change', function() {
			// TODO (shift tasks to completed/incomplete tabs)
		    if(this.checked) {
		        // console.log('Checkbox is checked..');

		    } else {
		        // console.log('Checkbox is NOT checked..')
		    }
			countTask();
		});
	}
}