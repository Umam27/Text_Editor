const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.nav__link');

hamburger.addEventListener('click', () => {
  navLink.classList.toggle('hide');
});


// Global variables
let fileList = document.querySelector("#file-list"), fileElements, openedFile, openedFileElement, files = JSON.parse(localStorage.getItem("files")), editor = document.querySelector("#editor"), editorContent;

const addFile = (filename) => {
  const existingFilenames = files.filter(file => {
    return file.filename.includes(filename);
  });

  if (filename != "") {
    // File schema to be pushed in the local-storage
    files.push({
      filename: filename,
      content: "",
    });
  }

  localStorage.setItem("files", JSON.stringify(files));
  fetchFiles(files);
  document.createFile.filename.value = "";
  openFile(files[files.length - 1].filename);
};


//function retrieves the starting point of the user's current text selection
//and returns either the parent node of the text node where the selection starts 
//(if it's a text node) or the node itself (if it's not a text node)
const getSelectionStart = () => {
  let node = document.getSelection().anchorNode;
  return node.nodeType == 3 ? node.parentNode : node;
}

const fetchFiles = (files) => {
  fileList.innerHTML = "";

  if (files.length > 0) {
    files.forEach(file => {
      fileList.innerHTML += `
      <li ondblclick="openFile('${file.filename}')"
          id="${file.id}"
          title="${file.filename}">
        <div class="files-filename">${file.filename}</div>
      </li>`;

      fileList.style.justifyContent = "flex-start";
      fileList.style.alignItems = "flex-start";
      fileList.style.textAlign = "left";
      
    });
  } else {
    fileList.innerHTML = `
      <p class="no-file-message">
        <button id="new-file-button" onclick="document.querySelector('#new-document-modal').style.display = 'flex';">
          <i class="fa fa-plus"></i> New file
        </button>
      </p>`;

    fileList.style.justifyContent = "center";
    fileList.style.alignItems = "center";
    fileList.style.textAlign = "center";
  }

  fileElements = Array.prototype.slice.call(fileList.children); // converting html list into JS object array for further use, localstorage term-used
};

// open a certain file in the text-editor for use
const openFile = (filename) => {
  // getting the file object from the JS object array of all the files
  openedFile = files.filter((file) => {
    return file.filename == filename; // matching the filename with the required one
  })[0];

  // Console.log(`"${filename}" required`);
  editor.innerHTML = `
    <div id="editor-file-topbar">
      <h2 id="editor-file-title"
           title="${openedFile.filename}">${openedFile.filename}</h2>
      <div id="editor-file-toolbar">
        <ul class="toolbar-section" id="semantic-toolbar">
          <li class="toolbar-button" onclick="headerIcon(1)">H<span class="subheader-number-symbol">1</span></li>
          <li class="toolbar-button" onclick="headerIcon(2)">H<span class="subheader-number-symbol">2</span></li>
          <li class="toolbar-button" onclick="headerIcon(3)">H<span class="subheader-number-symbol">3</span></li>
          <li class="toolbar-button" onclick="headerIcon(4)">H<span class="subheader-number-symbol">4</span></li>
          <li class="toolbar-button" onclick="headerIcon(5)">H<span class="subheader-number-symbol">5</span></li>
          <li class="toolbar-button" onclick="headerIcon(6)">H<span class="subheader-number-symbol">6</span></li>
        </ul>
        <ul class="toolbar-section" id="formatting-toolbar">
          <li class="toolbar-button" onclick="boldIcon()"><i class="fa fas fa-bold"></i></li>
          <li class="toolbar-button" onclick="italicIcon()"><i class="fa fas fa-italic"></i></li>
          <li class="toolbar-button" onclick="underlineIcon()"><i class="fa fas fa-underline"></i></li>
          <li class="toolbar-button" onClick="strikeThroughIcon()"><i class="fas fa-strikethrough"></i></li>
          <li class="toolbar-button" onClick="subScriptIcon()"><i class="fas fa-subscript"></i></li>
          <li class="toolbar-button" onClick="superScriptIcon()"><i class="fas fa-superscript"></i></li>
          <li class="toolbar-button" onclick="listIcon(true)"><i class="fa fas fa-list-ol"></i></li>
          <li class="toolbar-button" onclick="listIcon(false)"><i class="fa fas fa-list"></i></li>
          <li class="toolbar-button"onclick="textAlignIcon('left')"><i class="fas fa-align-left"></i></li>
          <li class="toolbar-button"onclick="textAlignIcon('center')"><i class="fas fa-align-center"></i></li>
          <li class="toolbar-button"onclick="textAlignIcon('right')"><i class="fas fa-align-right"></i></li>
          <li class="toolbar-button"onclick="textAlignIcon('justify')"><i class="fas fa-align-justify"></i></li>
        </ul>
      </div>
    </div>

    <div id="editor-file-content" contenteditable="true" oninput="saveFile(openedFile)">
      ${openedFile.content}
    </div>
  `;

  editorContent = document.querySelector("#editor-file-content");

  openedFileElement = fileElements.filter((file) => {
    return file.children[0].textContent == filename;
  })[0];
  openedFileElement.style.border = "5px solid #2F242C";

  //console.log(`"${filename}" started`);

  localStorage.setItem("openedFile", JSON.stringify(openedFile));
};

const saveFile = (filename) => {
  fileToBeSaved = files.filter((file) => {
    return file == filename;
  })[0];

  files[files.indexOf(fileToBeSaved)].content = editorContent.innerHTML;

  localStorage.setItem("files", JSON.stringify(files));

  openedFile = files[files.indexOf(fileToBeSaved)];

};

document.addEventListener("DOMContentLoaded",(e) => {
  e.preventDefault();
  if (localStorage.getItem("files") === null) {
    localStorage.setItem("files", JSON.stringify([]));
  }
  localStorage.setItem("openedFile", "");
  files = JSON.parse(localStorage.getItem("files"));
  fetchFiles(files);
});

document.createFile.addEventListener("submit", (event) => {
  event.preventDefault();
  addFile(document.createFile.filename.value);
  document.querySelector('#new-document-modal').style.display = 'none';
});

// adding the key-bindings
document.addEventListener("keydown", (event) => {
  if (event.key == "b" && event.ctrlKey) {
    event.preventDefault();
    boldIcon();

  } else if (event.key == "i" && event.ctrlKey) {
    event.preventDefault();
    italicIcon();
    
  } else if (event.key == "u" && event.ctrlKey) {
    event.preventDefault();
    underlineIcon();
  }
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




