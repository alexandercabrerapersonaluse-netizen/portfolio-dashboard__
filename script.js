function handleUpload(event, type) {
    
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        let uploads = JSON.parse(localStorage.getItem("uploads")) || [];

        uploads.push({
        id: Date.now(),
        type: type,
        src: e.target.result,
        name: file.name
        });

        localStorage.setItem("uploads", JSON.stringify(uploads));

        alert("Uploaded!");
    };

    reader.readAsDataURL(file);

}

let currentFilter = "all";

window.onload = function() {
    if (document.getElementById("uploads")) {
    loadUploads();
  }
};

function loadUploads() {

    const container = document.getElementById("uploads");
    container.innerHTML = "";

    let uploads = JSON.parse(localStorage.getItem("uploads")) || [];

    let quiz = 0, lab = 0, exam = 0;

    uploads.forEach(item => {
        
        if (item.type === "quiz") quiz++;
        if (item.type === "lab") lab++;
        if (item.type === "exam") exam++;

        if (currentFilter !== "all" && item.type !== currentFilter) return;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <img src="${item.src}">
        <p>${item.name}</p>
        <button onclick="deleteUpload(${item.id})">Delete</button>
        `;

        container.appendChild(card);
    });

    document.getElementById("total").innerText = uploads.length;
    document.getElementById("quiz").innerText = quiz;
    document.getElementById("lab").innerText = lab;
    document.getElementById("exam").innerText = exam;

}

function deleteUpload(id) {
    let uploads = JSON.parse(localStorage.getItem("uploads")) || [];

    uploads = uploads.filter(item => item.id !== id);

    localStorage.setItem("uploads", JSON.stringify(uploads));

    loadUploads();
}

function filterUploads(type) {
    currentFilter = type;
    loadUploads();
}