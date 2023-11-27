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
};

const italicIcon = () => {
  let element = document.createElement("em");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
};

const underlineIcon = () => {
  let element = document.createElement("u");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
};

const strikeThroughIcon = () => {
  let element = document.createElement("s");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
};

const subScriptIcon = () => {
  let element = document.createElement("sub");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
};

const superScriptIcon = () => {
  let element = document.createElement("sup");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
};

const headerIcon = (hnum) => {
  if (getSelectionStart().parentNode == editorContent) {
    switchBetweenElements(
      getSelectionStart(),
      document.createElement(`h${hnum}`)
    );
  }
};

const textAlignIcon = (alignment) => {
  if (getSelectionStart().parentNode == editorContent) {
    getSelectionStart().style.textAlign = alignment;
  }
};

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
};

const switchBetweenElements = (oldElement, newElement) => {
  for (let i = 0; i < oldElement.attributes.length; i++) {
    newElement.setAttribute(
      oldElement.attributes.item(i).nodeName,
      oldElement.attributes.item(i).nodeValue
    );
  }

  newElement.innerHTML = oldElement.innerHTML;

  oldElement.parentNode.replaceChild(newElement, oldElement);
};

//////////
// const fontDropdown = document.getElementById('fontDropdown');
// const fontSizeDropdown = document.getElementById('fontSizeDropdown');
// const editorContent = document.getElementById('editor-file-content');

// fontDropdown.addEventListener('change', () => {
//   const selectedFont = fontDropdown.value;
//   document.execCommand('fontName', false, selectedFont);
// });

// fontSizeDropdown.addEventListener('change', () => {
//   const selectedSize = fontSizeDropdown.value;
//   document.execCommand('fontSize', false, selectedSize);
// });
// Function to change font color
// const changeFontColor = (color) => {
//   const selection = window.getSelection();
//   if (selection.rangeCount > 0) {
//     const range = selection.getRangeAt(0);
//     const newNode = document.createElement('span');
//     newNode.style.color = color;
//     // console.log(color);
//     // Surround the selected range with a newly created element
//     range.surroundContents(newNode);
//   }
// };

// Event listener for font color selection
// const fontColorDropdown = document.getElementById('fontColorDropdown');

// fontColorDropdown.addEventListener('change', () => {
//   const selectedColor = fontColorDropdown.value;
//   changeFontColor(selectedColor);

// });
/// Function to change font name
const changeFont = (fontName) => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    const isTextOnlySelection = Array.from(
      range.cloneContents().childNodes
    ).every((node) => node.nodeType === Node.TEXT_NODE);

    if (isTextOnlySelection) {
      const newNode = document.createElement("span");
      newNode.style.fontFamily = fontName;
      // var ben = newNode.style.fontFamily;
      // console.log(ben);
      range.surroundContents(newNode);
    } else {
      // Create a span element to wrap the selected range with the font family style
      const newNode = document.createElement("span");
      newNode.style.fontFamily = fontName;

      // Extract text nodes from the range
      const nodes = [];
      const extractTextNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          nodes.push(node);
        } else {
          if (node.childNodes && node.childNodes.length > 0) {
            for (let i = 0; i < node.childNodes.length; i++) {
              extractTextNodes(node.childNodes[i]);
            }
          }
        }
      };
      extractTextNodes(range.commonAncestorContainer);

      if (nodes.length > 0) {
        // Applying font family style to each text node separately
        nodes.forEach((textNode) => {
          const newSpan = newNode.cloneNode(true);
          textNode.parentNode.insertBefore(newSpan, textNode);
          newSpan.appendChild(textNode);
        });

        // Collapse the range to the end of the last text node
        range.setStartAfter(nodes[nodes.length - 1]);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
};

const changeFontSize = (fontSize) => {
  // console.log(fontSize)
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    const isTextOnlySelection = Array.from(
      range.cloneContents().childNodes
    ).every((node) => node.nodeType === Node.TEXT_NODE);

    if (isTextOnlySelection) {
      const newNode = document.createElement("span");
      newNode.style.fontSize = fontSize;

      range.surroundContents(newNode);
    } else {
      // Create a span element to wrap the selected range with the font family style
      const newNode = document.createElement("span");
      newNode.style.fontSize = fontSize;
      // console.log(newNode.style.fontSize);
      // Extract text nodes from the range
      const nodes = [];
      const extractTextNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          nodes.push(node);
        } else {
          if (node.childNodes && node.childNodes.length > 0) {
            for (let i = 0; i < node.childNodes.length; i++) {
              extractTextNodes(node.childNodes[i]);
            }
          }
        }
      };
      extractTextNodes(range.commonAncestorContainer);

      if (nodes.length > 0) {
        // Applying font family style to each text node separately
        nodes.forEach((textNode) => {
          const newSpan = newNode.cloneNode(true);
          textNode.parentNode.insertBefore(newSpan, textNode);
          newSpan.appendChild(textNode);
        });

        // Collapse the range to the end of the last text node
        range.setStartAfter(nodes[nodes.length - 1]);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
};

const changeFontColor = (fontColor) => {
  // console.log(fontColor);
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    const isTextOnlySelection = Array.from(
      range.cloneContents().childNodes
    ).every((node) => node.nodeType === Node.TEXT_NODE);

    if (isTextOnlySelection) {
      const newNode = document.createElement("span");
      newNode.style.color = fontColor;

      // console.log(newNode.style.color)
      range.surroundContents(newNode);
    } else {
      // Create a span element to wrap the selected range with the font family style
      const newNode = document.createElement("span");
      newNode.style.color = fontColor;
      // console.log(newNode.style.color)
      // Extract text nodes from the range
      const nodes = [];
      const extractTextNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          nodes.push(node);
        } else {
          if (node.childNodes && node.childNodes.length > 0) {
            for (let i = 0; i < node.childNodes.length; i++) {
              extractTextNodes(node.childNodes[i]);
            }
          }
        }
      };
      extractTextNodes(range.commonAncestorContainer);

      if (nodes.length > 0) {
        // Applying font family style to each text node separately
        nodes.forEach((textNode) => {
          const newSpan = newNode.cloneNode(true);
          textNode.parentNode.insertBefore(newSpan, textNode);
          newSpan.appendChild(textNode);
        });

        // Collapse the range to the end of the last text node
        range.setStartAfter(nodes[nodes.length - 1]);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
};
// const changeFont = (selectedFont) => {
//   editorContent.style.fontFamily = selectedFont;
// };

// const changeFontSize = (selectedFontSize) => {
//   editorContent.style.fontSize = selectedFontSize;
// };

// const changeFontColor = (selectedFontColor) => {
//   editorContent.style.color = selectedFontColor;
// };

// Function to change font size
// const changeFontSize = (fontSize) => {
//   const selection = window.getSelection();
//   if (selection.rangeCount > 0) {
//     const range = selection.getRangeAt(0);
//     const newNode = document.createElement('span');
//     newNode.style.fontSize = fontSize + 'px';

//     if (range.collapsed) {
//       // Insert the span element before the selection if it's collapsed
//       range.insertNode(newNode, false); // Insert before the selected text
//     } else {
//       // Insert the span element after the selection if it's not collapsed
//       range.insertNode(newNode, true); // Insert after the selected text
//     }
//   }
// };

// Event listeners for font name and size dropdowns
// document.querySelector("#editor-file-title");
// const fontDropdown = editor.querySelector('#fontDropdown');

// fontDropdown.addEventListener('change', () => {
//   const selectedFont = fontDropdown.value;
//   changeFontName(selectedFont);
// });

// const fontSizeDropdown = document.getElementById('fontSizeDropdown');

// fontSizeDropdown.addEventListener('change', () => {
//   const selectedSize = fontSizeDropdown.value;
//   changeFontSize(selectedSize); // Call the changeFontSize function
// });
