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
  
  getWPPost();

  function getWPPost() {
    // Fetch data from jsonplaceholder.typicode.com/posts using jQuery
    $.getJSON('https://bietthusach.com/wp-json/wp/v2/posts?_embed', function(posts) {
      // Generate HTML for each post
      const postsContainer = $('#blog-items');
      $.each(posts, function(index, post) {
        const postHtml = `
    <div class="col-lg-4 col-md-8 event-content">
      <div class="single_blog blog_1 mt-30 wow fadeUp" data-wow-duration="1s" data-wow-delay="0.2s">
        <div class="blog_image">
          <img src="${post._embedded['wp:featuredmedia'][0].source_url}" />
        </div>
        <div class="blog_content">
          <div class="blog_meta d-flex justify-content-between">
            <div class="meta_date">
              <span>${post.date}</span>
            </div>
            <div class="meta_like"></div>
          </div>
          <h4 class="blog_title">
            <a target="_blank" href="${post.link}">${post.title.rendered}</a>
          </h4>
          <a target="_blank" href="${post.link}" class="main-btn">Xem Thêm</a>
        </div>
      </div>
    </div>
        `;
        postsContainer.append(postHtml);
      });
    })
    .fail(function(error) {
      console.error('Error fetching posts:', error);
    });
  }
  
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

      if (currentItems >= elementList.length) {
          e.target.style.display = 'none';
      }
  })