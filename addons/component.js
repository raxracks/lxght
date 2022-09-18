function updateComponents() {
  document.querySelectorAll("*").forEach((c) => {
    let f = w[c.tagName.toLowerCase()];
    if (f) {
      c.innerHTML = f();
    }
  });
}

registerAddon(updateComponents, updateComponents);
