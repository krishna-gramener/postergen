import { asyncLLM } from "https://cdn.jsdelivr.net/npm/asyncllm@2";
import { Marked } from "https://cdn.jsdelivr.net/npm/marked@13/+esm";
import { default as html2canvas } from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js";
import { getClosestAspectRatio } from "./utils.js";

const loading = /* html */ `
  <div class="d-flex justify-content-center align-items-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
`;

const $templateGallery = document.getElementById("template-gallery");
const $submitContainer = document.getElementById("submit-container");
const $response = document.getElementById("response");
const $posterForm = document.getElementById("poster-form");
const $poster = document.getElementById("poster");
const $downloadContainer = document.getElementById("download-container");
const $download = document.getElementById("download");

const marked = new Marked();

// Load configuration and render templates.
$templateGallery.innerHTML = loading;
const { templates } = await fetch("config.json").then((res) => res.json());
$templateGallery.innerHTML = /* html */ `
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
  ${templates
    .map(
      (template, index) => /* html */ `
      <div class="col">
        <div class="card h-100 template-card" data-template-id="${index}">
          <div class="card-img-container ratio ratio-1x1 bg-body-tertiary">
            <img src="${template.image}" class="card-img-top object-fit-contain" alt="${template.name}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${template.name}</h5>
          </div>
        </div>
      </div>`
    )
    .join("")}
  </div>
`;

// Clicking on a template card selects it
document.querySelectorAll(".template-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Remove active class from all cards
    document.querySelectorAll(".template-card").forEach((c) => c.classList.remove("active"));
    // Add active class to clicked card
    card.classList.add("active");
    // Store selected template ID
    const templateId = card.dataset.templateId;
    $posterForm.dataset.selectedTemplate = templateId;
  });
});

// Load LLM Foundry token and render the generation form
const { token } = await fetch("https://llmfoundry.straive.com/token", { credentials: "include" }).then((res) =>
  res.json()
);
$submitContainer.innerHTML = loading;
if (token) {
  $submitContainer.innerHTML = /* html */ `<button type="submit" class="btn btn-primary btn-lg"><i class="bi bi-stars me-2"></i>Generate Poster</button>`;
} else {
  const url = "https://llmfoundry.straive.com/login?" + new URLSearchParams({ next: location.href });
  $submitContainer.innerHTML = /* html */ `<a class="btn btn-primary" href="${url}">Log in to generate posters</a>`;
}

// Handle form submission
$posterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const $template = $templateGallery.querySelector(`.active[data-template-id]`);
  if (!$template) return alert("Please select a template");
  const template = templates[$template.dataset.templateId];

  // Render the selected poster
  $response.innerHTML = loading;
  $downloadContainer.classList.add("d-none");
  $poster.innerHTML = await fetch(template.template).then((res) => res.text());

  const componentsPrompt = [...$poster.querySelectorAll("[data-name]")]
    .map((el) => `${el.dataset.name}: ${el.dataset.prompt ?? ""}`)
    .join("\n");

  let responseContent;
  for await (const { content } of asyncLLM("https://llmfoundry.straive.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}:postergen` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: e.target.system.value },
        { role: "user", content: `${e.target.brief.value}\n\nCOMPONENTS:\n${componentsPrompt}` },
      ],
    }),
  })) {
    responseContent = content;
    $response.innerHTML = marked.parse(content);
  }

  // Get contents of the```json``` tag. Hopefully, there's only one.
  const params = JSON.parse(responseContent.match(/```json(.*)```/s)[1]);

  // Update the components using the params
  for (const [name, text] of Object.entries(params)) {
    const $el = $poster.querySelector(`[data-name="${name}"]`);
    if (!$el) {
      console.error(`data-name="${name}" not found`);
      continue;
    } else if ($el.tagName == "IMG") {
      // For images, generate the image using the closest aspect ratio
      const aspectRatio = getClosestAspectRatio($el.width / $el.height);
      $el.src = "loading.svg";
      drawImage({ prompt: params[name], aspectRatio }).then((src) => ($el.src = src));
    } else {
      // For text, update the text content
      $el.textContent = text;
    }
  }
  $downloadContainer.classList.remove("d-none");
});

async function drawImage({ prompt, aspectRatio }) {
  const body = {
    instances: [{ prompt }],
    parameters: { aspectRatio, enhancePrompt: true, sampleCount: 1, safetySetting: "block_only_high" },
  };
  const data = await fetch("https://llmfoundry.straive.com/vertexai/google/models/imagen-3.0-generate-002:predict", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}:postergen` },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  const { mimeType, bytesBase64Encoded } = data.predictions[0];
  return `data:${mimeType};base64,${bytesBase64Encoded}`;
}

$download.addEventListener("click", (e) => {
  html2canvas($poster.firstChild, {
    backgroundColor: null,
  }).then(function (canvas) {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "poster.png";
    a.click();
  });
});
