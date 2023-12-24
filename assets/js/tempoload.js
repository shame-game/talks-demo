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




    // form
    

    // footer
    let footerHtml = "";

    content.footer.forEach((row) => {
      footerHtml += `<img class="footer-image" src="${row.resourceUrl}">`;
    });

    document.querySelector("#footer-img").innerHTML = footerHtml;
  });
  var Img = document.querySelector('.footer-top')
  function Mathdd() {
    var Mathdd = (Img.getBoundingClientRect().top) * 0.4
    return Mathdd;
  }

  const IG = window.addEventListener('scroll', () => {
    document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
  })

  document.querySelector('.paginate_button.previous.disabled').innerHTML= 'Hello'


