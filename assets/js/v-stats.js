function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

$(this).on("load", async e => {
  let sessionId = localStorage.sId || uuidv4();
  window.stat = {
    id: sessionId,
    userAgent: getUA(),
    ipInfo: await getAddr(),
    viewPort: getVP(),
    event: "",
    timestamp: "",
    link: "",
  };
  sendStat("loadpage");

  $("a").on("click", e => onClick(e));
  $(this).on("click", e => onClick(e));
});
$(this).on("beforeunload", e => {
  sendStat("closepage");
  localStorage.setItem("sId", window.stat.id);
});

function onClick(e) {
  let href = e.currentTarget.href || e.target.href;
  href && sendStat("click", href);
}

async function getAddr() {
  let res = await fetch("https://ipinfo.io/json?token=d9aa15d567548e");
  return await res.json();
}

function getUA() {
  return window.navigator.userAgent;
}

function getVP() {
  return `${window.innerWidth}x${window.innerHeight}`;
}

function sendStat(evt, link = "") {
  window.stat.event = evt;  
  window.stat.timestamp = (new Date()).toLocaleString("en-GB");
  link != "" && (window.stat.link = link);

  let params = JSON.stringify(window.stat);
  params = btoa(encodeURIComponent(params));
  const URL = "https://script.google.com/macros/s/AKfycbxbCR9QtSnckBDK_3Cg2CyOWbNYNPolhMUMIAzeegfCU3zEaSHn_WcsOpnhhEYgmvhPew/exec";
  fetch(URL + "?data=" + params);
}
