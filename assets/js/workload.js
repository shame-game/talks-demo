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

    // also update svg colors
    document.querySelector("#decorator-bg > stop:nth-child(1)").setAttribute("stop-color", rows.find(row => row.id == "gradient-1").color);
    document.querySelector("#decorator-bg > stop:nth-child(2)").setAttribute("stop-color", rows.find(row => row.id == "gradient-2").color);
  });

var packages = [];

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

    // top-table




    // footer
    let footertop = "";
    content.footerTop.forEach((row) => {
      footertop += `
      <h1 class="footer-top_title">${row.row1}</h1>
      <div class="footer-top_link">
        <a href="index.html#benefit">${row.row2}</a>
      </div>
      `
    })
    document.querySelector('#footer-top').innerHTML = footertop
    var footermid = ""
    footermid += `
    <div class="row footer-mid">
      <div class="col-lg-12 content">
        <h2 class="title-h4" style="font-size: 36px;text-align: center;">`
    footermid += content.footerIntro[content.footerIntro.length - 1].row1
    footermid += `
        </h2>
      </div>
    </div>`
    document.querySelector("#footer-mid").innerHTML = footermid;

    let footerList1 = `<ul class="footer-list">`;
    let footerList2 = `<ul class="footer-list">`;
    let footerList3 = `<ul class="footer-list">`;
    let footerList4 = `<ul class="footer-list">`;
    content.liContent.forEach((row) => {
      footerList1 += `<li><a class="links1" href="">${row.row1}</a></li>`
      footerList2 += `<li><a class="links2" href="">${row.row2}</a></li>`
      footerList3 += `<li><a class="links3" href="">${row.row3}</a></li>`
      if (row.row4 == "") {
        footerList4 += ``
      }
      else {
        footerList4 += `<li><a class="links4" href="">${row.row4}</a></li>`
      }
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
    footerList4 += `<div>`
    content.contact.forEach((row) => {
      footerList4 += `<a href="${row.row5}"><i class="bi bi-${row.row4}"></i></a>`
    });
    footerList4 += ` </div></ul>`
    document.querySelector("#footer-list-4").innerHTML = footerList4;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "B4",
})
  .then((value) => {
    var footermid = ""
    footermid += `
        <div class="row footer-mid">
          <div class="col-lg-12 content">
            <h2 class="title-h4" style="font-size: 36px;text-align: center;">${value.slice(1, value.length - 1)}</h2>
          </div>
        </div>`
    document.querySelector("#footer-mid").innerHTML = footermid;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "B5",
})
  .then((value) => {
    var footerTitle1 = "";
    footerTitle1 += `
    <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-1").innerHTML = footerTitle1;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "C5",
})
  .then((value) => {
    var footerTitle2 = "";
    footerTitle2 += `
    <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-2").innerHTML = footerTitle2;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "D5",
})
  .then((value) => {
    var footerTitle3 = "";
    footerTitle3 += `
      <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-3").innerHTML = footerTitle3;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "E5",
})
  .then((value) => {
    var footerTitle4 = "";
    footerTitle4 += `
      <h2 class="title-h2">${value.slice(1, value.length - 1)}</h2>`
    document.querySelector("#footer-title-4").innerHTML = footerTitle4;
  });

fetchCell({
  gSheetId: "1s3I2Lh6d5VrXwfe0NP2HYxmFRLy0PjdrhEQ9dysv7b0",
  wSheetName: "footer",
  range: "B17",
})
  .then((value) => {
    var c = "";
    c += `
        <div class="c"><p>${value.slice(1, value.length - 1)}</p></div>`
    document.querySelector(".c-wrap").innerHTML = c;
  });

var Img = document.querySelector('.footer-top')
function Mathdd() {
  var Mathdd = (Img.getBoundingClientRect().top) * 0.4
  return Mathdd;
}

const IG = window.addEventListener('scroll', () => {
  document.querySelector('.footer-top_wrap').setAttribute('style', `background-image: url(./assets/images/footer-top.png); background-position: center ${Mathdd()}px`)
})

getWPPost();

function getWPPost() {
  // Fetch data from jsonplaceholder.typicode.com/posts using jQuery
  $.getJSON('https://bietthusach.com/wp-json/wp/v2/posts?_embed', function (posts) {
    // Generate HTML for each post
    var postHtml = '';
    var postmainHtml = '';
    var postHtmls =''
    $.each(posts, function (index, post) {
      
  if(index >= 5 ){postHtml += 
    `<div class="postspp" index=${index} style="display:none">
      <div class="post-child">
        <div class="post-c-img">
          <img src="${post._embedded['wp:featuredmedia'][0].source_url}">
        </div>
        <div>
          <h1>${post.title.rendered}</h1>
          <p>${post.date}</p>
        </div>
      </div>
      <div class="bottom_title" style="width: 100%;height: 1px;"></div>
    </div>`}
  else {postHtml += 
    `<a href="#header" class="postspp" index=${index} style="display:block">
      <div class="post-child">
        <div class="post-c-img">
          <img src="${post._embedded['wp:featuredmedia'][0].source_url}">
        </div>
          <div>
            <h1>${post.title.rendered}</h1>
            <p>${post.date}</p>
          </div>
      </div>
      <div class="bottom_title" style="width: 100%;height: 1px;"></div>
    </a>`;}
    });
    document.querySelector('#post-child-wrap').innerHTML = postHtml;
    $.each(posts, function (index, post) {
      postmainHtml += `
      <div class="post-main-wrap" index=${index} style="display:none">
      <h4><span>ngày đăng</span><p>${post.date}</p></h4>
      <h1>${post.title.rendered}</h1>
      <p>${post.content.rendered}</p>
      </div>
        `;
    });
    document.querySelector('#post-main-lg').innerHTML = postmainHtml;
    $.each(posts, function(index, post) {
      postHtmls += `
  <div class="col-lg-4 col-md-8 work-content" style="display:block" index=${index} >
    <a href="#header" class="single_blog blog_1 mt-30 wow fadeUp" data-wow-duration="1s" data-wow-delay="0.2s" style="width:100%">
      <div class="blog_image">
        <img src="${post._embedded['wp:featuredmedia'][0].source_url}" />
      </div>
      <div class="blog_content">
        <div class="blog_meta d-flex justify-content-between">
          <div class="meta_date">
            <span>${post.date}</span>
          </div>
        </div>
        <h4 class="blog_title">
          <p>${post.title.rendered}</p>
        </h4>
      </div>
    </a>
  </div>
      `;
    });
    document.querySelector('#postsSlick').innerHTML = postHtmls
    $("#postsSlick").slick({
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
    vam(`.post-main-wrap[index='0']`).setAttribute('style','display:block')
    vams('.post-main-wrap').forEach((postst)=>{
      let attrpost = postst.getAttribute('style')
      console.log(attrpost);
      if (attrpost == 'display:block' ) {
        let index = postst.getAttribute('index');
        vam(`.postspp[index='${index}']`).setAttribute('style','display:none')
      }
    })
    vams('.postspp').forEach((postst)=>{
      postst.addEventListener('click',()=>{
        let index = postst.getAttribute("index");
        postst.setAttribute('style','display: none')
        let postmain = vam(`.post-main-wrap[style='display:block']`).getAttribute('index');
        vam(`.post-main-wrap[index='${postmain}']`).setAttribute('style','display:none')
        vam(`.postspp[index='${postmain}']`).setAttribute('style','display:block')
        vam(`.post-main-wrap[index='${index}']`).setAttribute('style','display:block')
      })
    })
    vams('.work-content').forEach((posts)=>{

      let postmain = vam(`.post-main-wrap[style='display:block']`).getAttribute('index');
      vams(`.postspp[style='display:block']`).forEach((tab)=>{
        let postchild = tab.getAttribute('index');
        vam(`.work-content[index='${postchild}']`).setAttribute('style','display:none')
      })
      vam(`.work-content[index='${postmain}']`).setAttribute('style','display:none')
      posts.addEventListener('click',()=>{
        let index = posts.getAttribute("index");
        let postmain = vam(`.post-main-wrap[style='display:block']`).getAttribute('index');
        vam(`.post-main-wrap[index='${postmain}']`).setAttribute('style','display:none')
        if(postmain <= 4){
          vam(`.postspp[index='${postmain}']`).setAttribute('style','display:block')
        }
        vam(`.post-main-wrap[index='${index}']`).setAttribute('style','display:block')
      })
    })
  })
    
}

    
