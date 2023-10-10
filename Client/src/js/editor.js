
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

    <div id="editor-file-content" contenteditable="true" oninput="autoSaveDocument(openedFile)">
      ${openedFile.content}
    </div>
  `;

  editorContent = document.querySelector("#editor-file-content");

  if (openedFileElement) {
    openedFileElement.style.border = "1px solid #fff";
  }

  openedFileElement = fileElements.filter((file) => {
    return file.children[0].textContent == filename;
  })[0];
  openedFileElement.style.border = "5px solid #2F242C";

  //console.log(`"${filename}" started`);

  localStorage.setItem("openedFile", JSON.stringify(openedFile));

  editorContent.onselectionchange = () => {
    console.log(document.getSelection().focusOffset);
  };
};

const saveDocument = (filename) => {
  fileToBeSaved = files.filter((file) => {
    return file == filename;
  })[0];

  files[files.indexOf(fileToBeSaved)].content = editorContent.innerHTML;
  files[files.indexOf(fileToBeSaved)].lastSaved = new Date();

  localStorage.setItem("files", JSON.stringify(files));

  openedFile = files[files.indexOf(fileToBeSaved)];
};

const autoSaveDocument = (filename) => {
  fileToBeSaved = files.filter((file) => {
    return file == filename;
  })[0];

  files[files.indexOf(fileToBeSaved)].content = editorContent.innerHTML;
  files[files.indexOf(fileToBeSaved)].lastSave = new Date();

  localStorage.setItem("files", JSON.stringify(files));

  openedFile = files[files.indexOf(fileToBeSaved)];
};
