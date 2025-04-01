const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal(option = {}) {
    // phân rã các thuộc tính của object
    const { templateId, closeMethod = ["button", "overlay", "escape"] } =
        option;

    const template = $(`#${templateId}`);

    this._closeButton = closeMethod.includes("button");
    this._closeOverlay = closeMethod.includes("overlay");
    this._closeEscape = closeMethod.includes("escape");
    // xây dựng cấu trúc html
    this._build = () => {
        const content = template.content.cloneNode(true);
        this._backDrop = document.createElement("div");
        this._backDrop.className = "backdrop-modal";
        const containerModal = document.createElement("div");
        containerModal.className = "container-modal";

        if (this._closeButton) {
            const btnClose = document.createElement("button");
            btnClose.className = "close-modal";
            btnClose.innerHTML = "&times;";

            containerModal.append(btnClose);

            btnClose.onclick = () => this.close();
        }

        const contentModal = document.createElement("div");
        contentModal.className = "content-modal";
        contentModal.append(content);

        // chuẩn cấu trúc và xây dựng vào dom
        this._backDrop.appendChild(containerModal);
        containerModal.append(contentModal);

        document.body.append(this._backDrop);
    };
    this.open = () => {
        this._build();

        setTimeout(() => {
            this._backDrop.classList.add("show");
        }, 0);

        if (this._closeEscape) {
            this._backDrop.onclick = (e) => {
                if (e.target === this._backDrop) {
                    this.close();
                }
            };
        }

        if (this._closeOverlay) {
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    this.close();
                }
            });
        }
    };
    this.close = () => {
        this._backDrop.classList.remove("show");
        this._backDrop.ontransitionend = () => {
            this._backDrop.remove();
        };
    };
}

export default Modal;
