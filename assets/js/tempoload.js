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
    /* tiến độ */

    // header
    let temposlick = "";
    content.packages.forEach((row) => {
      console.log(row);
      temposlick += `
      <div class="col-lg-4">
                        <div class="tempo-slick-card">
                            <div class="tempo-slick-top">
                                <img src="${row.row1}" alt="">
                                <h1>${row.row2}</h1>
                            </div>
                            <div class="tempo-slick-absolute">
                                <div class="title">
                                    <h4>${row.row4} đ</h4>
                                    <p>${row.row5}</p>
                                </div>
                                <div class="tempo">
                                    <div style="width: ${row.row5}%;"></div>
                                </div>
                                <div class="time"><i class="bi bi-alarm-fill"></i>
                                    <p>${row.row6}</p>
                                </div>
                            </div>
                            <div class="tempo-slick-bottom">
                                <ul>`
      row.row3.split("\n").forEach((detail) => {
        temposlick += `<li>${detail}</li>`
      });
      temposlick += `</ul>
                                <div>
                                    
                                </div>
                                <div class="button">
                                    <a href="pay.html">Đóng góp ngay</a>
                                    <p class="button-onclick-detail">chi tiết</p>
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
    var chitiet = document.querySelectorAll('.button-onclick-detail')
    chitiet.forEach((card) => {
      card.addEventListener('click', (event) => {
        let index = event.target.getAttribute("index");
        document.querySelector('.background-onclick-detail').setAttribute('style', 'display:block')
        document.querySelector(`.element-hidden-detail[index='${index}']`).setAttribute('style', 'display:block')

        document.querySelector('.background-onclick-detail').addEventListener('click', () => {
          document.querySelector(`.element-hidden-detail[index='${index}']`).setAttribute('style', 'display:none')
          document.querySelector('.background-onclick-detail').setAttribute('style', 'display:none')
        })
      })
    });
    // top-table 
  

    let toptbody = "";
    content.topTable.forEach(row => {
      toptbody += `
        <tr>
          <td><div class="td1"><p>${row.row1}</p></div></td>
          <td><div class="td2"><p>${row.row2}</p></div></td>
          <td><div class="td3"><p>${row.row3}</p></div></td>
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
    var feedbackForm = '';
    content.feedbackForm.forEach((row)=>{
      feedbackForm +=`
      <div class="container row mx-auto feedback-wrap">
      <div class="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
        <div class="testimonial_content" style="margin: 10px 0 20px 10px">
          <h1 class="testimonial_title">${row.row1}</h1>
          <p style="text-align: justify; margin: 10px 0; color: #030304">
            Email và số điện thoại sẽ không được công khai<br />${row.row2}
          </p>
        </div>
        <form id="formfeedback">
        <div class="acc">
          <input
            id="ip1"
            name="name"
            class="acc-input d1"
            type="text"
            placeholder=" "
            class="px-2 pt-1 pb-1"
          />
          <label id="la1" class="acc-label 1" for="name">Tên*</label>
        </div>
        <div class="acc">
          <input
            id="ip2"
            name="phone"
            class="acc-input d2"
            type="text"
            placeholder=" "
            class="px-2 pt-1 pb-1"
          />
          <label id="la2" class="acc-label 2" for="name">Số điện thoại*</label>
        </div>
        <div class="acc">
          <input
            id="ip2"
            name="email"
            class="acc-input d3"
            type="email"
            placeholder=" "
            class="px-2 pt-1 pb-1"
          />
          <label id="la2" class="acc-label 2" for="name">Email*</label>
        </div>
        <div class="acc">
          <textarea
            id="ip2"
            name="comment"
            class="acc-input d4"
            type="text"
            placeholder=" "
            class="px-2 pt-1 pb-1"
          ></textarea>
          <label id="la2" class="acc-label 2" for="name">Nhận xét*</label>
        </div>
        </form>
        <div class="button">
          <button id="feedback-cmt">Gửi nhận xét</button>
        </div>
      </div>
      <div class="col-lg-6 feedback-img wow fadeInRight" data-wow-delay="0.2s">
        <img src="./assets/images/feedback-message-5351721-4471252.png" />
        <div class="feedback-before"></div>
      </div>
    </div>
    <div class='sucs' style=" transform: translateX(370px);">
    <div class="toast-content">
    <i style="color:#22fe0e;font-size: 34px;" class="bi bi-check-circle-fill"></i>
    <div class="message">
        <span class="text text-1">Gửi thành công</span>
        <span class="text text-2">Cảm ơn bạn đã đóng góp ý kiến</span>
    </div>
    </div>
    </div>
    <div class='error' style=" transform: translateX(370px);">
    <div class="toast-content">
    <i style="color:#fc3333;font-size: 34px;" class="bi bi-x-circle-fill"></i>
    <div class="message">
        <span class="text text-1">Gửi thất bại</span>
        <span class="text text-2">Vui lòng điền đủ thông tin</span>
    </div>
    </div>
    </div>
    <div class="feedback-load" style="display: none">
      <div class="spinner-border text-primary"></div>
    </div>`
    })
    document.querySelector("#feedback").innerHTML = feedbackForm

    const URL =
        "https://script.google.com/macros/s/AKfycbxHL_qZd4coEWEbacMAblfc5iYw0qOsfjEYprEK9y7_oBueQ5ovJnT5zZ4eaf09qH58/exec";

      $(document).ready(function () {
        $("#feedback-cmt").click(function () {
          // Select tất cả
          var inputValues = $("input, textarea")
            .map(function () {
              var input = $(this);
              return input.attr("name") + "=" + encodeURIComponent(input.val());
            })
            .get();

          // tạo 
          var queryString = inputValues.join("&");

          // Log the result or use it as needed
          document.querySelector('.feedback-load').setAttribute("style","display:flex")
          var fullName = document.querySelector(".d1").value;
          var email = document.querySelector(".d2").value;
          var phone = document.querySelector(".d3").value;
          var message = document.querySelector(".d4").value;

        if (fullName === "" || email === "" || phone === "" || message === "") {
            document.querySelector('.feedback-load').setAttribute("style","display:none")
            document.querySelector('.feedback-load').setAttribute("style","display:none")
              document.querySelector(".error").setAttribute("style","transform: translateX(20px);")
              setTimeout(()=>{document.querySelector(".error").setAttribute("style","transform: translateX(340px);");
            },5000)
        } else {
          // hiển thị 
          $.ajax({
            type: "GET",
            url: URL + "?" + queryString,
            success: function (response) {
              document.querySelector('.feedback-load').setAttribute("style","display:none")
              document.getElementById("formfeedback").reset();
              document.querySelector(".sucs").setAttribute("style","transform: translateX(20px);")
              setTimeout(()=>{document.querySelector(".sucs").setAttribute("style","transform: translateX(340px);");
            },5000)
            },
            error: function (error) {
              $("#feedback-msg").html("Có sự cố gì đó");
            },
          });
        }
        });
      });

    // footer
    let footertop = "";
    content.footerTop.forEach((row) => {
      footertop += `
      <h1 class="footer-top_title">${row.row1}</h1>
      <div class="footer-top_link button-onlclick">
        <a href="pay.html">${row.row2}</a>
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
  });

/* mục tiêu */

var Img = document.querySelector('.footer-top')
function Mathdd() {
  var Mathdd = (Img.getBoundingClientRect().top) * 0.4
  return Mathdd;
}

const IG = window.addEventListener('scroll', () => {
  document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
})


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
