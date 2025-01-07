document.addEventListener("DOMContentLoaded", () => {
    const shortcutForm = document.getElementById("shortcutForm");
    const shortcutInput = document.getElementById("shortcut");
    const characterInput = document.getElementById("character");
    const shortcutList = document.getElementById("shortcutList");
    let recordedKeys = new Set();
  
    function updateShortcutList(shortcuts) {
      shortcutList.innerHTML = "";
      for (const [key, char] of Object.entries(shortcuts)) {
        const li = document.createElement("li");
        li.textContent = `${key} -> ${char}`;
        shortcutList.appendChild(li);
      }
    }
  
    chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
      updateShortcutList(shortcuts);
    });
  
    // Capture key combinations
    shortcutInput.addEventListener("keydown", (event) => {
      event.preventDefault();
      const key = event.key === " " ? "Space" : event.key;
      recordedKeys.add(key);
  
      // Build the shortcut string
      const shortcutString = [
        event.ctrlKey ? "Ctrl" : null,
        event.altKey ? "Alt" : null,
        event.shiftKey ? "Shift" : null,
        ...recordedKeys,
      ]
        .filter(Boolean)
        .join("+");
  
      shortcutInput.value = shortcutString;
    });
  
    // Reset the recorded keys on keyup
    shortcutInput.addEventListener("keyup", () => {
      recordedKeys.clear();
    });
  
    shortcutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const shortcut = shortcutInput.value.trim();
      const character = characterInput.value.trim();
  
      if (shortcut && character) {
        chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
          shortcuts[shortcut] = character;
          chrome.storage.sync.set({ shortcuts }, () => {
            updateShortcutList(shortcuts);
            shortcutForm.reset();
          });
        });
      }
    });
  });
  