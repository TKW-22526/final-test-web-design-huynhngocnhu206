

 /* Tìm kiếm sản phẩm theo tên */
function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {
        const keyword = this.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const name = card.querySelector("h3").innerText.toLowerCase();
            card.style.display = name.includes(keyword) ? "block" : "none";
        });
    });
}

/*
 Mở modal thêm sản phẩm */
function addProduct() {
    document.getElementById("productModal").style.display = "flex";
}

/**
 * Đóng modal thêm sản phẩm
 */
function closeModal() {
    document.getElementById("productModal").style.display = "none";
    // Xóa dữ liệu cũ trong form
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productDesc").value = "";
}

/**
 * Lưu sản phẩm mới vào danh sách
 */
function saveProduct() {
    const name  = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const img   = document.getElementById("productImage").value.trim();
    const desc  = document.getElementById("productDesc").value.trim();

    if (!name || !price) {
        alert("Vui lòng nhập tên và giá sản phẩm!");
        return;
    }

    const defaultImg = "../assets/cachua.webp";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${img || defaultImg}" alt="${name}">
        <h3>${name}</h3>
        <p>${price}</p>
        <button class="detail-btn" onclick="showDetail('${name}', '${price}', '${desc}', '${img || defaultImg}')">Chi tiết</button>
        <div class="actions">
            <button class="edit-btn" onclick="editProduct(this)">Sửa</button>
            <button class="delete-btn" onclick="deleteProduct(this)">Xóa</button>
        </div>
    `;

    document.querySelector(".product-list").prepend(card);
    closeModal();
}

/**
 * Chuyển đến trang chi tiết sản phẩm
 */
function showDetail(name, price, desc, img) {
    const params = new URLSearchParams({ name, price, desc, img });
    window.location.href = "chi-tiet.html?" + params.toString();
}

/**
 * Xóa sản phẩm khỏi danh sách
 */
function deleteProduct(btn) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    const card = btn.closest(".card");
    card.remove();
}

/**
 * Sửa tên và giá sản phẩm
 */
function editProduct(btn) {
    const card     = btn.closest(".card");
    const nameTag  = card.querySelector("h3");
    const priceTag = card.querySelector("p");

    const newName  = prompt("Nhập tên mới:", nameTag.innerText);
    const newPrice = prompt("Nhập giá mới:", priceTag.innerText);

    if (newName  !== null && newName.trim())  nameTag.innerText  = newName.trim();
    if (newPrice !== null && newPrice.trim()) priceTag.innerText = newPrice.trim();
}



/**
 * Đọc tham số URL và hiển thị thông tin sản phẩm
 */
function initChiTiet() {
    const nameEl  = document.getElementById("name");
    if (!nameEl) return; // Không phải trang chi tiết

    const params = new URLSearchParams(window.location.search);

    document.getElementById("name").textContent  = params.get("name")  || "Không rõ";
    document.getElementById("price").textContent = "Giá: " + (params.get("price") || "");
    document.getElementById("desc").textContent  = params.get("desc")  || "";
    document.getElementById("img").src           = params.get("img")   || "";
}

/* ================================================
   TRANG LIÊN HỆ - lien-he.html
   ================================================ */

/**
 * Xử lý gửi form phản hồi
 */
function initContactForm() {
    const form = document.querySelector(".form-contact form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ liên hệ sớm nhất có thể.");
        form.reset();
    });
}

/* ================================================
   KHỞI CHẠY KHI TRANG TẢI XONG
   ================================================ */
document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    initChiTiet();
    initContactForm();
});