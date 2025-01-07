chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
    document.addEventListener("keydown", (event) => {
      // Build the key combination string
      const key = `${event.altKey ? "Alt+" : ""}${event.ctrlKey ? "Ctrl+" : ""}${event.shiftKey ? "Shift+" : ""}${event.code}`;
      
      if (shortcuts[key]) {
        event.preventDefault(); // Prevent default browser behavior
        insertCharacter(shortcuts[key]);
      }
    }, true); // Use the "true" flag to capture events in the capturing phase
  });
  
  // Function to insert the character into the active element
  function insertCharacter(char) {
    const activeElement = document.activeElement;
  
    // Handle text inputs and textareas
    if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT")) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const text = activeElement.value;
  
      activeElement.value = text.slice(0, start) + char + text.slice(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + char.length;
  
    // Handle contenteditable elements
    } else if (activeElement && activeElement.isContentEditable) {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(char));
        range.collapse(false);
      }
    }
  }
  