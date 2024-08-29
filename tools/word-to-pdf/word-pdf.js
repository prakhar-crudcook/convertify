const inputElement = document.querySelector("#tool-dropzone--input");
const dropzoneElement = inputElement.closest(".tool-dropzone");
const dropzoneArea = document.querySelector(".dropzone-area");

dropzoneArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzoneArea.classList.add("file-enter");
});

["dragleave", "dragend"].forEach((el) => {
  dropzoneArea.addEventListener(el, () => {
    dropzoneArea.classList.remove("file-enter");
  });
});

dropzoneArea.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;
    updateThumbnail(dropzoneElement, e.dataTransfer.files[0]);
  }
});

dropzoneElement.addEventListener("click", (e) => {
  inputElement.click();
});

inputElement.addEventListener("change", (e) => {
  console.log(inputElement.files.length);
  if (inputElement.files.length) {
    dropzoneArea.classList.add("file-enter");
    updateThumbnail(dropzoneElement, inputElement.files[0]);
  } else {
    resetDropzone();
  }
});

const resetDropzone = () => {
  const thumbnail = document.querySelector(".tool-dropzone--thumb");
  if (thumbnail) {
    thumbnail.remove();
  } // if thumbnail is present, it is removed
  dropzoneArea.classList.remove("file-enter");
  dropzoneElement.classList.remove("dropzone-thumb");
  document.querySelector(".tool-dropzone--prompt").style.display = "block";
  document.querySelector(".cancel-button").classList.remove("active");
  inputElement.value = "";
  // the file path in input element is reset
};

const updateThumbnail = (dropzoneElement, file) => {
  console.log(file);
  const dropzonePrompt = document.querySelector(".tool-dropzone--prompt");
  // the prompt must be removed if it exists and the thumbnail must take its place
  if (dropzonePrompt) {
    dropzonePrompt.style.display = "none";
  }

  let thumbnail = document.querySelector(".tool-dropzone--thumb");

  if (!thumbnail) {
    // thumbnail does not exists, so it must be created and inserted

    thumbnail = document.createElement("div");
    thumbnail.classList.add("tool-dropzone--thumb");
    dropzoneElement.appendChild(thumbnail);
  }
  thumbnail.dataset.label = file.name;
  console.log(file.name);

  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      thumbnail.style.backgroundImage = `url(${reader.result})`;
    };
  } else {
    if (inputElement.name === "pdf") {
      thumbnail.style.backgroundImage = 'url("../../images/tools/pdf.svg")';
    } else if (inputElement.name === "word") {
      thumbnail.style.backgroundImage = 'url("../../images/tools/docx.svg")';
    }
  }
  document.querySelector(".cancel-button").classList.add("active");
};

document.querySelector(".tools-dropdown").addEventListener("click", (e) => {
  document.querySelector(".dropdown-menu").classList.toggle("active");
});

document.querySelector(".cancel-button").addEventListener("click", (e) => {
  console.log(inputElement.value);
  resetDropzone();
  console.log(inputElement.value);
});
