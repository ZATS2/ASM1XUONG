const URL_API = `http://localhost:3000`;
const lay_loai = async () => {
    let loai_arr;
    loai_arr = await fetch(URL_API + `/loai`).then(res => res.json()).then(d => d);
    let str = `<li><a href="index.html">Trang chủ</a></li>`;
    loai_arr.forEach(loai => {
        str += `<li><a href="sptrongloai.html?id=${loai.id}"> ${loai.ten_loai} </a></li>`;
    });
    return `<ul>${str}</ul>`;
};
const lay_ten_loai = async (id) => {
    let loai;
    try {
        loai = await fetch(URL_API + `/loai/${id}`).then(res => res.json()).then(d => d);
    }
    catch (err) {
        return `Không có .  (Không có loại ${id})`;
    }
    ;
    return `${loai.ten_loai}`;
};
const code_mot_sp = (sp) => {
    return `
    <div class="swiper-slide sp">
      <div class="product-card position-relative">
        <div class="image-holder">
          <img src="${sp.image}" alt="product-item" class="img-fluid" style="width: 310px; height: 418px;">
        </div>
        <div class="cart-concern position-absolute">
          <div class="cart-button d-flex">
            <a href="#" class="btn btn-medium btn-black">Add to Cart
              <svg class="cart-outline">
                <use xlink:href="#cart-outline"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
          <h3 class="card-title text-uppercase">
            <a href="/san_pham/${sp.id}">${sp.title}</a>
          </h3>
          <span class="item-price text-primary">${sp.price}$</span>
        </div>
      </div>
    </div>`;
};
const getProductIDFromURL = () => {
    const pathParts = window.location.pathname.split('/');
    return parseInt(pathParts[pathParts.length - 1]);
};
const lay_sp_moi = async (so_sp = 6) => {
    let sp_arr;
    let url = URL_API + `/san_pham?_sort=-ngay&_limit=${so_sp}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
const lay_sp_hot = async (so_sp = 6) => {
    let sp_arr;
    let url = URL_API + `/san_pham?hot=1&_limit=${so_sp}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
const lay_sp_trong_loai = async (id) => {
    let sp_arr;
    let url = URL_API + `/san_pham?id_loai=${id}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
const code_mot_bv = (bv) => {
    return `
 <div class="col-lg-4 col-sm-12 bv">
            <div class="card border-none me-3">
              <div class="card-image">
                <img src="${bv.hinh}" alt="" class="img-fluid">
              </div>
            </div>
            <div class="card-body text-uppercase">
              <div class="card-meta text-muted">
                <span class="meta-date">${bv.ngay}</span>
              </div>
              <h3 class="card-title">
                <a href="#">${bv.tieu_de}</a>
              </h3>
            </div>
          </div>`;
};
const lay_bai_viet_moi = async (so_bv = 6) => {
    let bv_arr;
    let url = URL_API + `/bai_viet?_sort=-ngay&_limit=${so_bv}`;
    bv_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    bv_arr.forEach(bv => str += code_mot_bv(bv));
    return str;
};
const lay_binh_luan = async (so_bl = 6) => {
    let url = URL_API + `/binh_luan?_sort=-ngay&_limit=${so_bl}`;
    let bl_arr;
    bl_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    bl_arr.forEach(bl => str += `<div class="bl">
        <h5>${bl.ho_ten}  
            <span> ${new Date(bl.ngay).toLocaleDateString("vi")} ${new Date(bl.ngay).toLocaleTimeString("vi")} </span>
        </h5>
        <p>${bl.noi_dung}</p>
    </div>`);
    return str;
};
export { lay_loai, lay_sp_moi, lay_sp_hot, lay_bai_viet_moi, lay_binh_luan, getProductIDFromURL };
export { lay_sp_trong_loai, lay_ten_loai };
