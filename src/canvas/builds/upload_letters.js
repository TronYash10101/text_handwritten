"use strict";
const form = document.getElementById("container");
const MAX_CARDS = 62;
function check_type(ext) {
    if (!ext.toLowerCase().endsWith(".png")) {
        alert("Please Select PNG file");
        return -1;
    }
    return 0;
}
const images = {};
async function select_image(up_btn, card) {
    up_btn.addEventListener("change", function () {
        if (this.files && this.files.length > 0) {
            const file = this.files[0];
            if (check_type(file.name) == -1) {
                this.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const preview_url = URL.createObjectURL(file);
                card.src = preview_url;
                card.onload = () => {
                    URL.revokeObjectURL(preview_url);
                };
                images[file.name] = reader.result;
            };
            reader.readAsArrayBuffer(file);
        }
    });
}
for (let card_no = 0; card_no < MAX_CARDS; card_no++) {
    const card = form.appendChild(document.createElement("img"));
    const up_btn = form.appendChild(document.createElement("input"));
    card.className = "card";
    up_btn.title = "Upload Character";
    up_btn.type = "file";
    select_image(up_btn, card);
}
const submit_btn = form.appendChild(document.createElement("button"));
submit_btn.type = "submit";
submit_btn.innerText = "Submit Letters";
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (const [name, buffer] of Object.entries(images)) {
        const blob = new Blob([buffer], { type: "image/png" });
        fd.append("files", blob, name);
    }
    const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: fd
    });
    console.log(await res.json());
});
