"use strict";
const form = document.getElementById("container");
const chars = [
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a-z
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
    ...Array.from({ length: 10 }, (_, i) => String(i)) // 0-9
];
const MAX_CARDS = chars.length;
function check_type(ext) {
    if (!ext.toLowerCase().endsWith(".png")) {
        alert("Please Select PNG file");
        return -1;
    }
    return 0;
}
const images = {};
async function select_image(up_btn, card, card_no) {
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
                console.log(chars[card_no]);
                images[chars[card_no]] = reader.result;
            };
            reader.readAsArrayBuffer(file);
        }
    });
}
for (let card_no = 0; card_no < MAX_CARDS; card_no++) {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    const label = document.createElement("p");
    label.textContent = `Upload "${chars[card_no]}"`;
    const card = document.createElement("img");
    card.className = "card";
    const up_btn = document.createElement("input");
    up_btn.type = "file";
    up_btn.name = "files";
    wrapper.appendChild(label);
    wrapper.appendChild(card);
    wrapper.appendChild(up_btn);
    form.appendChild(wrapper);
    select_image(up_btn, card, card_no);
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
    // console.log(await res.json())
    if (res.redirected) {
        window.location.href = res.url;
    }
});
