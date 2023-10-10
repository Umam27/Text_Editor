// Contains the functions that are required to edit the text. for eg :- bold, italic, underline
// Mostly picked from MDN documentations 

const boldIcon = () => {
  let element = document.createElement("strong");

  if (window.getSelection) {
    //checks if the window.getSelection method is available, and if so, it surrounds the currently selected text with the specified HTML element
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const italicIcon = () => {
  let element = document.createElement("em");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const underlineIcon = () => {
  let element = document.createElement("u");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const strikeThroughIcon = () => {
  let element = document.createElement("s");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const subScriptIcon = () => {
  let element = document.createElement("sub");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const superScriptIcon = () => {
  let element = document.createElement("sup");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const headerIcon = (hnum) => {
  if (getSelectionStart().parentNode == editorContent) {
    switchBetweenElements(getSelectionStart(), document.createElement(`h${hnum}`));
  }
}

const textAlignIcon = (alignment) => {
  if (getSelectionStart().parentNode == editorContent) {
    getSelectionStart().style.textAlign = alignment;
  }
}

const listIcon = (ordered) => {
  if (ordered === true) {
    list = document.createElement("ol");
  } else {
    list = document.createElement("ul");
  }

  if (getSelectionStart().parentNode == editorContent) {
    switchBetweenElements(getSelectionStart(), list);
    list.innerHTML = `<li></li>`;
    list.focus();
  }
}
