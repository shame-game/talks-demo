const GS_ID = "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0";

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
    $(".header_navbar img").attr("src", logos.logo1);
    $(window).on("scroll", function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 20) {
        $(".header_navbar").removeClass("sticky");
        $(".header_navbar img").attr("src", logos.logo1);
      } else {
        $(".header_navbar").addClass("sticky");
        $(".header_navbar img").attr("src", logos.logo2);
      }
    });

    // nav items
    let navHtml = "";
    let htitleHtml1 = "";
    let htitleHtml2 = "";

    content.nav.forEach(row => {
      navHtml += `
        <li class="nav-item">
          <a class="page-scroll" href="${row.navLink}" target="${row.navTarget}">${row.navName}</a>
        </li>
      `;
    });
    content.headertitle1.forEach(row => {
      htitleHtml1 += `
      <div id="home" class="header_hero d-lg-flex align-items-center">
        <div class="header-svg"><img class="htitle-img" src="${row.resourceUrl}"></div>
        <div class="container">
          <div class="row justify-content-end">
            <div class="col-lg-6">
              <div class="header_hero_content mt-45">
                <h2 class="header_title wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.2s">${row.title}
                </h2>
                <div class="wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.6s">
                  <p class="htitle-p">${row.description}</p>
                </div>
                <div><a class="htitle-link">${row.postTitle}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    content.headertitle2.forEach(row => {
      htitleHtml2 += `
      <div id="home" class="header_hero d-lg-flex align-items-center">
        <div class="header-svg"><img class="htitle-img" src="${row.resourceUrl}"></div>
        <div class="container">
          <div class="row justify-content-start">
            <div class="col-lg-8">
              <div class="header_hero_content mt-45">
                <h2 class="header_title wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.2s">${row.title}
                </h2>
                <div class="wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.6s">
                  <p class="htitle-p">${row.description}</p>
                </div>
                <div><a class="htitle-link">${row.postTitle}</a></div>
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
      // prevArrow: '',
      // nextArrow: '',
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
    });
    
    document.querySelector("#nav").innerHTML = navHtml;

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

    // header

    // video
    document.querySelector("#video iframe").src = content.video[content.video.length - 1].resourceUrl;
    let videoHtml = "";

    content.video.forEach((row) => {
      videoHtml += `<p class="video-story">${row.description}</p><br>`;
    });

    document.querySelector("#video-story").innerHTML = videoHtml;
    // benefit
    let timelineHtml = "";
    console.log(content.timeline);

   /* content.timeline.forEach((row) => {
      timelineHtml += `
      <div class="py-3 col-lg-6 col-md-6 col-sm-12">
        <div class="pricing_color_1 wow fadeInUp benefit-box"
          data-wow-duration="1.3s"
          data-wow-delay="0.2s"
          >
          <div class="benefit-flex-start">
            <div class="benefit-box_title">
              <img src="${row.postLink}">
              <h4>${row.title}</h4>
            </div>
            <div class="benefit-box_list">
              <ul>
    `;
      row.description.split("\n").forEach((detail) => {
        timelineHtml += `<li>${detail}</li>`
      });
      timelineHtml += `
              </ul>
            </div>
          </div>
        <div class="benefit-detail">
          <a class="link-detail" href="#">Chi tiết</a>
          <div class="benefit-sign">
           <h4>${row.capital}</h4>
           <p>${row.profit}</p>
           <div style="display: flex;justify-content: end"><button>Đăng ký ngay</button></div>
         </div>
       </div>
      </div>
    </div>`;
    });*/
    content.timeline.forEach((row)=>{
      timelineHtml += `
      <div class="card-wrap col-lg-4 col-xl-6 col-12 wow fadeInUp" data-wow-delay="0.2s">
      <div class="card">
      <div class="top">
        <div class="title"><p>Gói tri kỉ</p></div>
        <div class="price-sec">
          <span class="price">1</span>
          <span class="decimal">.000.000 vnđ</span>
        </div>
      </div>
      <div class="info"><p>Tổng giá trị nhận lại </p><span>2.000.000 vnd</span></div>
      <div class="details">
        <div class="one">
          <span>• Voucher sử dụng các sản phẩm tại Biệt thự sách</span>
          <i class="fas fa-check"></i>
        </div>
        <div class="one">
          <span>• Video 3 bài chia sẻ về kiến thức kinh doanh từ CEO Đinh Minh Quyền</span>
          <i class="fas fa-check"></i>
        </div>
        <div class="one">
          <span>• Voucher 3 buổi trải nghiệm lớp học công nghệ cho trẻ em</span>
          <i class="fas fa-check"></i>
        </div>
        <div class="one">
          <span>• Voucher học tiếng anh tại Talks English</span>
          <i class="fas fa-check"></i>
        </div>
        <div class="one">
          <span>• 5000 cổ phiếu trị giá 10.000vnd</span>
          <i class="fas fa-times"></i>
        </div>
        <div class="one">
          <span>• Được ưu tiên đầu tư cho Hệ thống Biệt thự sách trên khắp cả nước.</span>
          <i class="fas fa-times"></i>
        </div>
        <div class="button">
        <button>Tham gia ngay</button>
        <a>Chi tiết</a>
        </div>
      </div>
    </div>
      </div>
      `
    })

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
          breakpoint: 1281,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '',
            nextArrow: '',
            dots: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
            dots: true,
          },
        },
      ],
    });
    // form



    // prize
    let noteHtml = "";
    let prizeHtml = "";
    content.prizenote.forEach((row) => {
      noteHtml += `<div class="prize-note"><p><span><strong>Thời gian diễn ra:</strong></span>`;
      row.description.split("\n").forEach((note) => {
        noteHtml += ` ${note}<br>`
      });
      noteHtml += `</p></div>`
    });
    content.prizecontent.forEach((row) => {
      prizeHtml += `<div class="prize-giai col-xl-6">
      <div class="prize-giai-chil">
      <img class="prize-img" src="${row.resourceUrl}">
      <div class="content">
        <p>${row.title}</p>
      </div>
      <div class="bottom">
        <div class="bottom-1"><h1>1</h1></div>
        <div class="bottom-2">
          <h4>${row.postTitle}</h4>
          <p>${row.gif}</p>
        </div>
      </div>
      </div>
    </div>`;
    });
    document.querySelector("#prizecontent").innerHTML = prizeHtml;
    document.querySelector("#noteHtml").innerHTML = noteHtml;
    // footer
    let footerHtml = "";

    content.footer.forEach((row) => {
      footerHtml += `<img class="footer-image" src="${row.resourceUrl}">`;
    });

    document.querySelector("#footer-img").innerHTML = footerHtml;



  });

  var Img = document.querySelector('.footer-top')
  function Mathdd() {
    var Mathdd = (Img.getBoundingClientRect().top) * 0.3
    return Mathdd;
  }

  const IG = window.addEventListener('scroll', () => {
    document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
  })
