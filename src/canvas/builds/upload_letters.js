"use strict";
const form = document.getElementById("container");
const MAX_CARDS = 5;
function check_type(ext) {
    if (!ext.toLowerCase().endsWith(".png")) {
        alert("Please Select PNG file");
        return -1;
    }
    return 0;
}
const images = {};
for (let card_no = 0; card_no < MAX_CARDS; card_no++) {
    const card = form.appendChild(document.createElement("img"));
    const up_btn = form.appendChild(document.createElement("input"));
    card.className = "card";
    up_btn.innerHTML = `Upload Character`;
    up_btn.type = "file";
    up_btn.addEventListener("change", function () {
        if (this.files && this.files.length > 0) {
            const fileName = this.files[0].name;
            if (check_type(fileName) == -1) {
                this.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a, _b;
                card.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                images[`${fileName}`] = (_b = e.target) === null || _b === void 0 ? void 0 : _b.result;
            };
            reader.readAsDataURL(this.files[card_no]);
        }
    });
}
console.log(images);
const submit_btn = form.appendChild(document.createElement("button"));
submit_btn.innerText = "Submit Letters";
form.addEventListener("submit", () => {
    console.log("hello");
});
