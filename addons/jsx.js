document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[type="text/babel"]').forEach((jsxScript) => {
    let script = jsxScript.textContent;
    script = script.replace(/return.*?\s+\(/g, "return (`");
    script = script.replace(/>.*?\s+\);/g, ">`);");

    let scriptEl = document.createElement("script");
    scriptEl.appendChild(document.createTextNode(script));
    document.body.appendChild(scriptEl);
  });

  updateComponents();
});
