const GS_ID = "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc";
const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);
// load colors
fetchSheet
  .fetch({
    gSheetId: GS_ID,
    wSheetName: "colors",
  })
  .then((rows) => {
    rows.forEach(row => document.documentElement.style.setProperty("--color-" + row.id, row.color));

    // also update svg colors
    document.querySelector("#decorator-bg > stop:nth-child(1)").setAttribute("stop-color", rows.find(row => row.id == "gradient-1").color);
    document.querySelector("#decorator-bg > stop:nth-child(2)").setAttribute("stop-color", rows.find(row => row.id == "gradient-2").color);
  });

// load content
fetchSheet
  .fetch({
    gSheetId: GS_ID,
    wSheetName: "sum",
  })
  .then((rows) => {
    let content = {};
    rows.forEach(row => {
      let key = row.section;
      Object(content).hasOwnProperty(key) || Object.assign(content, { [key]: [] });
      content[key].push(row);
    });
    // header 

    // logo
    let logos = content.logo[0];
    $(".header_navbar img").attr("src", logos.row1);
    $(window).on("scroll", function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 20) {
        $(".header_navbar").removeClass("sticky");
        $(".header_navbar img").attr("src", logos.row1);
      } else {
        $(".header_navbar").addClass("sticky");
        $(".header_navbar img").attr("src", logos.row2);
      }
    });

    // nav items
    let navHtml = "";
    let htitleHtml1 = "";
    let htitleHtml2 = "";

    content.nav.forEach(row => {
      navHtml += `
        <li class="nav-item">
          <a class="page-scroll" href="${row.row2}" target="_self">${row.row1}</a>
        </li>
      `;
    });
    document.querySelector("#nav").innerHTML = navHtml;
    content.header1.forEach(row => {
      htitleHtml1 += `
      <div id="home" class="header_hero d-lg-flex align-items-center">
        <div class="header-svg"><img class="htitle-img" src="${row.row2}"></div>
        <div class="container">
          <div class="row justify-content-end">
            <div class="col-lg-6">
              <div class="header_hero_content mt-45">
                <h2 class="header_title wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.2s">${row.row1}
                </h2>
                <div class="wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.6s">
                  <p class="htitle-p">${row.row3}</p>
                </div>
                <div><a class="htitle-link" href="#benefit">${row.row4}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    content.header2.forEach(row => {
      htitleHtml2 += `
      <div id="home" class="header_hero d-lg-flex align-items-center">
        <div class="header-svg"><img class="htitle-img" src="${row.row2}"></div>
        <div class="container">
          <div class="row justify-content-start">
            <div class="col-lg-8">
              <div class="header_hero_content mt-45">
                <h2 class="header_title wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.2s">${row.row1}
                </h2>
                <div class="wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.6s">
                  <p class="htitle-p">${row.row3}</p>
                </div>
                <div><a class="htitle-link button-onlclick">${row.row4}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    document.querySelector(".slickkkk").innerHTML = htitleHtml1 + htitleHtml2;

    $(".slickkkk").slick({
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
    });



    $(function () {
      $('a.page-scroll[href*="#"]:not([href="#"])').on("click", function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

          if (target.length) {
            $("html, body").animate({ scrollTop: target.offset().top - 50, }, 1200, "easeInOutExpo");
            return false;
          }
        }
      });
    });

    // video

    document.querySelector("#video iframe").src = content.srcVideo[content.srcVideo.length - 1].row1;
    let videoHtml = "";
    content.homeStory.forEach((row) => {
      videoHtml += `<p class="video-story">${row.row1}</p><br>`;
    });

    document.querySelector("#video-story").innerHTML = videoHtml;

    // prize

    let noteHtml = "";
    let prizeHtml = "";
    content.prizenote.forEach((row) => {
      noteHtml += `<div class="prize-note"><p><span><strong>${row.row1}</strong></span>`;
      row.row2.split("\n").forEach((note) => {
        noteHtml += ` ${note}<br>`
      });
      noteHtml += `</p></div>`
    });
    content.prizecontent.forEach((row) => {
      prizeHtml += `<div class="prize-giai col-xl-6">
      <div class="prize-giai-chil">
      <img class="prize-img" src="${row.row3}">
      <div class="content">
        <p>${row.row2}</p>
      </div>
      <div class="bottom">
        <div class="bottom-1"><h1>${row.row4}</h1></div>
        <div class="bottom-2">
          <h4>${row.row1}</h4>
          <p>${row.row5}</p>
        </div>
      </div>
      </div>
    </div>`;
    });
    document.querySelector("#prizecontent").innerHTML = prizeHtml;
    document.querySelector("#noteHtml").innerHTML = noteHtml;
    // footer
    let footertop = "";
    content.footerTop.forEach((row) => {
      footertop += `
      <h1 class="footer-top_title">${row.row1}</h1>
      <div class="footer-top_link">
        <a href="#benefit">${row.row2}</a>
      </div>
      `
    })
    document.querySelector('#footer-top').innerHTML = footertop
    var footermid = ""
    footermid += `
    <div class="row footer-mid">
      <div class="col-lg-12 content">
        <h2 class="title-h4" style="font-size: 36px;text-align: center;">`
    footermid += content.footerIntro[content.footerIntro.length - 1].row1
    footermid += `
        </h2>
      </div>
    </div>`
    document.querySelector("#footer-mid").innerHTML = footermid;

    let footerList1 = `<ul class="footer-list">`;
    let footerList2 = `<ul class="footer-list">`;
    let footerList3 = `<ul class="footer-list">`;
    let footerList4 = `<ul class="footer-list">`;
    content.liContent.forEach((row) => {
      footerList1 += `<li><a class="links1" href="">${row.row1}</a></li>`
      footerList2 += `<li><a class="links2" href="">${row.row2}</a></li>`
      footerList3 += `<li><a class="links3" href="">${row.row3}</a></li>`
      if (row.row4 == "") {
        footerList4 += ``
      }
      else {
        footerList4 += `<li><a class="links4" href="">${row.row4}</a></li>`
      }
    });
    footerList1 += ` </ul>`
    footerList2 += ` </ul>`
    footerList3 += ` </ul>`
    document.querySelector("#footer-list-1").innerHTML = footerList1;
    document.querySelector("#footer-list-2").innerHTML = footerList2;
    document.querySelector("#footer-list-3").innerHTML = footerList3;
    content.liLink.forEach((row, index) => {
      var indexlink1 = document.querySelectorAll('.links1')
      var hrefLink1 = `${row.row1}`
      indexlink1[index].setAttribute('href', hrefLink1)
      var indexlink2 = document.querySelectorAll('.links2')
      var hrefLink2 = `${row.row2}`
      indexlink2[index].setAttribute('href', hrefLink2)
      var indexlink3 = document.querySelectorAll('.links3')
      var hrefLink3 = `${row.row3}`
      indexlink3[index].setAttribute('href', hrefLink3)
    });
    footerList4 += `<div>`
    content.contact.forEach((row) => {
      footerList4 += `<a href="${row.row5}"><i class="bi bi-${row.row4}"></i></a>`
    });
    footerList4 += ` </div></ul>`
    document.querySelector("#footer-list-4").innerHTML = footerList4;
    var boxHiden = '';
    content.Boxdetail.forEach((row, i) => {
      boxHiden += `
      <div class="element-hidden-detail container boxdetail" style="display: none;" index="${i}">
    <div class="wrapper">
      <div class="table premium">
        <div class="ribbon"><span>150% giá trị</span></div>
        <div class="price-section">
          <div class="price-area">
            <div class="inner-area">
              <img src="${row.row1}" style="width: 80%;object-fit: cover;height: 80%;">
            </div>
          </div>
          <div class="prite-title"><h1>${row.row2}</h1></div>
        </div>
        <div class="package-name"></div>
        <table class="features">
          <tr>
            <th class="list-name">Lợi ích của nhà đầu tư</th>
            <th class="icon check">Trị giá</th>
            <th class="icon check">Hạn sử dụng</th>
          </tr>
          <tr>
            <td class="list-name">Voucher sử dụng các sản phẩm tại Biệt thự sách</td>
            <td class="icon check">5.000.000vnd</td>
            <td class="icon check">12 tháng</td>
          </tr>
          <tr>
            <td class="list-name">Voucher học tiếng anh tại Talks English</td>
            <td class="icon check">5.000.000vnd</td>
            <td class="icon check">12 tháng</td>
          </tr>
          <tr>
            <td class="list-name">5000 cổ phiếu trị giá 10.000vnd / cổ phiếu</td>
            <td class="icon check">5.000.000vnd</td>
            <td class="icon check">12 tháng</td>
          </tr>
          <tr>
            <td class="list-name">khi Công ty được niêm yến trên sàn chứng khoán</td>
            <td class="icon check">5.000.000vnd</td>
            <td class="icon check">12 tháng</td>
          </tr>
          <tr>
            <td class="list-name">Được ưu tiên đầu tư cho Hệ thống Biệt thự sách</td>
            <td class="icon check">5.000.000vnd</td>
            <td class="icon check">12 tháng</td>
          </tr>
        </table>
        <div class="btn">
          <div>
            <h2>Giá bán 10.000.000 đ</h2>
            <h4>Giá trị mà bạn nhân được: 15.000.000vnd</h4>
          </div>
          <a class="bt" href="pay.html"><span>Tham gia ngay</span></a>
        </div>
      </div>
    </div>     
    </div> `
    });
    document.querySelector('#hiddendetail').innerHTML = boxHiden;
    var box1412c1 = ''

    box1412c1 += `
    <section id="Box_1412c">
  <div class="background" style="display: none;"></div>
  <div class="box container" style="display: none;">
    <h1 class="title" style="display: block">Tham gia chương trình</h1>
    <div class="dots">
      <div class="dot d1">
        <p>1</p>
      </div>
      <span class="line" style="background-color: rgb(169, 169, 169);">
        <p></p>
      </span>
      <div class="dot d2">
        <p>2</p>
      </div>
      <span class="line" style="background-color: rgb(169, 169, 169);">
        <p></p>
      </span>
      <div class="dot d3">
        <p>3</p>
      </div>
      <span class="line" style="background-color: rgb(169, 169, 169);">
        <p></p>
      </span>
      <div class="dot d4">
        <p>4</p>
      </div>
    </div>
    <div class="contenttitle" style="display: flex">
      <div class="row" style="height: 100%;">
        <div class="col-lg-6 left">
          <div>
            <div class="detailname">
              <img src="./assets/images/b2.png">
              <h1>Gói lan tỏa</h1>
            </div>
            <div class="detailmon">
              <h1>Giá gói: 1.000.000 vnđ</h1>
              <p>Giá trị nhận được: 2.000.000 vnđ</p>
            </div>
            <div class="position">
              <div class="tempotitle">
                <h4>Tổng: 1200000 vnđ</h4>
                <p>40%</p>
              </div>
              <div class="tempodiv">
                <div style="width: 40%;"></div>
              </div>
              <div class="tempotime"><i class="bi bi-alarm-fill"></i>
                <p>Còn lại 365 ngày</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 right">
          <h1>Đồng hành<br><span>Nâng cao tư duy Việt<br> cùng Biệt Thự Sách</span></h1>
          <p>Vui lòng thực hiện đủ các bước*</p>
          <div class="button">
            <button class="out">Thoát</button>
            <button class="next start" style="margin-left: 20px;">Bắt đầu ngay</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content infor">
      <div class="col-lg-6 left">
        <h1>Thông tin cá nhân</h1>
        <div class="acc">
          <input id="ip1" name="name" class="acc-input d1" type="text" placeholder=" " class="px-2 pt-1 pb-1" />
          <label id="la1" class="acc-label 1" for="name">Tên*</label>
        </div>
        <div class="acc">
          <input id="ip2" name="phone" class="acc-input d2" type="text" placeholder=" " class="px-2 pt-1 pb-1" />
          <label id="la2" class="acc-label 2" for="name">Số điện thoại*</label>
        </div>
        <div class="acc">
          <input id="ip2" name="email" class="acc-input d3" type="email" placeholder=" " class="px-2 pt-1 pb-1" />
          <label id="la2" class="acc-label 2" for="name">Email*</label>
        </div>
        <div class="button">
          <button class="back">Quay lại</button>
          <button class="next" style="margin-left: 20px;">Tiếp theo</button>
        </div>
      </div>
      <div class="col-lg-6 right">
        <div>
          <div class="position">
            <img src="./assets/images/b2.png">
            <h1>Gói tri kỉ</h1>
          </div>
          <div class="main">
            <h1>Những đặc quyền của bạn</h1>
            <ul>
              <li><i class="bi bi-check"></i>Voucher sử dụng các sản phẩm tại Biệt thự sách</li>
              <li><i class="bi bi-check"></i> margin-top: 10px;</li>
              <li><i class="bi bi-check"></i>Voucher sử dụng các sản phẩm tại Biệt thự sách</li>
              <li><i class="bi bi-check"></i>Voucher học tiếng anh tại Talks English</li>
              <li><i class="bi bi-check"></i>5000 cổ phiếu trị giá 10.000vnd / cổ phiếu khi Công ty được niêm yến trên
                sàn chứng khoán</li>
              <li><i class="bi bi-check"></i>Được ưu tiên đầu tư cho Hệ thống Biệt thự sách</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content policy">
      <div class="row">
        <div class="col-lg-12 main">
          <h1>Chính sách của chúng tôi</h1>
          <p>Chào mừng Quý khách đến với nền tảng TENTEN.VN (bao gồm website và ứng dụng di động TENTEN.VN) được vận
            hành bởi Công ty cổ phần GMO-Z.com RUNSYSTEM và các công ty liên kết (gọi riêng và gọi chung là,
            "TENTEN.VN", "chúng tôi", hay "của chúng tôi"). TENTEN.VN nghiêm túc thực hiện trách nhiệm của mình liên
            quan đến bảo mật thông tin theo các quy định về bảo vệ bí mật thông tin cá nhân của pháp luật Việt Nam
            (“Nghị định 13/2023/NĐ-CP của Chính Phủ”) và cam kết tôn trọng quyền riêng tư và sự quan tâm của tất cả
            người dùng đối với website và ứng dụng di động của chúng tôi (“Nền tảng”) (chúng tôi gọi chung các nền
            tảng và các dịch vụ chúng tôi cung cấp như được mô tả trong nền tảng của chúng tôi là "các dịch vụ").
            Người dùng có nghĩa là người đăng ký tài khoản với chúng tôi để sử dụng các dịch vụ, bao gồm cả người mua
            và người bán (Đại lý) (gọi chung và gọi riêng là “Các Người Dùng”, “Quý khách” hoặc “của Quý khách”).
            Chúng tôi nhận biết tầm quan trọng của dữ liệu cá nhân mà Quý khách đã tin tưởng giao cho chúng tôi và tin
            rằng chúng tôi có trách nhiệm quản lý, bảo vệ và xử lý dữ liệu cá nhân của Quý khách một cách thích hợp.
            Chính sách bảo mật này ("Chính sách bảo mật" hay "Chính sách") được thiết kế để giúp Quý khách hiểu được
            cách thức chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân mà Quý khách đã cung cấp cho
            chúng tôi và/hoặc lưu giữ về Quý khách, cho dù là hiện nay hoặc trong tương lai, cũng như để giúp Quý
            khách đưa ra quyết định sáng suốt trước khi cung cấp cho chúng tôi bất kỳ dữ liệu cá nhân nào của Quý
            khách.

            1.2. "Dữ Liệu Cá Nhân" hay "dữ liệu cá nhân" có nghĩa là dữ liệu, dù đúng hay không, về một cá nhân mà
            thông qua đó có thể được xác định được danh tính, hoặc từ dữ liệu đó và thông tin khác mà một tổ chức có
            hoặc có khả năng tiếp cận. Các ví dụ thường gặp về dữ liệu cá nhân có thể gồm có tên, số chứng minh nhân
            dân và thông tin liên hệ.

            1.3. Bằng việc sử dụng các dịch vụ, đăng ký một tài khoản với chúng tôi hoặc truy cập nền tảng, Quý khách
            xác nhận và đồng ý rằng Quý khách chấp nhận các phương pháp, yêu cầu, và/hoặc chính sách được mô tả trong
            Chính sách bảo mật này, và theo đây Quý khách xác nhận Quý khách đã biết rõ và đồng ý toàn bộ cho phép
            chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của Quý khách như mô tả trong đây. Nếu
            chúng tôi thay đổi Chính sách bảo mật của mình, bao gồm cả thông qua việc đăng tải những thay đổi đó hoặc
            Chính sách bảo mật sửa đổi trên nền tảng của chúng tôi; Trong phạm vi pháp luật cho phép, việc tiếp tục sử
            dụng các dịch vụ hoặc nền tảng, bao gồm giao dịch của Quý khách, được xem là Quý khách đã công nhận và
            đồng ý với các thay đổi trong Chính Sách Bảo Mật này.

            1.4. Chính sách này áp dụng cùng với các thông báo, điều khoản hợp đồng, điều khoản chấp thuận khác áp
            dụng liên quan đến việc chúng tôi thu thập, lưu trữ, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của
            Quý khách và không nhằm ghi đè những thông báo hoặc các điều khoản đó trừ khi chúng tôi có tuyên bố ràng
            khác.

            1.5. Chính sách này được áp dụng cho cả Người bán (Đại lý) và Người mua đang sử dụng dịch vụ trừ khi có
            tuyên bố rõ ràng ngược lại.</p>
          <div><input type="checkbox">
            <p>Xác nhận bạn có đồng ý với chính sách của chúng tôi</p>
          </div>
        </div>
      </div>
      <div class="button">
        <button class="back">Quay lại</button>
        <button class="next">Tiếp theo</button>
      </div>
    </div>
    <div class="content pay">
      <div class="row">
        <div class="col-lg-8 left">
          <div>
            <h1>Thông tin gói</h1>
            <div class="table">
              <div class="acc">
                <h1>Tên gói</h1>
                <h1>Số tiền phải trả</h1>
              </div>
              <div>
                <h1>Gói tri kỉ<br><span>(gói gọi vốn từ Biệt Thự Sách)</span></h1>
                <h1>2.000.000 vnđ</h1>
              </div>
            </div>
            <h1>Thông tin người nhận</h1>
            <ul class="form-list">
              <li>Chuyển khoản ngân hàng MB Bank ( Không mất phí
                thanh toán )<br>
                Thông tin người nhận:<br>
                *Name: DINH MINH QUYEN<br>
                *STK: 0903 020 123</li>
              <li>Thanh toán Onecom: Thanh toán bằng thẻ Visa
                hoặc Master Card ( Phí thanh toán 0.29$ )</li>
              <li>Thanh toán Paypal ( Phí thanh toán $ 0.29 )</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 right">
          <div>
            <h1>Mã Qr</h1>
            <div class="img">
              <img src="https://i.pinimg.com/736x/dc/e1/32/dce1321615bf9267e5a73ed6555c4297.jpg">
            </div>
            <div class="button">
              <button class="back">Quay lại</button>
              <button class="next">Tiếp theo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content paysus">
      <div class="row">
        <div class="col-lg-6 left">
          <div class="alert">
            <h1><i class="bi bi-check-circle-fill"></i>Đóng góp thành công !</h1>
            <p>Cảm ơn bạn đã đóng góp cho chúng tôi</p>
          </div>
          <div class="button">
            <button class="back">Quay lại</button>
            <button class="suc">Hoàn thành</button>
          </div>
        </div>
        <div class="col-lg-6 right">
          <img id="box1412c2" src="./assets/images/414953521_793318252837099_8762419459066853807_n.jpg" alt="">
          <img id="box1412c1" src="assets/images/415915580_793344296167828_4445337624631445347_n.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</section>`

    document.querySelector('#hidenBox1412c1').innerHTML = box1412c1

    vam('#Box_1412c .start').addEventListener('click',()=>{
      vam('#Box_1412c .title').setAttribute('style','display: none')
    })
  
  });




/* load nội dung các gói đóng góp */

fetchSheet
  .fetch({
    gSheetId: "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc",
    wSheetName: "home",
    range: "B11:K15",
  })
  .then(rows => {
    let timelineHtml = '';
    rows.forEach((row, i) => {

      timelineHtml += `
              <div class="card-wrap col-lg-4 col-xl-6 col-12 wow fadeInUp" data-wow-delay="0.2s">
              <div class="card">
              <div class="top">
                <div class="title"><p>${row.Feature}</p></div>
                <div class="price-sec">
                  <span class="price">${row.moneyin.split("").reverse().slice(8).reverse().join("")}</span>
                  <span class="decimal">${row.moneyin.split("").reverse().slice(0, 8).reverse().join("")} ${row.unit}</span>
                </div>
              </div>
              <div class="info"><p>Tổng giá trị nhận lại </p><span>${row.moneyout} ${row.unit}</span></div>
              
              <div class="details">`
      Object.keys(row).slice(4).forEach(key => {
        timelineHtml += `<div class="one"><span>${key}</span> ${row[key] == "TRUE" ? `<i class="fas fa-check"></i>` : `<i class="fas fa-times"></i>`}</div>`;
      });
      timelineHtml += ` <div class="button">
              <a class="button-onlclick">Tham gia ngay</a>
              <p class="button-onclick-detail" index="${i}">Chi tiết</p>
              </div>
            </div>
         </div>
            </div>`

    });
    document.querySelector("#timeline").innerHTML = timelineHtml;
    $("#timeline").slick({
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="bi bi-chevron-left"></i></i></span>',
      nextArrow: '<span class="prev"><i class="bi bi-chevron-right"></i></i></span>',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '',
            nextArrow: '',
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    });
    vams('.button-onlclick').forEach((box) => {
      box.addEventListener('click', () => {
        vam('#Box_1412c>.background').setAttribute('style', 'display:block')
        vam('#Box_1412c>.box').setAttribute('style', 'display:flex')
        vam('#Box_1412c>.background').addEventListener('click', () => {
          vam('#Box_1412c>.background').setAttribute('style', 'display:none')
          vam('#Box_1412c>.box').setAttribute('style', 'display:none')
          vam("#Box_1412c .content.acc").classList.remove('acc')
          vam('#Box_1412c .contenttitle').setAttribute('style', 'display: flex')
          vam('#Box_1412c .title').setAttribute('style', 'display: block')
          vams('#Box_1412c .dot.acc').forEach((tab) => {
            tab.classList.remove('acc')
          })
          vams('#Box_1412c .line>p').forEach((line) => {
            line.setAttribute('style', 'display: none')
          })
        })
        vam('#Box_1412c .out').addEventListener('click', () => {
          vam('#Box_1412c>.background').setAttribute('style', 'display:none')
          vam('#Box_1412c>.box').setAttribute('style', 'display:none')
        })
      })
    })
    var chitiet = vams('.button-onclick-detail')
    chitiet.forEach((card) => {
      card.addEventListener('click', (event) => {
        let index = event.target.getAttribute("index");
        vam('.background-onclick-detail').setAttribute('style', 'display:block')
        vam(`.element-hidden-detail[index='${index}']`).setAttribute('style', 'display:block')

        vam('.background-onclick-detail').addEventListener('click', () => {
          vam(`.element-hidden-detail[index='${index}']`).setAttribute('style', 'display:none')
          vam('.background-onclick-detail').setAttribute('style', 'display:none')
        })
      })
    });

    vams('#Box_1412c .next').forEach((tab, index) => {
      var contentlist = vams('#Box_1412c .content')[index];
      var dotlist = vams('#Box_1412c .dot')[index];
      var line = vams('#Box_1412c .line>p')[index - 1];
      tab.addEventListener('click', () => {
        var contentacc = vams("#Box_1412c .content.acc")
        if (contentacc.length > 0) {
          vam("#Box_1412c .content.acc").classList.remove('acc')
        } else { }
        vam('.contenttitle').setAttribute('style', 'display: none')
        contentlist.classList.add('acc')
        dotlist.classList.add('acc')
        line.setAttribute('style', 'display: block')
      })
    })

    vams('#Box_1412c .back').forEach((tab, index) => {
      var contentlist = vams('#Box_1412c .content')[index - 1];
      var dotlist = vams('#Box_1412c .dot')[index];
      var line = vams('#Box_1412c .line>p')[index - 1]
      const backtitle = vams('#Box_1412c .back');
      tab.addEventListener('click', () => {
        var contentacc = vams("#Box_1412c .content.acc")
        if (contentacc.length > 0) { vam("#Box_1412c .content.acc").classList.remove('acc') } else { }
        vam('.contenttitle').setAttribute('style', 'display: none')
        if (tab == backtitle[0]) {
          vam('#Box_1412c .contenttitle').setAttribute('style', 'display: flex')
          dotlist.classList.remove('acc')
          vam('#Box_1412c .title').setAttribute('style', 'display:block')
        }
        else {
          contentlist.classList.add('acc')
          dotlist.classList.remove('acc')
          line.setAttribute('style', 'display: none')
        }
      })
    })

    
  });

// mở box

/* kết thúc phần các gói */

fetchCell({
  gSheetId: "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc",
  wSheetName: "footer",
  range: "B7",
})
  .then((value) => {
    var footerTitle1 = "";
    footerTitle1 += `
  <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-1").innerHTML = footerTitle1;
  });

fetchCell({
  gSheetId: "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc",
  wSheetName: "footer",
  range: "C7",
})
  .then((value) => {
    var footerTitle2 = "";
    footerTitle2 += `
  <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-2").innerHTML = footerTitle2;
  });

fetchCell({
  gSheetId: "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc",
  wSheetName: "footer",
  range: "D7",
})
  .then((value) => {
    var footerTitle3 = "";
    footerTitle3 += `
    <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-3").innerHTML = footerTitle3;
  });

fetchCell({
  gSheetId: "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc",
  wSheetName: "footer",
  range: "E7",
})
  .then((value) => {
    var footerTitle4 = "";
    footerTitle4 += `
    <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-4").innerHTML = footerTitle4;
  });

fetchCell({
  gSheetId: "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc",
  wSheetName: "footer",
  range: "B19",
})
  .then((value) => {
    var c = "";
    c += `
      <div class="c"><p>${value.slice(1, value.length - 1)}</p></div>`
    document.querySelector(".c-wrap").innerHTML = c;
  });


var Img = document.querySelector('.footer-top')
function Mathdd() {
  var Mathdd = (Img.getBoundingClientRect().top) * 0.3
  return Mathdd;
}

const IG = window.addEventListener('scroll', () => {
  document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
})

