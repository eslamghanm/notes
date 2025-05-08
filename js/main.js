const titleInput =document.querySelector("#titleInput");
const contentInput =document.querySelector("#contentInput");
const displayButton =document.querySelector(".disblay");
const updateButton =document.querySelector(".update");
const notesContainer =document.querySelector(".notesContainer");
const searchByTitle =document.querySelector("#title");
const searchByContent =document.querySelector("#content");
let allNotes =[];
let editIndex =null;

if(localStorage.getItem("notes")) {
    allNotes=JSON.parse(localStorage.getItem("notes"));
    displayInputs(allNotes)
}
displayButton.addEventListener("click", () => {
    if (!titleInput.value && !contentInput.value) {
        Swal.fire({
            icon: "error",
            title: "Both title and content are required!",
        });
     
    }

  else if (!titleInput.value){
        Swal.fire({
            icon: "error",
            title: "Enter note's title !",
          
          
          });
    }
    else if(!contentInput.value){
        Swal.fire({
            icon: "error",
            title: "Enter note's content !",
        
          
          });
    }
    else {
    const note ={
        title:titleInput.value.trim(),
        content:contentInput.value.trim(),
        }
allNotes.push(note)
localStorage.setItem("notes", JSON.stringify(allNotes))
    displayInputs(allNotes)
    clearInputs()
    }
})



// display all inputs function

function displayInputs ( notes ) {
    let temp =``
    notes.forEach((note , i)  => {
temp += `  <div class="col-md-4 col-lg-6 ">
                    <div class="content">
                        <h2 class="fw-bold">${note.title}</h2>
                        <h6 >${note.content}</h6>
                        <div class="btns mt-4 d-flex ">
                            <button class="btn btn-outline-danger w-50 me-3 fw-bold" onClick="deletNote(${i})"> 
                                <i class="fas fa-trash"></i>Delete</button>
                            <button class="btn btn-outline-warning w-50 fw-bold" onClick ="edit(${i})"><i class="fas fa-pencil"></i> Edit</button>
        
                        </div>
                    </div>

                </div>`
    })
    notesContainer.innerHTML = temp;
    
}
// clear inputs erea
function clearInputs () {
    titleInput.value = "";
    contentInput.value = "";
}
// delete note
function deletNote (index ) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
       
      }).then((result) => {
        if (result.isConfirmed) {
            allNotes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(allNotes))
            displayInputs(allNotes);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
      
  
}
// edit
function edit (index) {
   
    
    titleInput.value=allNotes[index].title;
    contentInput.value=allNotes[index].content;
    updateButton.classList.remove("d-none");
    displayButton.classList.add("d-none");
    editIndex =index;

    
}
updateButton.addEventListener("click", () => {
    if (!titleInput.value && !contentInput.value) {
        Swal.fire({
            icon: "error",
            title: "Both title and content are required!",
        });
     
    }
  else if(!titleInput.value){
        Swal.fire({
            icon: "error",
            title: "Enter note's title !",
          
          
          });
    }
    else if(!contentInput.value){
        Swal.fire({
            icon: "error",
            title: "Enter note's content !",
        
          
          });
    }
    else {
        allNotes[editIndex].title = titleInput.value;
        allNotes[editIndex].content = contentInput.value;
        localStorage.setItem("notes", JSON.stringify(allNotes))
        displayButton.classList.remove("d-none");
        updateButton.classList.add("d-none");
   

    displayInputs(allNotes)
    clearInputs()
    }
})
console.log(searchByTitle);

  
searchByTitle.addEventListener("input", () => {
    const query =searchByTitle.value.trim().toLowerCase();
    const filteredNotes =allNotes.filter(note => note.title.toLowerCase().includes(query) );
    displayInputs(filteredNotes);
})
searchByContent.addEventListener("input", () => {
    const query =searchByContent.value.trim().toLowerCase();
    const filteredNotes =allNotes.filter(note => note.content.toLowerCase().includes(query) );
    displayInputs(filteredNotes);
})