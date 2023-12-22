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
    let eventd = "";

    content.eventd.forEach((row) => {
        eventd += `
      <div class="col-lg-4 col-md-8 event-content">
        <div class="single_blog blog_1 mt-30 wow fadeUp" data-wow-duration="1s" data-wow-delay="0.2s">
          <div class="blog_image">
            <img src="${row.postImageUrl}" alt="blog" />
          </div>
          <div class="blog_content">
            <div class="blog_meta d-flex justify-content-between">
              <div class="meta_date">
                <span>${row.description}</span>
              </div>
              <div class="meta_like"></div>
            </div>
            <h4 class="blog_title">
              <a target="_blank" href="${row.postLink}">${row.postTitle}</a>
            </h4>
            <a target="_blank" href="${row.postLink}" class="main-btn">Xem Thêm</a>
          </div>
        </div>
      </div>
    `;
    });

    document.querySelector("#blog-items").innerHTML = eventd;

    const loadmore = document.querySelector('#loadMore');
    let currentItems = 6;
    loadmore.addEventListener('click', (e) => {
        const elementList = [...document.querySelectorAll('.event-content')];
        for (let i = currentItems; i < currentItems + 6; i++) {
            if (elementList[i]) {
                elementList[i].style.display = 'block';
            }
        }
        currentItems += 6;

        // Load more button will be hidden after list fully loaded
        if (currentItems >= elementList.length) {
            event.target.style.display = 'none';
        }
    })

    // footer
    let footerHtml = "";

    content.footer.forEach((row) => {
      footerHtml += `<img class="footer-image" src="${row.resourceUrl}">`;
    });

    document.querySelector("#footer-img").innerHTML = footerHtml;



  });


