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

    let footerList1 = `<ul class="footer-list">`;
    let footerList2 = `<ul class="footer-list">`;
    let footerList3 = `<ul class="footer-list">`;
    let footerList4 = `<ul class="footer-list">`;
    content.liContent.forEach((row) => {
      footerList1 += `<li><a class="links1" href="">${row.html}</a></li>`
      footerList2 += `<li><a class="links2" href="">${row.title}</a></li>`
      footerList3 += `<li><a class="links3" href="">${row.description}</a></li>`
      if(row.resourceUrl == ""){
        footerList4 += ``
      }
      else{
        footerList4 +=  `<li><a class="links4" href="">${row.resourceUrl}</a></li>`
      }
    });
    footerList1 +=` </ul>`
    footerList2 +=` </ul>`
    footerList3 +=` </ul>`
    document.querySelector("#footer-list-1").innerHTML = footerList1;
    document.querySelector("#footer-list-2").innerHTML = footerList2;
    document.querySelector("#footer-list-3").innerHTML = footerList3;
    content.liLink.forEach((row,index) => {
      var indexlink1 = document.querySelectorAll('.links1')
      var hrefLink1 = `${row.html}`
      indexlink1[index].setAttribute('href', hrefLink1 )
      var indexlink2 = document.querySelectorAll('.links2')
      var hrefLink2 = `${row.title}`
      indexlink2[index].setAttribute('href', hrefLink2 )
      var indexlink3 = document.querySelectorAll('.links3')
      var hrefLink3 = `${row.description}`
      indexlink3[index].setAttribute('href', hrefLink3 )
    });
    footerList4 +=`<div>`
    content.contact.forEach((row) => {
      footerList4 += `<a href="${row.postTitle}"><i class="bi bi-${row.resourceUrl}"></i></a>`
    });
    footerList4 +=` </div></ul>`
    document.querySelector("#footer-list-4").innerHTML = footerList4;
  });

var Img = document.querySelector('.footer-top')
function Mathdd() {
  var Mathdd = (Img.getBoundingClientRect().top) * 0.3
  return Mathdd;
}

const IG = window.addEventListener('scroll', () => {
  document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
})

fetchSheet
  .fetch({
    gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
    wSheetName: "benefit",
    range: "C9:K13",
  })
  .then(rows => {
    let timelineHtml = '';

    rows.forEach(row => {
      timelineHtml += `
              <div class="card-wrap col-lg-4 col-xl-6 col-12 wow fadeInUp" data-wow-delay="0.2s">
              <div class="card">
              <div class="top">
                <div class="title"><p>${row.Feature}</p></div>
                <div class="price-sec">
                  <span class="price">${row.moneyin.split("").reverse().slice(8).reverse().join("")}</span>
                  <span class="decimal">${row.moneyin.split("").reverse().slice(0, 8).reverse().join("")}</span>
                </div>
              </div>
              <div class="info"><p>Tổng giá trị nhận lại </p><span>${row.moneyout} vnd</span></div>
              
              <div class="details">`
      Object.keys(row).slice(3).forEach(key => {
        timelineHtml += `<div class="one"><span>${key}</span> ${row[key] == "TRUE" ? `<i class="fas fa-check"></i>` : `<i class="fas fa-times"></i>`}</div>`;
      });
      timelineHtml += ` <div class="button">
              <button>Tham gia ngay</button>
              <a>Chi tiết</a>
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
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "B4",
})
  .then((value) => {
    var footermid = ""
    footermid += `
      <div class="row footer-mid">
        <div class="col-lg-12 content">
          <h2 class="title-h4" style="font-size: 36px;text-align: center;">${value.slice(1, value.length - 1)}</h2>
        </div>
      </div>`
    document.querySelector("#footer-mid").innerHTML = footermid;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "B5",
})
  .then((value) => {
    var footerTitle1 = "";
    footerTitle1 += `
  <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-1").innerHTML = footerTitle1;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "C5",
})
  .then((value) => {
    var footerTitle2 = "";
    footerTitle2 += `
  <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-2").innerHTML = footerTitle2;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "D5",
})
  .then((value) => {
    var footerTitle3 = "";
    footerTitle3 += `
    <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-3").innerHTML = footerTitle3;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "E5",
})
  .then((value) => {
    var footerTitle4 = "";
    footerTitle4 += `
    <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-4").innerHTML = footerTitle4;
  });

  fetchCell({
    gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
    wSheetName: "footer",
    range: "B17",
  })
    .then((value) => {
      var c = "";
      c += `
      <div class="c"><p>${value.slice(1, value.length - 1)}</p></div>`
      document.querySelector(".c-wrap").innerHTML = c;
    });




/* 
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
              </div>*/ 