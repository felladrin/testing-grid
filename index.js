import { Pane } from "https://cdn.skypack.dev/tweakpane";

const pane = new Pane({ title: "Parameters" });

const parameters = {
  url: `https://linkedtimer.com/#${Math.random().toString(36).substring(2)}`,
  instances: 4,
};

const urlInput = pane.addInput(parameters, "url", {
  label: "URL",
});

const instancesAmount = pane.addInput(parameters, "instances", {
  label: "Instances",
  step: 1,
  min: 1,
  max: 12,
});

const mainElement = document.querySelector("main");

const recreateElements = () => {
  while (mainElement.childElementCount > parameters.instances) {
    mainElement.removeChild(mainElement.lastChild);
  }

  mainElement.style.gridTemplateColumns = `repeat(${Math.ceil(
    parameters.instances / 2
  )}, 1fr)`;

  const trimmedUrl = parameters.url.trim();

  while (mainElement.childElementCount < parameters.instances) {
    const iframeElement = document.createElement("iframe");
    iframeElement.src = trimmedUrl;
    mainElement.appendChild(iframeElement);
  }

  Array.from(mainElement.children).forEach((iframeElement) => {
    if (!iframeElement.src.startsWith(trimmedUrl))
      iframeElement.src = trimmedUrl;
  });
};

instancesAmount.on("change", ({ last }) => {
  if (!last) recreateElements();
});

urlInput.on("change", () => {
  recreateElements();
});

recreateElements();
