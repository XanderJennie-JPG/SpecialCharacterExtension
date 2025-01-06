document.addEventListener("keydown", (event) => {
    if (event.altKey && !event.ctrlKey && !event.shiftKey && event.code === "KeyO") {
      event.preventDefault();
      insertCharacter("ö");
    } else if (event.altKey && !event.ctrlKey && !event.shiftKey && event.code === "KeyW") {
      event.preventDefault();
      insertCharacter("ŵ");
    }
  });
  
  function insertCharacter(char) {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT")) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const text = activeElement.value;
      activeElement.value = text.slice(0, start) + char + text.slice(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + 1;
    } else if (activeElement && activeElement.isContentEditable) {
      const sel = window.getSelection();
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(char));
      range.collapse(false);
    }
  }
  