const GS_ID = "1bpxTy_rtJvFqsm3mutT6v8_FDPdCLqEDbuykxPOf_Bc";
var funding = [];
var packages = [];
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
    packages = rows.filter(row => row.section == 'packages');

    // logo
    funding = content.pay
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
    // phần tiến độ

    document.querySelector('.c661412b1-title>h1').innerText = content.textmt[content.textmt.length - 1].row1
    document.querySelector('.c661412b1-title>p').innerText = content.textmt[content.textmt.length - 1].row2
    document.querySelector('.c661412b1-items1>h1').innerText = content.tieudemt[content.tieudemt.length - 1].row1
    document.querySelector('.c661412b1-items2>h1').innerText = content.tieudemt[content.tieudemt.length - 1].row2
    document.querySelector('.c661412b1-items3>h1').innerText = content.tieudemt[content.tieudemt.length - 1].row3
    document.querySelector('.c661412b1-items1>p').innerText = parseFloat(content.muctieu[content.muctieu.length - 1].row1).toLocaleString("vi-VN") + ' vnđ'
    document.querySelector('.c661412b1-items2>p').innerText = content.muctieu[content.muctieu.length - 1].row2 + ' ngày'
    document.querySelector('.c661412b1-items3>p').innerText = content.muctieu[content.muctieu.length - 1].row3

    // phần chi tiết 

    var boxHiden = '';
    content.Boxdetail.forEach((row, i) => {
      boxHiden += `
      <div class="element-hidden-detail container boxdetail" style="display: none;" index="${i}">
    <div class="wrapper">
      <div class="table premium">
        <div class="ribbon"><span>${row.row8}</span></div>
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
          `
      row.row3.split("\n").forEach((tab, i) => {
        boxHiden += `<tr>
            <td class="list-name">${row.row3.split('\n')[i]}</td>
            <td class="icon check">${row.row4.split('\n')[i]}</td>
            <td class="icon check">${row.row5.split('\n')[i]}</td>
            </tr>`
      });
      boxHiden += `
        </table>
        <div class="btn">
          <div>
            <h2>Giá bán: ${row.row6}</h2>
            <h4>Giá trị mà bạn nhận được: ${row.row7}</h4>
          </div>
          <a class="bt buttonde-onlclick" index=${i}><span>Tham gia ngay</span></a>
        </div>
      </div>
    </div>     
    </div> `
    });
    document.querySelector('#hiddendetail').innerHTML = boxHiden;
    const vam = document.querySelector.bind(document);
    const vams = document.querySelectorAll.bind(document);
    vams('.buttonde-onlclick').forEach((box) => {
      box.addEventListener('click', () => {
        let index = box.getAttribute("index");
        let package = content.pay[index];
        console.log(package);
        vams('.participant-name').forEach(element => element.innerText = package.row1);
        vam('.qrpay').src = package.row6;
        vams('.participant-moneyin').forEach(element => element.innerText = 'Giá gói: ' + parseFloat(package.row2).toLocaleString("vi-VN") + ' đ');
        vams('.participant-moneyout').forEach(element => element.innerText = 'Giá trị nhận được: ' + parseFloat(package.row3).toLocaleString("vi-VN") + ' đ');

      
        vam('.participant-days').innerText = 'Còn lại: ' + packages[index].row6 + ' Ngày'
        let featuresHTML = '';
        package.row5.split("\n").forEach((con) => {
          featuresHTML += `<li><i class="bi bi-check"></i>${con}</li>`;
        })
        vam('body').setAttribute('style', 'overflow-y: hidden;')
        vam('.participant-features').innerHTML = featuresHTML;
        vam('body').setAttribute('style', 'overflow-y: hidden;')
        vam('.background-onclick-detail').setAttribute('style', 'display:none')
        vam(`.element-hidden-detail[style='display:block']`).setAttribute('style', 'display:none')
        vam('#Box_1412c>.background').setAttribute('style', 'display:block')
        vam('#Box_1412c>.box').setAttribute('style', 'display:flex')
        vam('#Box_1412c>.background').addEventListener('click', () => {
          vam('body').setAttribute('style', 'overflow-y: auto;')
          vam('#Box_1412c>.background').setAttribute('style', 'display:none')
          vam('#Box_1412c>.box').setAttribute('style', 'display:none')
          if (vam("#Box_1412c .content").classList.contains(".acc")) {
            vam("#Box_1412c .content.acc").classList.remove('acc')
          }
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
          vam('body').setAttribute('style', 'overflow-y: auto;')
        })
      })
    })
    vam('#Box_1412c .suc').addEventListener('click', () => {
      vam('#Box_1412c>.background').setAttribute('style', 'display:none')
      vam('#Box_1412c>.box').setAttribute('style', 'display:none')
      if (vam("#Box_1412c .content").classList.contains(".acc")) {
        vam("#Box_1412c .content.acc").classList.remove('acc')
      }
      vam('#Box_1412c .contenttitle').setAttribute('style', 'display: flex')
      vam('#Box_1412c .title').setAttribute('style', 'display: block')
      vams('#Box_1412c .dot.acc').forEach((tab) => {
        tab.classList.remove('acc')
      })
      vams('#Box_1412c .line>p').forEach((line) => {
        line.setAttribute('style', 'display: none')
      })
      vam('body').setAttribute('style', 'overflow-y: auto;')
    })

    // phần chính sách thanh toán
    let tieudecs = '';
    let chinhsach = '';

    content.titlecs.forEach((row) => {
      tieudecs = `${row.row1}`
    })
    document.querySelector('#titlecs').innerHTML = tieudecs

    content.chinhsach.forEach((row) => {
      chinhsach = `${row.row1}`
    })
    document.querySelector('#chinhsach').innerHTML = chinhsach


    // phần slick các gói
    var d = 0
    let temposlick = "";
    let ind = 1
    content.packages.forEach((row, d) => {
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
                                    <h4 class="SoTienNhanDuoc${ind}">0</h4>
                                    <p class="PhanTram${ind}">0</p>
                                </div>
                                <div class="tempo tempo${ind}">
                                    <div style="width: ${row.row5}%;"></div>
                                </div>
                                <div class="time"><i class="bi bi-alarm-fill"></i>
                                    <p>Còn lại: ${row.row6} Ngày</p>
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
                                    <a class="button-onlclick" index=${d} >Tham gia ngay</a>
                                    <p class="button-onclick-detail" index=${d}>chi tiết</p>
                                </div>
                            </div>
                        </div>
                    </div>
      `
      d++;
      ind++;
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
    vams('.button-onlclick').forEach((box) => {
      box.addEventListener('click', (e) => {
        // showing selected features
        let index = e.target.getAttribute("index");
        let package = funding[index];
        vams('.participant-name').forEach(element => element.innerText = package.row1);
        vams('.participant-moneyin').forEach(element => element.innerText = 'Giá gói: ' + parseFloat(package.row2).toLocaleString("vi-VN") + ' đ');
        vams('.participant-moneyout').forEach(element => element.innerText = 'Giá trị nhận được: ' + parseFloat(package.row3).toLocaleString("vi-VN") + ' đ');
    
     
        vam('.participant-days').innerText = 'Còn lại: ' + packages[index].row6 + ' Ngày'
        let featuresHTML = '';
        package.row5.split("\n").forEach((con) => {
          featuresHTML += `<li><i class="bi bi-check"></i>${con}</li>`;
        })
        vam('.qrpay').src = package.row6
        vam('body').setAttribute('style', 'overflow-y: hidden;')
        vam('.participant-features').innerHTML = featuresHTML;
        vam('#Box_1412c>.background').setAttribute('style', 'display:block')
        vam('#Box_1412c>.box').setAttribute('style', 'display:flex')
        vam('#Box_1412c>.background').addEventListener('click', () => {
          vam('body').setAttribute('style', 'overflow-y: auto;')
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
          vam('body').setAttribute('style', 'overflow-y: auto;')
          vam('#Box_1412c>.background').setAttribute('style', 'display:none')
          vam('#Box_1412c>.box').setAttribute('style', 'display:none')
        })
      })
    })

    vam('#Box_1412c .suc').addEventListener('click', () => {
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
      vam('body').setAttribute('style', 'overflow-y: auto;')
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
        if (line !== undefined) {
          line.setAttribute('style', 'display:block')
        }
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

    // top-table 

    // feedback
    var feedbackForm = '';
    content.feedbackForm.forEach((row) => {
      feedbackForm += `
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
          <button id="feedback-cmt">Gửi phản hồi</button>
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
        document.querySelector('.feedback-load').setAttribute("style", "display:flex")
        var fullName = document.querySelector(".d1").value;
        var email = document.querySelector(".d2").value;
        var phone = document.querySelector(".d3").value;
        var message = document.querySelector(".d4").value;

        if (fullName === "" || email === "" || phone === "" || message === "") {
          document.querySelector('.feedback-load').setAttribute("style", "display:none")
          document.querySelector('.feedback-load').setAttribute("style", "display:none")
          document.querySelector(".error").setAttribute("style", "transform: translateX(20px);")
          setTimeout(() => {
            document.querySelector(".error").setAttribute("style", "transform: translateX(340px);");
          }, 5000)
        } else {
          // hiển thị 
          $.ajax({
            type: "GET",
            url: URL + "?" + queryString,
            success: function (response) {
              document.querySelector('.feedback-load').setAttribute("style", "display:none")
              document.getElementById("formfeedback").reset();
              document.querySelector(".sucs").setAttribute("style", "transform: translateX(20px);")
              setTimeout(() => {
                document.querySelector(".sucs").setAttribute("style", "transform: translateX(340px);");
              }, 5000)
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

/* mục tiêu */
vam('#Box_1412c .start').addEventListener('click', () => {
  vam('#Box_1412c .title').setAttribute('style', 'display: none')
})
var Img = document.querySelector('.footer-top')
function Mathdd() {
  var Mathdd = (Img.getBoundingClientRect().top) * 0.4
  return Mathdd;
}

const IG = window.addEventListener('scroll', () => {
  document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
})


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

var data = []
var datagoi = []
window.onload = function () {
  fetchSheet
    .fetch({
      gSheetId: '1exINb84BdO5XHUcs_t56Rig2gpDHQPpsnkGUvViuULA',
      wSheetName: 'Dữ Liệu Nhập - Tiền',
    })
    .then((rows) => {
      let tong = 0;
      let tong1 = 0;
      let tong2 = 0;
      let tong3 = 0;
      let goi = 800;
      let goi1 = 1500;
      let goi2 = 600;
      let goi3 = 100;
      let goi4 = 1000;
      let tongall = 0;
      rows.forEach((tab) => {
        if (tab['HỌ VÀ TÊN KHÁCH'] != '') {
          data = data.concat(tab)
          tongall = tongall + parseInt(tab['SỐ TIỀN'])
        }
        if (tab['SỐ TIỀN'] == '10.000.000 đ') {
          tong = tong + parseInt(tab['SỐ TIỀN'])      
        }
        if (tab['SỐ TIỀN'] == '5.000.000 đ') {
          tong1 = tong1 + parseInt(tab['SỐ TIỀN'])       
        }
        if (tab['SỐ TIỀN'] == '2.000.000 đ') {
          tong2 = tong2 + parseInt(tab['SỐ TIỀN'])       
        }
        if (tab['SỐ TIỀN'] == '1.000.000 đ') {
          tong3 = tong3 + parseInt(tab['SỐ TIỀN'])       
        }
      })
      goi = Math.floor((tong / goi * 100) * 100)/100 + '%'
      goi1 = Math.floor((tong1 / goi1 * 100) * 100)/100 + '%'
      goi2 = Math.floor((tong2 / goi2 * 100) * 100)/100 + '%'
      goi3 = Math.floor((tong3 / goi3 * 100) * 100)/100 + '%'
      tong = tong + '.000.000 đ'
      tong1 = tong1 + '.000.000 đ'
      tong2 = tong2 + '.000.000 đ'
      tong3 = tong3 + '.000.000 đ'
      let phantram = Math.floor((tongall / goi4 * 100) * 100)/100 + '%'
      tongall = tongall + '.000.000 đ'
      data.sort((a, b) => {
        var soTienA = parseInt(a['SỐ TIỀN']);
        var soTienB = parseInt(b['SỐ TIỀN']);
        // So sánh hai số tiền và trả về kết quả
        return soTienB - soTienA;
      });
      updateTable(data);
      // 
      vams('.SoTienNhanDuoc4').forEach((tab)=>{
        tab.innerText = tong3
      })
      vams('.SoTienNhanDuoc3').forEach((tab)=>{
        tab.innerText = tong2
      })
      vams('.SoTienNhanDuoc2').forEach((tab)=>{
        tab.innerText = tong1
      })
      vams('.SoTienNhanDuoc1').forEach((tab)=>{
        tab.innerText = tong
      })
      //
      vams('.PhanTram4').forEach((tab)=>{
        tab.innerText = goi3
      })
      vams('.PhanTram3').forEach((tab)=>{
        tab.innerText = goi2
      })
      vams('.PhanTram2').forEach((tab)=>{
        tab.innerText = goi1
      })
      vams('.PhanTram1').forEach((tab)=>{
        tab.innerText = goi
      })
      //
      vams('.tempo4>div').forEach((tab)=>{
        tab.setAttribute('style',`width:${goi3}`)
      })
      vams('.tempo3>div').forEach((tab)=>{
        tab.setAttribute('style',`width:${goi2}`)
      })
      vams('.tempo2>div').forEach((tab)=>{
        tab.setAttribute('style',`width:${goi1}`)
      })
      vams('.tempo1>div').forEach((tab)=>{
        tab.setAttribute('style',`width:${goi}`)
      })
      vam('.top-title>h1').innerText = tongall

      vams('.participant-total').forEach((t)=>{
        t.innerText = tongall
      })
      vams('.participant-percent').forEach((t)=>{
        t.innerText = phantram
      })
      vams('.tempodiv>div').forEach((t)=>{
        t.setAttribute('style',`width:${phantram}`)
      })
    });
};

function updateTable(rows) {
  let toptbody = "";
  let i = 1;
  rows.map(row => {
    if (row['HỌ VÀ TÊN KHÁCH'] != '') {
      toptbody += `
    <tr>
      <td><div class="td1"><p>${i}</p></div></td>
      <td><div class="td2"><p>${row['HỌ VÀ TÊN KHÁCH']}</p></div></td>
      <td><div class="td3"><p>${row['SỐ TIỀN']}</p></div></td>
    </tr>`
      i++
    }
  });
  document.querySelector("#top_tbody").innerHTML = toptbody;
  $(document).ready(function () {
    var table = $('#example').DataTable({
      "ordering": false,
      "language": {
        "search": "",
      },
    });
    $('.filter-button').on('click', function () {
      var selectedCountry = $(this).data('country');
      table.column(3).search(selectedCountry).draw();
    });
  });
}
