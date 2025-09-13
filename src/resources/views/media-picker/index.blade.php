@extends('layouts.app') {{-- or your admin layout --}}

@section('title', 'Media Picker')

@section('content')
<div class="container-fluid">
    <h3 class="mb-3">Media Picker</h3>

    <div class="row">
        {{-- Sidebar for folders --}}
        <div class="col-md-3 border-end">
            <h6>Folders</h6>
            <ul id="folder-list" class="list-group mb-3">
                @foreach($folders as $folder)
                    <li class="list-group-item folder-item" data-folder="{{ $folder }}">
                        📁 {{ $folder }}
                    </li>
                @endforeach
            </ul>

            <form id="create-folder-form" class="d-flex">
                <input type="text" class="form-control me-2" id="new-folder-name" placeholder="New folder">
                <button type="submit" class="btn btn-primary btn-sm">+</button>
            </form>
        </div>

        {{-- Main content for files --}}
        <div class="col-md-9">
            <div class="d-flex justify-content-between mb-2">
                <h6>Files in <span id="current-folder">{{ $currentFolder }}</span></h6>
                <form id="upload-form" enctype="multipart/form-data">
                    <input type="file" id="upload-file" name="file" hidden>
                    <button type="button" class="btn btn-success btn-sm" onclick="document.getElementById('upload-file').click();">
                        Upload
                    </button>
                </form>
            </div>

            <div id="media-grid" class="row row-cols-5 g-3">
                @foreach($files as $file)
                    <div class="col">
                        <div class="card media-card" data-file="{{ $file['url'] }}">
                            @if($file['type'] === 'image')
                                <img src="{{ $file['url'] }}" class="card-img-top img-thumbnail" alt="">
                            @else
                                <div class="card-body text-center small">
                                    📄 {{ $file['name'] }}
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection

@push('styles')
<style>
    #media-picker-app {
        font-family: Arial, sans-serif;
        background: #fff;
        color: #333;
    }

    #media-picker-app .row {
        display: flex;
        gap: 20px;
    }

    #media-picker-app .col {
        flex: 1;
    }

    #media-picker-app .border {
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 10px;
    }

    #media-picker-app .media-card {
        border: 1px solid #ddd;
        padding: 5px;
        cursor: pointer;
        text-align: center;
    }

    #media-picker-app .media-card:hover {
        border: 2px solid #007bff;
    }

    #media-picker-app .media-card.selected {
        border: 2px solid #007bff;
        background: #eef7ff;
    }

    #media-picker-app .folder-item {
        padding: 8px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
    }

    #media-picker-app .folder-item:hover {
        background: #f1f1f1;
    }

    #media-picker-app .folder-item.active {
        background: #007bff;
        color: #fff;
    }
</style>
@endpush


@push('scripts')
<script>
document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("media-picker-app");
    if (!root) return;

    let selectedFile = null;
    let targetInput = "{{ request('target') }}";

    // File selection
    root.querySelectorAll(".media-card").forEach(card => {
        card.addEventListener("click", function () {
            root.querySelectorAll(".media-card").forEach(c => c.classList.remove("selected"));
            this.classList.add("selected");
            selectedFile = this.dataset.file;

            if (window.opener && targetInput && selectedFile) {
                window.opener.document.getElementById(targetInput).value = selectedFile;
                window.close();
            }
        });
    });

    // Folder navigation
    root.querySelectorAll(".folder-item").forEach(item => {
        item.addEventListener("click", function () {
            let folder = this.dataset.folder;
            window.location.href = "/media-picker?folder=" + folder + "&target=" + targetInput;
        });
    });

    // Upload
    root.querySelector("#upload-btn")?.addEventListener("click", function () {
        root.querySelector("#upload-file").click();
    });

    root.querySelector("#upload-file")?.addEventListener("change", function () {
        let formData = new FormData();
        formData.append("file", this.files[0]);
        formData.append("folder", root.querySelector("#current-folder").innerText);

        fetch("{{ route('media-picker.upload') }}", {
            method: "POST",
            headers: { "X-CSRF-TOKEN": "{{ csrf_token() }}" },
            body: formData
        }).then(res => res.json()).then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert(data.message || "Upload failed");
            }
        });
    });

    // Create folder
    root.querySelector("#create-folder-form")?.addEventListener("submit", function (e) {
        e.preventDefault();
        let folderName = root.querySelector("#new-folder-name").value;
        if (!folderName) return;

        fetch("{{ route('media-picker.create-folder') }}", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": "{{ csrf_token() }}",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ folder: folderName })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert(data.message || "Failed to create folder");
            }
        });
    });
});
</script>
@endpush