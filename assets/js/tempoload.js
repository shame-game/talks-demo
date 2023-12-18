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

    $(".tempo-slick").slick({
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni tempo-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni tempo-arrow-right"></i></span>',
    });

    // top-table
    /*
    let topthead = "";
    */
    let filterbuttons = "";
    content.Goi.forEach(rowfilterbuttons => {
      filterbuttons += `
      <button class="filter-button" data-country="${rowfilterbuttons.postImageUrl}">
        ${rowfilterbuttons.typesAvailable}
      </button>`
    });
    document.querySelector("#filterButton").innerHTML = filterbuttons;
/*
    topthead += `
        <tr>
          <th>Thứ hạng</th>
          <th>Tên</th>
          <th>Số tiền đóng góp</th>
          <th style="display: none;">Gói</th>
        </tr>`*/
    let toptbody = "";
    content.topTable.forEach(row => {
      toptbody += `
        <tr>
          <td>${row.top}</td>
          <td>${row.name}</td>
          <td>${row.money}</td>
          <td style="display: none;">${row.type}</td>
        </tr>`
    });
    /*document.querySelector("#top_thead").innerHTML = topthead;*/
    document.querySelector("#top_tbody").innerHTML = toptbody;


    /**/
    $(document).ready(function () {
      var table = $('#example').DataTable();

      // Apply the filter when a filter button is clicked
      $('.filter-button').on('click', function () {
        var selectedCountry = $(this).data('country');
        table.column(3).search(selectedCountry).draw();
      });
    });


    // form


    // footer
    let footerHtml = "";

    content.footer.forEach((row) => {
      footerHtml += `<img class="footer-image" src="${row.resourceUrl}">`;
    });

    document.querySelector("#footer-img").innerHTML = footerHtml;



  });

