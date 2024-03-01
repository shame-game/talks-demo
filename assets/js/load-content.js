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

  });

var packages = [];
var qr = []
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
    qr = rows.filter(row => row.section == 'pay')
    packages = rows.filter(row => row.section == 'packages');
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
      autoplay:true,
      autoplaySpeed: 5000,
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

/* kết thúc header và banner */ 

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
    let tieudecs= '';
    let chinhsach= '';
    console.log(content.titlecs);
    content.titlecs.forEach((row)=>{
      tieudecs = `${row.row1}`
    })
    document.querySelector('#titlecs').innerHTML = tieudecs
    
    content.chinhsach.forEach((row)=>{
      chinhsach = `${row.row1}`
    })
    document.querySelector('#chinhsach').innerHTML = chinhsach
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
          row.row3.split("\n").forEach((tab,i) => {
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
    let g = 4
    let timelineHtml = '';
    content.Boxdetail.forEach((row, i) => {
      timelineHtml +=`<div class="col-lg-4 col-xl-6 col-12" style="padding-top: 80px">
      <div class="GHF_wrap">
            <div class="GHF_posi">
                <p style="margin: 0;">0${g}</p>
            </div>
            <div class="GHF_title">
                <h1>${row.row2}</h1>
                <div class="GHF_In">
                    <h4>${row.row6}</h4>
                </div>
                <div class="GHF_Out">
                    <p>Giá trị nhận được</p>
                    <h4>${row.row7}</h4>
                </div>
                <div class="details">`
                row.row3.split("\n").forEach((con) => {
                  timelineHtml += `<li>● ${con}</li>`;
                })
                timelineHtml +=  `</div>
                <div class="button">
                  <a class="button-onlclick" style="text-align:center" index="${i}">Tham gia ngay</a>
                  <p class="button-onclick-detail" index="${i}">Chi tiết</p>
                </div>
            </div>
        </div></div>`
      g--
      
      /* `
              <div class="card-wrap col-lg-4 col-xl-6 col-12 wow fadeInUp" data-wow-delay="0.2s">
              <div class="card">
              <div class="top">
                <div class="title"><p>${row.row2}</p></div>
                <div class="price-sec">
                  <span class="price">${row.row6}</span>
                </div>
              </div>
              <div class="info"><p>Tổng giá trị nhận lại </p><span>${row.row7}</span></div>
              
              <div class="details">`
              row.row3.split("\n").forEach((con) => {
                timelineHtml += `<li>● ${con}</li>`;
              })
      timelineHtml += ` <div class="button">
              <a class="button-onlclick" index="${i}">Tham gia ngay</a>
              <p class="button-onclick-detail" index="${i}">Chi tiết</p>
              </div>
            </div>
         </div>
            </div>`*/

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
    funding = content.pay
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
    vam('.start').addEventListener('click',()=>{
      vam('#Box_1412c .title').setAttribute('style', 'display:none')
    })
  });




/* load nội dung các gói đóng góp */

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
var data = []
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