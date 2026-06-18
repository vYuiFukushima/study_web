const copyIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <rect x="9" y="9" width="11" height="11" rx="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
`;

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

const cloneUrlInput = document.querySelector("#gitlabCloneUrl");
const cloneCommandOutput = document.querySelector("#cloneCommandOutput");

if (cloneUrlInput && cloneCommandOutput) {
  const updateCloneCommand = () => {
    const gitlabUrl = cloneUrlInput.value.trim() || "<GitLabのURL>";
    cloneCommandOutput.textContent = `cd C:\\work\n\ngit clone ${gitlabUrl}`;
  };

  cloneUrlInput.addEventListener("input", updateCloneCommand);
  updateCloneCommand();
}

const workdirPathInput = document.querySelector("#workdirPathInput");
const workdirCommitMessageInput = document.querySelector("#workdirCommitMessageInput");
const workdirCommandOutput = document.querySelector("#workdirCommandOutput");

if (workdirPathInput && workdirCommandOutput) {
  const updateWorkdirCommand = () => {
    const workdirPath = workdirPathInput.value.trim() || "<ディレクトリーのパス>";
    const commitMessage = (workdirCommitMessageInput?.value.trim() || "任意のコミットメッセージ").replace(/"/g, '`"');
    workdirCommandOutput.textContent = `cd ${workdirPath}\n\ngit add .\ngit status\ngit commit -m "${commitMessage}"\ngit push`;
  };

  workdirPathInput.addEventListener("input", updateWorkdirCommand);
  workdirCommitMessageInput?.addEventListener("input", updateWorkdirCommand);
  updateWorkdirCommand();
}

const pipelinePathInput = document.querySelector("#pipelinePathInput");
const pipelineCommandOutput = document.querySelector("#pipelineCommandOutput");

if (pipelinePathInput && pipelineCommandOutput) {
  const updatePipelineCommand = () => {
    const pipelinePath = pipelinePathInput.value.trim() || "<ディレクトリーのパス>";
    pipelineCommandOutput.textContent = `cd ${pipelinePath}\n\ngit add .gitlab-ci.yml\ngit commit -m "Add first GitLab pipeline"\ngit push`;
  };

  pipelinePathInput.addEventListener("input", updatePipelineCommand);
  updatePipelineCommand();
}

document.querySelectorAll(".code-panel").forEach((panel) => {
  const code = panel.querySelector("code");
  if (!code) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-button";
  button.title = "コードをコピー";
  button.setAttribute("aria-label", "コードをコピー");
  button.innerHTML = copyIcon;

  button.addEventListener("click", async () => {
    await copyText(code.innerText);
    button.classList.add("is-copied");
    button.title = "コピーしました";
    button.setAttribute("aria-label", "コピーしました");

    window.setTimeout(() => {
      button.classList.remove("is-copied");
      button.title = "コードをコピー";
      button.setAttribute("aria-label", "コードをコピー");
    }, 1400);
  });

  panel.appendChild(button);
});
