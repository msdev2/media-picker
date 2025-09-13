document.addEventListener("DOMContentLoaded", () => {
    const picker = document.querySelector(".media-picker");
    if (!picker) return;

    // Upload file
    const uploadInput = picker.querySelector("#media-upload-input");
    const uploadBtn   = picker.querySelector("#media-upload-btn");

    if (uploadBtn && uploadInput) {
        uploadBtn.addEventListener("click", () => uploadInput.click());
        uploadInput.addEventListener("change", async () => {
            if (!uploadInput.files.length) return;

            const file = uploadInput.files[0];
            const folder = picker.dataset.folder;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", folder);

            const res = await fetch(picker.dataset.uploadUrl, {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
                }
            });

            const data = await res.json();
            if (data.success) {
                alert("Uploaded!");
                location.reload();
            } else {
                alert("Upload failed: " + (data.message || "Unknown error"));
            }
        });
    }

    // Folder creation
    const folderBtn = picker.querySelector("#create-folder-btn");
    if (folderBtn) {
        folderBtn.addEventListener("click", async () => {
            const folderName = prompt("Enter folder name:");
            if (!folderName) return;

            const res = await fetch(picker.dataset.folderUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ folder: folderName })
            });

            const data = await res.json();
            if (data.success) {
                location.reload();
            } else {
                alert("Error: " + (data.message || "Unknown error"));
            }
        });
    }
});
