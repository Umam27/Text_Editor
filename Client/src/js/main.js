
// related to responsiveness to the NAVBAR
const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.nav__link');
hamburger.addEventListener('click', () => {
  navLink.classList.toggle('hide');
});



// Global variables
let fileList = document.querySelector("#file-list"), fileElements, openedFile, openedFileElement, files = JSON.parse(localStorage.getItem("files")), editor = document.querySelector("#editor"), editorContent, editorToolbar, editorTitle;


// Function to add a new file to localStorage with a filename
const addFile = (filename) => {

  const existingFilenames = files.filter(file => {
    return file.filename.includes(filename);
  });

  // in case of a non-null filename
  if (filename != "") {
    // File schema to be pushed in the local-storage
    files.push({
      filename: filename,
      content: "",
    });
  }

  // adding to localStorage
  localStorage.setItem("files", JSON.stringify(files));
  // display on the side-bar
  fetchFiles(files);
  document.createFile.filename.value = "";
  // open the following file in the editor
  openFile(files[files.length - 1].filename);
};


//function retrieves the starting point of the user's current text selection
//and returns either the parent node of the text node where the selection starts 
//(if it's a text node) or the node itself (if it's not a text node)

// text-node = 3
const getSelectionStart = () => {
  let node = document.getSelection().anchorNode;
  return node.nodeType == 3 ? node.parentNode : node;
}

// to display files on the left-side bar
const fetchFiles = (files) => {
  fileList.innerHTML = "";

  // if there are files present, show them on the left-side
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
  }
  // if there are no files -> display the button to create a new file 
  else {
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
   
  // converting html list into JS object array for further use, localstorage term-used
  fileElements = Array.prototype.slice.call(fileList.children); 

};

// open a certain file in the text-editor for use
const openFile = (filename) => {
  // getting the file object from the JS object array of all the files
  openedFile = files.filter(file => {
    return file.filename == filename;
  })[0];

  // Console.log(`"${filename}" required`);
  // default HTML of the editor
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
          <div id="fontDropdown1">
            <select name="fontDropdownmenu" id="fontDropdownmenu" class="toolbar-button">
              <option value="Arial">Arial</option>
              <option value="Times-new-roman">Times New Roman</option>
              <option value="Algerian">Algerian</option> 
              <option value="Berlin sans fb">Berlin sans fb</option> 
              <!-- Add more font options as needed -->
            </select>
          </div>
          <div id="fontSizeDropdown1">
            <select name="fontSizeDropdownmenu"id="fontSizeDropdownmenu"class="toolbar-button">
              
              <option value="8px">8px</option>
              <option value="10px">10px</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="22px">22px</option>
              <!-- Add more font options as needed -->
            </select>
          </div>
          <div id="fontColorDropdown1">
            
            <select name="fontColorDropdownmenu"id="fontColorDropdownmenu"class="toolbar-button">
              
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <!-- Add more color options as needed -->
            </select>
          </div>
          
            
        </ul>
        
      </div>
    </div>

    <div id="editor-file-content" contenteditable="true" oninput="saveFile(openedFile)">
      ${openedFile.content}
    </div>
  `;

  // extracting the content typed on the editor with styling
  editorTitle = document.querySelector("#editor-file-title");
  editorToolbar = document.querySelector("#editor-file-toolbar");
  editorContent = document.querySelector("#editor-file-content");

  if (openedFileElement) {
    openedFileElement.style.border = "1px solid #fff";
  }
  
  openedFileElement = fileElements.filter((file) => {
    return file.children[0].textContent == filename;
  })[0];
  openedFileElement.style.border = "5px solid #2F242C";

  //console.log(`"${filename}" started`);
  // set the openedFile with the contents of the file to open and its filename
  localStorage.setItem("openedFile", JSON.stringify(openedFile));

  const fontDropdown = editor.querySelector('#fontDropdown1');

  fontDropdown.addEventListener('change', () => {
    const selectedFont = fontDropdownmenu.value;
    changeFont(selectedFont);
    console.log(selectedFont);
  });

  const fontSizeDropdown = editor.querySelector('#fontSizeDropdown1');

  fontSizeDropdown.addEventListener('change', () => {
    const selectedFontSize = fontSizeDropdownmenu.value;
    changeFontSize(selectedFontSize);
    console.log(selectedFontSize);
  });

  const fontColorDropdown = editor.querySelector('#fontColorDropdown1');
  
  fontColorDropdown.addEventListener('change', () => {
    const selectedFontColor = fontColorDropdownmenu.value;
    changeFontColor(selectedFontColor);
    console.log(selectedFontColor);
  });

};


// function to save - get triggered automatically 
const saveFile = (filename) => {
  // file to be saved
  fileToBeSaved = files.filter((file) => {
    return file == filename;
  })[0];

  // get the content of the editor in the present state
  files[files.indexOf(fileToBeSaved)].content = editorContent.innerHTML;

  // save in the localStorage
  localStorage.setItem("files", JSON.stringify(files));

  // set openedFile to file-to-be-saved
  openedFile = files[files.indexOf(fileToBeSaved)];

};

// when the page has been completely parsed
document.addEventListener("DOMContentLoaded",() => {
  // if 'files' are not found
  if (localStorage.getItem("files") === null) {
    // set it to blank
    localStorage.setItem("files", JSON.stringify([]));
  }
  // set opened file to null
  localStorage.setItem("openedFile", "");
  // get all the files from localStorage
  files = JSON.parse(localStorage.getItem("files"));
  // call fetchFiles 
  fetchFiles(files);
});


// event is registered when we click the 'create' button in the modal-window
document.createFile.addEventListener("submit", (event) => {
  event.preventDefault();
  // pick value from the form - createFile
  addFile(document.createFile.filename.value);
  // marks the display of the modal as none
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

/// Function to count lines
// Function to count lines
const countLines = () => {
  const text = document.getElementById('editor').innerText.trim();
  if (text === '') {
    return 0; // If editor is empty, return 0 lines
  }
  const lineBreaks = text.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
  return lineBreaks.length-20;
};


// Function to count words
const countWords = () => {
  const text = document.getElementById('editor').innerText;
  const words = text.split(/\s+/).filter((word) => word !== '');
  return words.length-23;
};

// Function to update line and word counts in the footer
const updateCountsInFooter = () => {
  const lineCount = countLines();
  const wordCount = countWords();

  const lineCountFooterElement = document.getElementById('lineCountFooter');
  const wordCountFooterElement = document.getElementById('wordCountFooter');

  lineCountFooterElement.textContent = `Lines: ${lineCount}`;
  wordCountFooterElement.textContent = `Words: ${wordCount}`;
};

// Event listener for input changes in the editor
const editorl = document.getElementById('editor');
editorl.addEventListener('input', () => {
  updateCountsInFooter(); // Update counts in the footer
});
