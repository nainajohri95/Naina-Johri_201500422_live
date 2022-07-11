import {
    getDatabase,
    ref,
    get,
    set,
    update,
    remove,
    child,
  } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
  
  var rollV, nameV, universityV;
  
  const db = getDatabase();
  
  
  var NameBox = document.getElementById("nameBox");
  var RollBox = document.getElementById("rollBox");
  var UniversityBox = document.getElementById("genBox");
  
 
  
  function insertData(event) {
    event.preventDefault();
    readFormData();
    if (rollV == "" && nameV == "" && genderV == "" && addressV == "") {
      alert("Fields can not be blank");
    } else {
      
      set(ref(db, "data/" + rollV), {
        rollNo: rollV,
        name: nameV,
        university: universityV,
        
      })
        .then(() => {
          alert("Data Stored Successfully");
        })
        .catch((error) => {
          alert("Unsccussful", error);
        });
  
      clearFormData();
    }
  }
  function readData(event) {
    event.preventDefault();
    readFormData();
  
  
    const dbref = ref(db);
  
    get(child(dbref, "data/" + rollV))
      .then((snapshot) => {
        if (snapshot.exists()) {
          NameBox.value = snapshot.val().name;
          UniversityBox.value = snapshot.val().university;
        } else {
          alert("No Data Found");
        }
      })
      .catch((error) => {
        alert("Unsccussful", error);
      });
  }
  function updateData(event) {
    event.preventDefault();
    readFormData();
   
    update(ref(db, "data/" + rollV), {
      // rollNo: rollV,  remove as rollno is my Key
      name: nameV,
      university: genderV,
    })
      .then(() => {
        alert("Data Updated Successfully");
      })
      .catch((error) => {
        alert("Unsccussful", error);
      });
  
    clearFormData();
  }
  function deleteData(event) {
    event.preventDefault();
    readFormData();
    if (rollV == "" && nameV == "" && genderV == "" && addressV == "") {
      alert("Fields can not be blank");
    } else {
      if (confirm("Are your Sure to Delete this ?")) {
        remove(ref(db, "data/" + rollV))
          .then(() => {
            alert("Data Deleted Successfully");
          })
          .catch((error) => {
            alert("Unsccussful", error);
          });
      }
  
      clearFormData();
    }
  }
  
  
  function readFormData() {
    rollV = RollBox.value;
    nameV = NameBox.value;
    universityV = GenBox.value;
    console.log(rollV, nameV, universityV);
  }
  
  
  function clearFormData() {
    
    NameBox.value = "";
    RollBox.value = "";
    UniversityBox.value = "";
  }
  
  document.querySelectorAll(".btn")[0].onclick = insertData;
  