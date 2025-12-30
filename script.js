let produkList = [];
let adminLoginState = localStorage.getItem('adminLogin') === 'true';
let currentSearch = '';
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let categories = ['all', 'akun', 'situs', 'lainnya'];

function formatRupiah(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function sanitizeInput(input) {
    if (!input) return '';
    return input.toString()
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getCategoryDisplayName(category) {
    const names = {
        'all': 'Semua',
        'akun': '👤akun'
        'situs': '🌐situs'
        'lainnya': '📦lainnya'
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function initCategories() {
    const categoryFilter = document.querySelector('.category-filter');
    const inputKategori = document.getElementById('input-kategori');
    const editKategori = document.getElementById('edit-kategori');
    
    if (categoryFilter) {
        categoryFilter.innerHTML = '';
        categories.forEach(category => {
            const displayName = getCategoryDisplayName(category);
            const button = document.createElement('button');
            button.className = `category-btn ${category === 'all' ? 'active' : ''}`;
            button.dataset.category = category;
            button.textContent = displayName;
            button.onclick = () => filterByCategory(category);
            categoryFilter.appendChild(button);
        });
    }
    
    if (inputKategori) {
        inputKategori.innerHTML = '<option value="umum">Umum</option>';
        categories.filter(c => c !== 'all').forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = getCategoryDisplayName(category);
            inputKategori.appendChild(option);
        });
    }
    
    if (editKategori) {
        editKategori.innerHTML = '<option value="umum">Umum</option>';
        categories.filter(c => c !== 'all').forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = getCategoryDisplayName(category);
            editKategori.appendChild(option);
        });
    }
}

function compressImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const maxWidth = 800;
                const maxHeight = 600;
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    } else {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                const compressed = canvas.toDataURL('image/jpeg', 0.7);
                const base64Length = compressed.length - (compressed.indexOf(',') + 1);
                const padding = compressed.charAt(compressed.length - 2) === '=' ? 2 : 
                               compressed.charAt(compressed.length - 1) === '=' ? 1 : 0;
                const fileSize = base64Length * 0.75 - padding;
                
                if (fileSize > 500 * 1024) {
                    reject('Ukuran gambar terlalu besar setelah kompresi. Maksimal 500KB.');
                    return;
                }
                resolve(compressed);
            };
            img.onerror = () => reject('Gagal memuat gambar');
        };
        reader.onerror = () => reject('Gagal membaca file');
    });
}

function previewImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (!input.files || !input.files[0]) {
        preview.innerHTML = '<p>Pratinjau gambar akan muncul di sini</p>';
        return;
    }
    
    const file = input.files[0];
    if (!file.type.match('image.*')) {
        preview.innerHTML = '<p style="color:red;">File harus berupa gambar</p>';
        input.value = '';
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
        preview.innerHTML = '<p style="color:red;">Ukuran file maksimal 2MB</p>';
        input.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = event => {
        preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
}

function hapusGambarEdit() {
    document.getElementById('preview-edit').innerHTML = '<p>Gambar akan dihapus saat disimpan</p>';
    document.getElementById('edit-gambar').value = '';
}

async function loadFromFirestore() {
    try {
        showLoading(true);
        const produkRef = firebaseModules.collection(db, 'produk');
        const q = firebaseModules.query(produkRef, firebaseModules.orderBy('tanggal', 'desc'));
        const snapshot = await firebaseModules.getDocs(q);
        
        produkList = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            const tanggal = data.tanggal ? data.tanggal.toDate() : new Date();
            produkList.push({
                id: doc.id,
                ...data,
                tanggal: tanggal
            });
        });
        
        renderProduk();
        updateProductCount();
        updateCartCount();
        updateWishlistCount();
        showLoading(false);
    } catch (error) {
        console.error("Error loading products:", error);
        showLoading(false);
        document.getElementById('firebase-status').textContent = '❌ Error loading data';
        document.getElementById('firebase-status').style.color = '#dc3545';
    }
}

async function tambahProduk() {
    const nama = document.getElementById('input-nama').value.trim();
    const harga = parseInt(document.getElementById('input-harga').value);
    const nomor = document.getElementById('input-nomor').value.trim();
    const deskripsi = document.getElementById('input-deskripsi').value.trim();
    const kategori = document.getElementById('input-kategori').value;
    const gambarInput = document.getElementById('input-gambar');
    
    if (!nama || nama.length < 3) {
        showToast('Nama produk minimal 3 karakter!', 'error');
        return;
    }
    
    if (isNaN(harga) || harga < 1000 || harga > 10000000) {
        showToast('Harga harus antara Rp 1.000 - Rp 10.000.000!', 'error');
        return;
    }
    
    if (!/^62\d{9,12}$/.test(nomor)) {
        showToast('Nomor WA harus diawali 62 dan 10-13 digit angka!', 'error');
        return;
    }
    
    try {
        showLoading(true);
        let gambar = null;
        if (gambarInput.files[0]) {
            try {
                gambar = await compressImageToBase64(gambarInput.files[0]);
            } catch (error) {
                showToast(`Error kompresi gambar: ${error}`, 'error');
                showLoading(false);
                return;
            }
        }
        
        const produkBaru = {
            nama: sanitizeInput(nama),
            harga: harga,
            nomorWa: nomor,
            deskripsi: sanitizeInput(deskripsi) || '',
            kategori: kategori || 'umum',
            gambar: gambar,
            tanggal: firebaseModules.serverTimestamp(),
            createdAt: new Date().toISOString(),
            rating: 0,
            ratingCount: 0
        };
        
        await firebaseModules.addDoc(firebaseModules.collection(db, 'produk'), produkBaru);
        
        document.getElementById('input-nama').value = '';
        document.getElementById('input-harga').value = '';
        document.getElementById('input-nomor').value = '';
        document.getElementById('input-deskripsi').value = '';
        document.getElementById('input-kategori').value = 'umum';
        document.getElementById('input-gambar').value = '';
        document.getElementById('preview-tambah').innerHTML = '<p>Pratinjau gambar akan muncul di sini</p>';
        
        await loadFromFirestore();
        showToast(`✅ Produk "${nama}" berhasil ditambahkan!`);
    } catch (error) {
        console.error("Error adding product:", error);
        showToast('❌ Gagal menambah produk: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

function filterByCategory(category) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    renderProduk();
}

function addToCart(productId, quantity = 1) {
    const product = produkList.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            nama: product.nama,
            harga: product.harga,
            gambar: product.gambar,
            quantity: quantity
        });
    }
    
    updateCart();
    showToast(`✅ ${product.nama} ditambahkan ke keranjang`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showToast('🗑️ Produk dihapus dari keranjang');
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlist-count');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlist.length;
    }
}

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('❤️ Dihapus dari favorit');
    } else {
        wishlist.push(productId);
        showToast('❤️ Ditambahkan ke favorit');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderProduk();
    updateWishlistCount();
    renderWishlistItems();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const mainContent = document.getElementById('toko-container');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
        mainContent.classList.remove('shifted-right');
        overlay.classList.remove('active');
    } else {
        cartSidebar.classList.add('open');
        wishlistSidebar.classList.remove('open');
        mainContent.classList.remove('shifted-left');
        mainContent.classList.add('shifted-right');
        overlay.classList.add('active');
        renderCartItems();
    }
}

function toggleWishlistSidebar() {
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const cartSidebar = document.getElementById('cart-sidebar');
    const mainContent = document.getElementById('toko-container');
    const overlay = document.getElementById('overlay');
    
    if (wishlistSidebar.classList.contains('open')) {
        wishlistSidebar.classList.remove('open');
        mainContent.classList.remove('shifted-left');
        overlay.classList.remove('active');
    } else {
        wishlistSidebar.classList.add('open');
        cartSidebar.classList.remove('open');
        mainContent.classList.remove('shifted-right');
        mainContent.classList.add('shifted-left');
        overlay.classList.add('active');
        renderWishlistItems();
    }
}

function closeSidebars() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const mainContent = document.getElementById('toko-container');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.remove('open');
    wishlistSidebar.classList.remove('open');
    mainContent.classList.remove('shifted-left', 'shifted-right');
    overlay.classList.remove('active');
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Keranjang belanja kosong</p>';
        if (totalElement) totalElement.textContent = formatRupiah(0);
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.harga * item.quantity;
        total += itemTotal;
        
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-img">
                ${item.gambar ? `<img src="${item.gambar}" alt="${item.nama}">` : '<div style="background:#eee; width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#999;">🖼️</div>'}
            </div>
            <div class="cart-item-info">
                <h4 style="margin:0 0 5px 0; font-size:16px;">${item.nama}</h4>
                <p style="margin:0; color:#666; font-size:14px;">${formatRupiah(item.harga)}</p>
            </div>
            <div class="cart-item-actions">
                <input type="number" value="${item.quantity}" min="1" 
                    style="width:60px; padding:8px; text-align:center; border:1px solid #ddd; border-radius:4px;"
                    onchange="updateCartQuantity('${item.id}', this.value)">
                <button onclick="removeFromCart('${item.id}')" style="background:#dc3545; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer; font-size:14px;">
                    Hapus
                </button>
            </div>
        `;
        container.appendChild(div);
    });
    
    if (totalElement) totalElement.textContent = formatRupiah(total);
}

function renderWishlistItems() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Belum ada produk favorit</p>';
        return;
    }
    
    wishlist.forEach(productId => {
        const product = produkList.find(p => p.id === productId);
        if (!product) return;
        
        const div = document.createElement('div');
        div.className = 'wishlist-item';
        div.innerHTML = `
            <div class="wishlist-item-img">
                ${product.gambar ? `<img src="${product.gambar}" alt="${product.nama}">` : '<div style="background:#eee; width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#999;">🖼️</div>'}
            </div>
            <div class="wishlist-item-info">
                <h4 style="margin:0 0 5px 0; font-size:16px;">${product.nama}</h4>
                <p style="margin:0; color:#666; font-size:14px;">${formatRupiah(product.harga)}</p>
            </div>
            <div class="wishlist-item-actions">
                <button onclick="addToCart('${product.id}', 1)" style="background:#28a745; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer; font-size:14px;">
                    🛒
                </button>
                <button onclick="toggleWishlist('${product.id}')" style="background:#dc3545; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer; font-size:14px;">
                    ❌
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item && quantity > 0) {
        item.quantity = parseInt(quantity);
        updateCart();
    }
}

function checkoutCart() {
    if (cart.length === 0) {
        showToast('Keranjang kosong!', 'error');
        return;
    }
    
    let message = 'Halo, saya ingin membeli produk berikut:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        message += `📦 ${item.nama}\n`;
        message += `   Jumlah: ${item.quantity}\n`;
        message += `   Harga: ${formatRupiah(item.harga)} x ${item.quantity} = ${formatRupiah(item.harga * item.quantity)}\n\n`;
        total += item.harga * item.quantity;
    });
    
    message += `💵 *Total: ${formatRupiah(total)}*\n\n`;
    message += 'Mohon konfirmasi ketersediaan dan total pembayaran. Terima kasih!';
    
    const phoneNumber = '6281234567890';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    cart = [];
    updateCart();
    closeSidebars();
}

async function editProduk(index) {
    const product = produkList[index];
    if (!product) return;
    
    document.getElementById('edit-section').style.display = 'block';
    document.getElementById('edit-index').value = index;
    document.getElementById('edit-id').value = product.id;
    document.getElementById('edit-nama').value = product.nama;
    document.getElementById('edit-harga').value = product.harga;
    document.getElementById('edit-nomor').value = product.nomorWa;
    document.getElementById('edit-deskripsi').value = product.deskripsi || '';
    document.getElementById('edit-kategori').value = product.kategori || 'umum';
    
    const preview = document.getElementById('preview-edit');
    if (product.gambar) {
        preview.innerHTML = `<img src="${product.gambar}" alt="Gambar saat ini">`;
    } else {
        preview.innerHTML = '<p>Produk ini belum memiliki gambar</p>';
    }
    
    document.getElementById('edit-gambar').value = '';
    document.getElementById('edit-section').scrollIntoView({ behavior: 'smooth' });
}

async function simpanEdit() {
    const index = document.getElementById('edit-index').value;
    const 