// Function to assert a condition and log the result
function assert(description, condition) {
  console.log(description + ": " + (condition ? "Passed" : "Failed"));
}

// Test Case 1: Responsive Navbar Toggle
function testNavbarToggle() {
  const hamburger = document.querySelector(".hamburger");
  const navLink = document.querySelector(".nav__link");

  assert("Navbar should toggle visibility on hamburger click", () => {
    // Initial state: navLink should not have 'hide' class
    const initialState = !navLink.classList.contains("hide");

    // Simulate hamburger click
    hamburger.click();

    // After click: navLink should have 'hide' class
    const afterClickState = navLink.classList.contains("hide");

    // Simulate another click
    hamburger.click();

    // After second click: navLink should not have 'hide' class
    const afterSecondClickState = !navLink.classList.contains("hide");

    return initialState && afterClickState && afterSecondClickState;
  });
}

// Test Case 2: File Addition and Local Storage
function testFileAddition() {
  let fileList = document.querySelector("#file-list");

  assert("Adding a file should update local storage and file list", () => {
    // Initial state: No files in localStorage
    const initialState = localStorage.getItem("files") === "null";

    // Add a file
    addFile("TestFile");

    // After adding file: localStorage should have files, and fileList should contain TestFile
    const afterAddingFile =
      localStorage.getItem("files") !== "null" &&
      fileList.innerHTML.includes("TestFile");

    return initialState && afterAddingFile;
  });
}

// Test Case 3: Text Styling Functions
function testTextStylingFunctions() {
  let editorContent = document.querySelector("#editor-file-content");

  assert("Text styling functions should modify editor content", () => {
    // Initial state: Editor content is empty
    const initialState = editorContent.innerHTML === "";

    // Apply bold styling
    boldIcon();

    // After applying bold: Editor content should contain <strong></strong>
    const afterBold = editorContent.innerHTML === "<strong></strong>";

    // Apply italic styling
    italicIcon();

    // After applying italic: Editor content should contain <em></em>
    const afterItalic = editorContent.innerHTML === "<em></em>";

    return initialState && afterBold && afterItalic;
  });
}

// Test Case 4: Opening and Saving Files
function testOpeningAndSavingFiles() {
  let openedFile, editorContent;

  assert(
    "Opening and saving files should update editor content and localStorage",
    () => {
      // Initial state: No opened file and empty editor content
      const initialOpenedFile = openedFile === undefined;
      const initialEditorContent = editorContent.innerHTML === "";

      // Add a file
      addFile("TestFile");

      // Open the file
      openFile("TestFile");

      // After opening: openedFile should be defined, and editor content should match file content
      const afterOpening =
        openedFile !== undefined &&
        editorContent.innerHTML === openedFile.content;

      // Modify editor content
      editorContent.innerHTML = "Updated content";

      // Save the file
      saveFile("TestFile");

      // After saving: localStorage should be updated with new content
      const updatedFiles = JSON.parse(localStorage.getItem("files"));
      const afterSaving = updatedFiles[0].content === "Updated content";

      return (
        initialOpenedFile && initialEditorContent && afterOpening && afterSaving
      );
    }
  );
}

// Run the tests at page load
testNavbarToggle();
testFileAddition();
testTextStylingFunctions();
testOpeningAndSavingFiles();

// Run the tests
function testall() {
  testNavbarToggle();
  testFileAddition();
  testTextStylingFunctions();
  testOpeningAndSavingFiles();
  return null;
}
