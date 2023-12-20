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

    let storygoi = "";

    storygoi += `
      <div class="col-lg-12">
                    <div class="story-body_title">
                        <ul>`
    content.timeline.forEach((row, index) => {
      if (index == 0) {
        storygoi += `
                                <li class="story-body_list tab-item on">
                                  <img src="${row.postLink}">
                                  <h1>${row.title}</h1>
                                </li> `
      }
      else {
        storygoi += `
                                <li class="story-body_list tab-item">
                                  <img src="${row.postLink}">
                                  <h1>${row.title}</h1>
                                </li> `
      }
    });
    storygoi += `</ul>
                    </div>`
    content.timeline.forEach((row, index) => {
      if (index == 0) {
        storygoi += `<div class="story-body_main tab-content on"><p>${row.navName}</p></div>`
      }
      else {
        storygoi += `<div class="story-body_main tab-content"><p>${row.navName}</p></div>`
      }
    });
    storygoi += `</div>
      `;
    document.querySelector('#story-goi').innerHTML = storygoi
    const tabct = document.querySelectorAll('.tab-content');
    const tabit = document.querySelectorAll('.tab-item');
    const tabActive = document.querySelector(".tab-item.on");
    tabit.forEach((tab, index) => {
      const tabcontent = tabct[index];
      tab.onclick = function () {
        document.querySelector('.tab-item.on').classList.remove('on');
        document.querySelector('.tab-content.on').classList.remove('on');
        tab.classList.add('on')
        tabcontent.classList.add('on')
      }
    });
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
          },
        },
      ],
    });


    // footer
    let footerHtml = "";

    content.footer.forEach((row) => {
      footerHtml += `<img class="footer-image" src="${row.resourceUrl}">`;
    });

    document.querySelector("#footer-img").innerHTML = footerHtml;



  });


