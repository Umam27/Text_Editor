document.addEventListener("DOMContentLoaded",() => {
  if (localStorage.getItem("files") === null) {
    console.log("There is no files storage there. Creating...");
    localStorage.setItem("files", JSON.stringify([]));
  }

  localStorage.setItem("openedFile", "");
  files = JSON.parse(localStorage.getItem("files"));
  files.forEach(file => {
    file.createdAt = new Date(file.createdAt);
    file.lastSaved = new Date(file.lastSaved);
  });

  getDocuments(files);
});

document.createFile.addEventListener("submit", (event) => {
  event.preventDefault();
  
  addFile(document.createFile.filename.value);
  
  document.querySelector('#new-document-modal').style.display = 'none';
});

document.addEventListener("keydown", (event) => {
  if (event.key == "s" && event.ctrlKey) {
    event.preventDefault();
    
    saveDocument(openedFile);
    
    console.log("Document saved");
  } else if (event.key == "b" && event.ctrlKey) {
    event.preventDefault();
    
    console.log(window.getSelection());
    boldIcon();
    
    console.log("Text bold saved");
  } else if (event.key == "i" && event.ctrlKey) {
    event.preventDefault();
    
    console.log(window.getSelection());
    italicIcon();
    
    console.log("Text italic saved");
  } else if (event.key == "u" && event.ctrlKey) {
    event.preventDefault();
    
    console.log(window.getSelection());
    underlineIcon();
    
    console.log("Text underline saved");
  }
  // text alignment case
  else if (event.key == "j" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("justify");
  } else if (event.key == "l" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("left");
  } else if (event.key == "r" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("right");
  } else if (event.key == "e" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("center");
  } 
}, false);





