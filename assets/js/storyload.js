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


    content.nav.forEach(row => {
      navHtml += `
        <li class="nav-item">
          <a class="page-scroll" href="${row.navLink}" target="${row.navTarget}">${row.navName}</a>
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
      <div class="row justify-content-center">
      <div class="col-lg-6 story-intro_img">
          <img src="${row.postImageUrl}">
      </div>
      <div class="col-lg-6 story-intro_content">
          <div>
              <div class="story-intro_content-after"></div>
              <div class="story-intro_content-title">
                  <h1>${row.title}</h1>
                  <h4>${row.postTitle}</h4>
              </div>
          </div>
          <p>${row.description}</p>
      </div>
  </div>
      `;
    });
    document.querySelector('#storyIntro').innerHTML = storyintro


    //


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



    // header
    let newpaper = "";
    content.newspapers.forEach(row => {
      newpaper += `
      <div class="newspapers-box col-lg-4">
        <div>
          <img src="${row.resourceUrl}">
          <div class="newspapers-content">
            <h1>${row.title}</h1>
            <div>
              <img src="${row.postImageUrl}">
              <p>Ngày: ${row.postTitle}</p>
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

    // 
    let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');

    let active = 3;
    function loadShow() {
      let stt = 0;
      items[active].style.transform = `none`;
      items[active].style.zIndex = 1;
      items[active].style.filter = 'none';
      items[active].style.opacity = 1;
      for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
      }
      stt = 0;
      for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
      }
    }
    loadShow();
    next.onclick = function () {
      active = active + 1 < items.length ? active + 1 : active;
      loadShow();
    }
    prev.onclick = function () {
      active = active - 1 >= 0 ? active - 1 : active;
      loadShow();
    }


    // footer
    let footerList1 = `<ul class="footer-list">`;
    let footerList2 = `<ul class="footer-list">`;
    let footerList3 = `<ul class="footer-list">`;
    let footerList4 = `<ul class="footer-list">`;
    content.liContent.forEach((row) => {
      footerList1 += `<li><a class="links1" href="">${row.html}</a></li>`
      footerList2 += `<li><a class="links2" href="">${row.title}</a></li>`
      footerList3 += `<li><a class="links3" href="">${row.description}</a></li>`
      if (row.resourceUrl == "") {
        footerList4 += ``
      }
      else {
        footerList4 += `<li><a class="links4" href="">${row.resourceUrl}</a></li>`
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
      var hrefLink1 = `${row.html}`
      indexlink1[index].setAttribute('href', hrefLink1)
      var indexlink2 = document.querySelectorAll('.links2')
      var hrefLink2 = `${row.title}`
      indexlink2[index].setAttribute('href', hrefLink2)
      var indexlink3 = document.querySelectorAll('.links3')
      var hrefLink3 = `${row.description}`
      indexlink3[index].setAttribute('href', hrefLink3)
    });
    footerList4 += `<div>`
    content.contact.forEach((row) => {
      footerList4 += `<a href="${row.postTitle}"><i class="bi bi-${row.resourceUrl}"></i></a>`
    });
    footerList4 += ` </div></ul>`
    document.querySelector("#footer-list-4").innerHTML = footerList4;



  });

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
title.forEach(function (element,index) {
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





