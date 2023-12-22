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
            arrows: false
          },
        },
      ],
    });

    // 
    let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    
    let active = 3;
    function loadShow(){
        let stt = 0;
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        for(var i = active + 1; i < items.length; i++){
            stt++;
            items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    loadShow();
    next.onclick = function(){
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }


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


