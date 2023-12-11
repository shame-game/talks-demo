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
    let nav2Html = '<a class="nav-2-link">Tham gia ngay</a>';

    content.nav.forEach(row => {
      navHtml += `
        <li class="nav-item">
          <a class="page-scroll" href="${row.navLink}" target="${row.navTarget}">${row.navName}</a>
        </li>
      `;
      console.log(row.title)
    });
    document.querySelector("#nav").innerHTML = navHtml;
    document.querySelector("#nav-2").innerHTML = nav2Html;

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
    let header = content.header[0];
    document.querySelector("#home > div.container > div > div > div > h2").innerHTML = header.title;
    document.querySelector("#home > div.container > div > div > div > div").innerHTML = header.description.replaceAll(/^(.+)$/gm, "<p>$1</p>");
    let headerImageUrl = header.resourceUrl || "assets/images/header_app.png";
    // video
    document.querySelector("#video iframe").src = content.video[content.video.length - 1].resourceUrl;
    let videoHtml = "";

    content.video.forEach((row) => {
      videoHtml += `<p class="video-story">${row.description}</p><br>`;
    });

    document.querySelector("#video-story").innerHTML = videoHtml;
    // benefit
    let timelineHtml = "";
    console.log(content.timeline);

    content.timeline.forEach((row) => {
      timelineHtml += `
      <div class="py-3 col-lg-6 col-md-6 col-sm-12">
        <div class="pricing_color_1 wow fadeInUp benefit-box"
          data-wow-duration="1.3s"
          data-wow-delay="0.2s"
          >
          <div class="benefit-flex-start">
            <div class="benefit-box_title">
              <img src="${row.postLink}">
              <h4>${row.title}</h4>
            </div>
            <div class="benefit-box_list">
              <ul>
    `;
      row.description.split("\n").forEach((detail) => {
        timelineHtml += `<li>${detail}</li>`
      });
      timelineHtml += `
              </ul>
            </div>
          </div>
        <div class="benefit-detail">
          <a href="#">Chi tiết</a>
          <div class="benefit-sign">
           <h4>${row.capital}</h4>
           <p>${row.profit}</p>
           <div style="display: flex;justify-content: end"><button>Đăng ký ngay</button></div>
         </div>
       </div>
      </div>
    </div>`;
    });

    document.querySelector("#timeline").innerHTML = timelineHtml;
    // prize
    let noteHtml = "";
    let prize1Html = "";
    let prize2Html = "";
    let prize3Html = "";
    content.prizenote.forEach((row) => {
      noteHtml += `<div class="prize-note"><p><span><strong>Thời gian diễn ra:</strong></span>`;
      row.description.split("\n").forEach((note) => {
        noteHtml += ` ${note}<br>`
      });
      noteHtml += `</p></div>`
    });
    content.prizetop2.forEach((row) => {
      prize2Html += `<div class="prize-giai_min">
      <img src="${row.resourceUrl}">
      <div class="content">
        <p>${row.title}</p>
      </div>
      <div class="bottom">
        <img src="${row.postImageUrl}" alt="">
        <div>
          <h4>Giải Nhì</h4>
          <p>${row.gif}</p>
        </div>
      </div>
    </div>`;
    });
    content.prizetop1.forEach((row) => {
      prize1Html += `<div class="prize-giai_max">
      <img src="${row.resourceUrl}">
      <div class="content">
        <p>${row.title}</p>
      </div>
      <div class="bottom">
        <img src="${row.postImageUrl}" alt="">
        <div>
          <h4>Giải Nhất</h4>
          <p>${row.gif}</p>
        </div>
      </div>
    </div>`;
    });
    content.prizetop3.forEach((row) => {
      prize3Html += `<div class="prize-giai_min">
      <img src="${row.resourceUrl}">
      <div class="content">
        <p>${row.title}</p>
      </div>
      <div class="bottom">
        <img src="${row.postImageUrl}" alt="">
        <div>
          <h4>Giải Ba</h4>
          <p>${row.gif}</p>
        </div>
      </div>
    </div>`;
    });
    document.querySelector("#prize1content").innerHTML = prize1Html;
    document.querySelector("#prize3content").innerHTML = prize3Html;
    document.querySelector("#prize2content").innerHTML = prize2Html;
    document.querySelector("#noteHtml").innerHTML = noteHtml;
    // footer
    let footerHtml = "";

    content.footer.forEach((row) => {
      footerHtml += `<img class="footer-image" src="${row.resourceUrl}">`;
    });

    document.querySelector("#footer-img").innerHTML = footerHtml;



  });