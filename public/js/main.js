//Initializing a unique id to display contact details when name is clicked
var i = 0;
var mainConatainer = document.getElementById('main');
var imageURL;
var preview;
let contactList = [];
//using file reader to show image upload preview
function previewFile() {
	preview = document.getElementById('imagePreview');
	var file    = document.querySelector('input[type=file]').files[0];
	var reader  = new FileReader();

	reader.addEventListener("load", function () {
		preview.src = reader.result;
		imageURL = reader.result;
	}, false);

	if (file) {
		reader.readAsDataURL(file);
	}
}
//funtion that adds and display contact by calling displayContacts function
function addNewContact() {
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var tel = document.getElementById('tel').value;
	var img = document.getElementById('image').value;
	// var mainConatainer = document.getElementById('main');

	//validating input fields with reg ex
	var regEx = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z.]+)/ig;
	var regExNum = /^[0-9]+$/;

	if (name === '' || tel === '' || email ==='' ){
	    alert("*All marked fields are required");
	}else if(!tel.match(regExNum) || tel.length>11 || tel.length<11){
	    alert("*Invalid Phone Number");
	}else if (!email.match(regEx)){
	    alert("*Invalid Email Address");
	}else {
		// setting a constructor object for all contacts
		let template = {
			name: name,
			tel: tel,
			email: email,
			image: imageURL
		};

		document.getElementById('name').value = "";
		document.getElementById('email').value = "";
		document.getElementById('tel').value = "";
		document.getElementById('image').value = "";
		preview.src = "";

		//adds each contact object into an array
		contactList.push(template);
		displayContacts()
	}
	// if(img === ''){
	// 	var imgConfirm = confirm("*Are you sure you want to save without an image upload this action cant be edited*");
	// 	if(imgConfirm){
	// 		let template = {
	// 			name: name,
	// 			tel: tel,
	// 			email: email,
	// 			image: imageURL
	// 		};

	// 		document.getElementById('name').value = "";
	// 		document.getElementById('email').value = "";
	// 		document.getElementById('tel').value = "";
	// 		document.getElementById('image').value = "";
	// 		preview.src = "";


	// 		contactList.push(template);
	// 		displayContacts()
	// 	}
	// }

}
// this function loops through the array to display contacts
function displayContacts(){
	// console.log(contactList);
	mainConatainer.innerHTML = "";
	contactList.forEach((elem, index) => {
		mainConatainer.innerHTML += `
			<h1 class="clickable" onclick="if (document.getElementById('${i}').style.display === 'flex') {document.getElementById('${i}').style.display = 'none';}else {document.getElementById('${i}').style.display = 'flex';}">${elem.name}</h1>
			<div class="container" id="${i}">
				<div class="box1">
					<img src="${elem.image}" alt="Avatar" class="fitToSize">
				</div>
				<div class="box2">
					<h3>Name</h3>
					<p>${elem.name}</p>
					<h3>Phone Number</h3>
					<p>${elem.tel}</p>
					<h3>Email</h3>
					<p>${elem.email}</p>
					<span class="btn" onclick="openEditModal(${index})">Edit</span>
					<span class="btn" onclick="deleteContact(${index})">Delete</span>
				</div>
			</div>
			<div id="myModal${index}" class="modal">

			  <!-- Modal content -->
			  <div class="modal-content">
			    <div class="modal-header">
			      <span class="close">&times;</span>
			      <h2>Edit Contact: </h2>
			    </div>
			    <div class="modal-body">
			      <label>Name</label><br>
			        <input type="text" class="fg" id="nameEdit${index}"><br>
			            <label>E-mail</label><br>
			            <input type="email" class="fg" id="emailEdit${index}"><br>
			            <label>Phone</label><br>
			            <input type="telephone" class="fg" id="telEdit${index}"><br>
			            <label>Sorry can't Edit Image</label>
			    </div>
			    <div class="modal-footer">
			      <button class="btn" onclick="saveEdit(${index})">Save Changes</button>
			    </div>
			  </div>

			</div>

		`;
		i++;
		// console.log(index);
	});
}

// the deleteFunction
function deleteContact(id){
	var confirmDeletion = confirm(`Are you sure you want to delete ${contactList[id].name} ?`);

	if(confirmDeletion){
		contactList.splice(id,1);
		displayContacts();
	}
	// console.log(confirmDeletion);
}

function editContact(id){
	console.log("i was clicked");
	document.getElementById('name').value = contactList[id].name;
	document.getElementById('email').value = contactList[id].email;
	document.getElementById('tel').value = contactList[id].tel;
	document.getElementById('name').focus();
}

function openEditModal(id){
	var modal = document.getElementById(`myModal${id}`);
	 modal.style.display = "block";

	 // click anyhwere to close
	 window.onclick = function(event) {
	     if (event.target == modal) {
	         modal.style.display = "none";
	     }
	 }
	var span = document.getElementsByClassName("close")[id];


	span.onclick = function() {
	    modal.style.display = "none";
	}

	document.getElementById(`nameEdit${id}`).value = contactList[id].name;
	document.getElementById(`emailEdit${id}`).value = contactList[id].email;
	document.getElementById(`telEdit${id}`).value = contactList[id].tel;
	// document.getElementById('image').value = ;
	// preview.src = contactList[id].image;
	document.getElementById(`nameEdit${id}`).focus();
}
function saveEdit(id) {
	var newName = document.getElementById(`nameEdit${id}`).value;
	var newEmail = document.getElementById(`emailEdit${id}`).value;
	var newTel = document.getElementById(`telEdit${id}`).value;
	var imageURLEdit = contactList[id].image;

	let editTemplate = {
		name: newName,
		tel: newTel,
		email: newEmail,
		image: imageURLEdit
	};

	// document.getElementById(`nameEdit${id}`).value = ""
	// document.getElementById(`emailEdit${id}`).value = ""
	// document.getElementById(`telEdit${id}`).value = "";

	var confirmEditing = confirm(`Are you sure you want to save changes to ${contactList[id].name} ?`);

	if(confirmEditing){
		contactList.splice(id,1, editTemplate);
		var modal = document.getElementById(`myModal${id}`);
		 modal.style.display = "none";
		displayContacts();
	}
	// console.log(confirmDeletion);
}