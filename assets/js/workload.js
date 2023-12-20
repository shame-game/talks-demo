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
    let posts = "";
    content.posts.forEach(row => {
      posts += `
      <div class="posts col-lg-4">
        <div>
          <img src="${row.postImageUrl}">
          <div class="posts-content">
            <p>${row.postCreatedAt}</p>
            <a href="${row.postLink}">${row.postTitle}</a>
          </div>
        </div>
      </div>`
    })
    document.querySelector('#postsSlick').innerHTML = posts;

    $(".postsSlick").slick({
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
            arrows: false,
            dots: true
          },
        },
      ],
    });

    // top-table
    let postMain = "";
    content.postmain.forEach(row => {
      postMain += `
      <div class="post-main-wrap">
        <img src="${row.postImageUrl}">
        <h1>${row.postTitle}</h1>
        <h4>${row.title}</h4>
        <p>${row.description}</p>
      </div>`
    })
    document.querySelector('#post-main-lg').innerHTML = postMain;
    let postChild = "";
    content.postchild.forEach(row => {
      postChild += `
      <div class="post-child">
        <img src="${row.postImageUrl}" alt="">
          <div>
            <h1>${row.postTitle}</h1>
            <p>${row.description}</p>
          </div>
      </div>
      <div class="bottom_title" style="width: 100%; background-color: #0048ab;"></div>`
    })
    document.querySelector('#post-child-wrap').innerHTML = postChild;

    
    // footer
    let footerHtml = "";

    content.footer.forEach((row) => {
      footerHtml += `<img class="footer-image" src="${row.resourceUrl}">`;
    });

    document.querySelector("#footer-img").innerHTML = footerHtml;



  });

