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

    // header
    let temposlick = "";
    content.timeline.forEach((row) => {
      temposlick += `
      <div class="col-lg-4">
                        <div class="tempo-slick-card">
                            <div class="tempo-slick-top">
                                <img src="./assets/images/goi2-white.png" alt="">
                                <h1>${row.title}</h1>
                            </div>
                            <div class="tempo-slick-absolute">
                                <div class="title">
                                    <h4>12.000.000</h4>
                                    <p>40%</p>
                                </div>
                                <div class="tempo">
                                    <div style="width: 40%;"></div>
                                </div>
                                <div class="time"><i class="bi bi-alarm-fill"></i>
                                    <p>còn 365 ngày</p>
                                </div>
                            </div>
                            <div class="tempo-slick-bottom">
                                <ul>`
      row.description.split("\n").forEach((detail) => {
        temposlick += `<li>${detail}</li>`
      });
      temposlick += `</ul>
                                <div>
                                    
                                </div>
                                <div class="button">
                                    <button>Đóng góp ngay</button>
                                    <a>chi tiết</a>
                                </div>
                            </div>
                        </div>
                    </div>
      `
    })
    document.querySelector('#tempo-slick-wrap').innerHTML = temposlick;

    $("#tempo-slick-wrap").slick({
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni tempo-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni tempo-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
          },
        },
      ],
    });

    // top-table 
    //

    let toptbody = "";
    console.log(content.topTable)
    content.topTable.forEach(row => {
      toptbody += `
        <tr>
          <td><div class="td1"><p>${row.top}</p></div></td>
          <td><div class="td2"><p>${row.name}</p></div></td>
          <td><div class="td3"><p>${row.money}</p></div></td>
          <td style="display: none;">${row.type}</td>
        </tr>`
    });
    document.querySelector("#top_tbody").innerHTML = toptbody;
    $(document).ready(function () {
      var table = $('#example').DataTable({
        "ordering": false
      });
      $('.filter-button').on('click', function () {
        var selectedCountry = $(this).data('country');
        table.column(3).search(selectedCountry).draw();
      });
    });

    // feedback
    //




    // tempo
    let tempo = "";
    content.progress.forEach((row) => {
      tempo += ` <div class="tempo-contribute">
      <h1>Tổng tiến độ gọi vốn</h1>
      <h4>"Nắm bắt cơ hội đầu tư ngay hôm nay."</h4>
      <div class="p">
          <p>${row.name} đ</p><span>Tiến độ: 40%</span>
      </div>
      <div class="tempo-progress_wrap">
          <div class="tempo-progress" style="width: 40%;"></div>
      </div>
      <div class="tempo-button">
          <a>Đóng góp ngay</a>
      </div>
    </div>`
    })
    document.querySelector('#tempo-2-wrap').innerHTML = tempo


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

fetchSheet
  .fetch({
    gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
    wSheetName: "progress",
    range: "B5:D6",
  })
  .then(rows => {
    let tempoTitle = "";

    rows.forEach(row => {
      tempoTitle += `
            <div class="col-lg-3 ">
                <div class="tempo-target">
                    <h1>Mục tiêu</h1>
                    <p>${row.target} <span>vnđ</span></p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="tempo-time">
                    <h1>Còn lại</h1>
                    <p>${row.time} ngày</p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="tempo-goal">
                    <h1>Target Goal</h1>
                    <p>${row.TargetGoal}</p>
                </div>
            </div>`
    });


    document.querySelector("#tempo-title").innerHTML = tempoTitle;

   
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

