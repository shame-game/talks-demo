const GS_ID = "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc";

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

    content.nav.forEach(row => {
      navHtml += `
        <li class="nav-item">
          <a class="page-scroll" href="${row.row2}" target="_self">${row.row1}</a>
        </li>
      `;
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
    let storyintro = "";
    content.intro.forEach(row => {
      storyintro += `
      <div class="row justify-content-center align-items-center">
      <div class="col-lg-6 story-intro_img">
          <img src="${row.row1}">
      </div>
      <div class="col-lg-6 story-intro_content">
          <div>
              <div class="story-intro_content-after"></div>
              <div class="story-intro_content-title">
                  <h1>${row.row2}</h1>
                  <h4>${row.row3}</h4>
              </div>
          </div>
          <p>${row.row4}</p>
      </div>
  </div>
      `;
    });
    document.querySelector('#storyIntro').innerHTML = storyintro


    // progress

    $("#progressSlick").slick({
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni story-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni story-arrow-right"></i></span>',
    });

    /* lịch sử hình thành */
    let storyhis = '';
    content.storyHis.forEach((row)=>{
      storyhis += `
      <div class="items">
        <div class="imgs" style="background-image: url(${row.row4});">
        <p>${row.row5}</p>
        </div>
        <div class="blue"></div>
        <div class="story-intro_contents container">
          <h3>__ ${row.row1} __</h3>
          <h1>${row.row2}</h1>
          <p>${row.row3}</p>
        </div>
      </div>`
    })
    document.querySelector('.slide').innerHTML = storyhis


    // header
    let newpaper = "";
    content.newspapers.forEach(row => {
      newpaper += `
      <div class="newspapers-box col-lg-4">
        <div>
          <img src="${row.row1}">
          <div class="newspapers-content">
            <a href="${row.row3}">${row.row2}</a>
            <div>
              <p>Ngày: ${row.row4}</p>
              <a href="${row.row3}" target="_blank">Xem thêm</a>
            </div>
          </div>
        </div>
      </div>`
    })
    document.querySelector('#newspapersSlick').innerHTML = newpaper;

    $(".newspapersSlick").slick({
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni story-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni story-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          },
        },
      ],
    });

    var storyBtd = '';
    content.storyBottom.forEach((row) => {
      storyBtd += `
      <div class="col-lg-12">
        <div class="story-bottom_main">
          <div class="story-bottom-start">
            <img src="${row.row1}">
            <h1>${row.row2}</h1>
            </div><p>${row.row3}</p><div  class="story-bottom-end" >
            <p>${row.row4}</p>
            <i class="lni lni-quotation"></i>
          </div>
        </div>
      </div>`
    });
    document.querySelector('#story-bottom_slick').innerHTML = storyBtd

    $("#story-bottom_slick").slick({
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 600,
          settings: {
            dots: true,
            arrows: false
          },
        },
      ],
    });

    // footer
    let footertop = "";
    content.footerTop.forEach((row) => {
      footertop += `
      <h1 class="footer-top_title">${row.row1}</h1>
      <div class="footer-top_link button-onlclick">
        <a href="index.html#benefit">${row.row2}</a>
      </div>
      `
    })
    document.querySelector('#footer-top').innerHTML = footertop

    let footerList1 = `<ul class="footer-list">`;
    let footerList2 = `<ul class="footer-list">`;
    let footerList3 = `<ul class="footer-list">`;
    content.liContent.forEach((row) => {
      footerList1 += `<li><a class="links1" href="">${row.row1}</a></li>`
      footerList2 += `<li><a class="links2" href="">${row.row2}</a></li>`
      footerList3 += `<li><a class="links3" href="">${row.row3}</a></li>`
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
  });
var storybottom = document.querySelector('#story-bottom')
function Mathst() {
  var Mathst = (storybottom.getBoundingClientRect().top) * 0.5
  return Mathst;
}

const storyBT = window.addEventListener('scroll', () => {
  document.querySelector('.story-bottom').setAttribute('style', `background-position: center ${Mathst()}px`)
})

var Img = document.querySelector('.footer-top')
function Mathdd() {
  var Mathdd = (Img.getBoundingClientRect().top) * 0.4
  return Mathdd;
}

const IG = window.addEventListener('scroll', () => {
  document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
})

var content = document.querySelectorAll('.history-content');
var title = document.querySelectorAll('.video-pagination');
title.forEach(function (element, index) {
  const contentid = content[index]
  // Thêm sự kiện hover
  element.addEventListener('mouseenter', function () {
    document.querySelector('.video-pagination.active').classList.remove('active')
    document.querySelector('.history-content.active').classList.remove('active')
    element.classList.add('active');
    contentid.classList.add('active');
  });

});
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





