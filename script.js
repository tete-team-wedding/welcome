(function () {
  document.addEventListener("contextmenu", function (e) {
    if (e.target instanceof Element && e.target.closest("img")) e.preventDefault();
  });

  /* =====================================================
     ✏️ ค่าที่แก้บ่อย อยู่ตรงนี้ทั้งหมด
     ===================================================== */

  // 1) ลิงก์ Web App จาก Google Apps Script (ดูวิธีใน README) — ถ้าเว้นว่าง ฟอร์มจะให้ส่งทาง LINE แทน
  var RSVP_URL =
    "https://script.google.com/macros/s/AKfycbzrZRhuEEIEozlqkKZgWrJshf-yJ_MRrZlRYhXqjV2MYiWZ7JPfDRHGqZfXG_3P3A/exec";

  // 2) รูปแกลเลอรี เรียงตามลำดับที่โชว์ (ไฟล์อยู่ใน images/gallery)
  //    รูป: {src:'01', w:กว้าง, h:สูง} → ใช้ไฟล์ 01.jpg (ภาพใหญ่) และ 01-sm.jpg (ภาพเล็ก)
  //    วิดีโอ: {video:'00', ...} → ใช้ 00.mp4, 00.webm และ 00-poster.jpg
  //    w/h ใส่แค่สัดส่วนก็ได้ เช่น แนวตั้ง 2,3 แนวนอน 3,2
  var GALLERY = [
    { video: "00", w: 720, h: 1080 },
    { src: "01", w: 1333, h: 2000 },
    { src: "02", w: 2000, h: 1333 },
    { src: "03", w: 2000, h: 1333 },
    { src: "04", w: 1333, h: 2000 },
    { src: "05", w: 1333, h: 2000 },
    { src: "06", w: 1333, h: 2000 },
    { src: "07", w: 1333, h: 2000 },
    { src: "08", w: 2000, h: 1333 },
    { src: "09", w: 2000, h: 1333 },
    { src: "10", w: 1333, h: 2000 },
    { src: "11", w: 2000, h: 1333 },
    { src: "12", w: 1333, h: 2000 },
    { src: "13", w: 1333, h: 2000 },
    { src: "14", w: 2000, h: 1333 },
    { src: "15", w: 2000, h: 1333 },
    { src: "16", w: 1333, h: 2000 },
    { src: "17", w: 2000, h: 1333 },
    { src: "18", w: 2000, h: 1333 },
    { src: "19", w: 1333, h: 2000 },
    { src: "20", w: 1333, h: 2000 },
    { src: "21", w: 1333, h: 2000 },
    { src: "22", w: 1333, h: 2000 },
    { src: "23", w: 1333, h: 2000 },
    { src: "24", w: 2000, h: 1333 }
  ];

  // 3) ร้านและที่เที่ยว — 1 ร้าน = 1 บรรทัด
  //    n=ชื่อ, m=ที่ตั้ง·เวลาเปิด, d=คำอธิบาย, lat/lng=พิกัด, id=Google place id
  var VENUE = {
    n: "Beelive Convention Hall and Hotel (Hall3)",
    lat: 14.8765737,
    lng: 103.5084282,
    id: "ChIJ54ahJO7jGTER6nCVblJdptQ",
  };
  var COLORS = {
    ร้านกาแฟ: "#F8A56D",
    ร้านมัจฉะ: "#8FC46B",
    ร้านอาหาร: "#F08A93",
    ที่เที่ยว: "#6FA3DE",
  };
  var G = {
    ร้านกาแฟ: [
      {
        n: "V/S COFFEE - SURIN",
        lat: 14.878689,
        lng: 103.505271,
        id: "ChIJLwHbRCfjGTERK34YdGSUuBU",
        m: "ถ.สระโบราณ · ตรงข้าม รพ.สุรินทร์ · ทุกวัน 06.00–18.00",
        d: "สาขาสุรินทร์ของร้านกาแฟพิเศษจากกรุงเทพฯ มีเบลนด์ประจำร้านกับซิงเกิลออริจินหมุนเวียน ชั้นสองนั่งทำงานได้ยาว ๆ",
      },
      {
        n: "Normal Surin",
        lat: 14.885415,
        lng: 103.493343,
        id: "ChIJg_zdZwDjGTERgEpWCCl7kFM",
        m: "ถ.กรุงศรีใน · ทุกวัน 08.00–20.00",
        d: "ร้านโปร่ง กระจกบานใหญ่มองเห็นสวน ขนมปังซาวร์โดว์อบเองในร้าน แสงสวย ถ่ายรูปง่าย",
      },
      {
        n: "GOODSTUFF home café",
        lat: 14.895198,
        lng: 103.502365,
        id: "ChIJJ9GONwDjGTER_XCMfSQTcwk",
        m: "ถ.ปัทมานนท์ · อังคาร–อาทิตย์ 08.00–16.30 · ปิดวันจันทร์",
        d: "คาเฟ่ในบ้านหลังสุดท้ายของหมู่บ้าน บรรยากาศเหมือนมาบ้านเพื่อน มีทั้งกาแฟและมัจฉะ เลือกระดับหวานได้",
      },
      {
        n: "Little Elephant Patisserie & Specialty Coffee Bar",
        lat: 14.88708,
        lng: 103.482504,
        id: "ChIJt-3bWGPjGTERtadVg2Oy_wM",
        m: "ถ.หลักเมือง · ทุกวัน 08.00–22.00",
        d: "ร้านขนมอบกับกาแฟพิเศษที่ตกแต่งจัดเต็ม มีอาหารทั้งไทยและตะวันตก เปิดถึงดึก เหมาะกับไปกันเป็นกลุ่ม",
      },
    ],
    ร้านมัจฉะ: [
      {
        n: "Mushi Matcha มูชิมัทฉะ & Meditation House",
        lat: 14.875677,
        lng: 103.487824,
        id: "ChIJR_QraCHjGTER-uMMb7_cZzk",
        m: "ต.ในเมือง · ทุกวัน 07.00–17.30",
        d: "มัจฉะหลายเกรดให้เลือก เจ้าของร้านเล่าเรื่องชาได้ละเอียด มีเมนูอาหารจากวัตถุดิบท้องถิ่นด้วย",
      },
      {
        n: "H.O.M house of matcha",
        lat: 14.873084,
        lng: 103.50411,
        id: "ChIJeQaiSQDjGTERtkqAGOa9QSQ",
        m: "ถ.หลักเมือง · อังคาร–อาทิตย์ 11.00–21.00 · ปิดวันจันทร์",
        d: "นั่งดูการตีมัจฉะสด ๆ ตรงหน้า มีขนมทานคู่กัน เปิดถึงสามทุ่ม แวะหลังงานได้",
      },
      {
        n: "Sunwhite Story (Matcha)",
        lat: 14.88504,
        lng: 103.492541,
        id: "ChIJEbR1DgDjGTERs7WEEuDQXZk",
        m: "ซ.วัดบูรพาราม",
        d: "ร้านเล็กที่ขายมัจฉะอย่างเดียว ราคาเป็นมิตร อยู่ในซอยใจกลางเมือง",
      },
      {
        n: "Morning matcha",
        lat: 14.858125,
        lng: 103.493127,
        id: "ChIJOeoMUEfjGTERQGx7ZnhSAyM",
        m: "ต.นอกเมือง",
        d: "ร้านมัจฉะเล็ก ๆ ฝั่งนอกเมือง ราคาคุ้ม",
      },
    ],
    ร้านอาหาร: [
      {
        n: "โกนขแมร์ แหนมเนืองสุรินทร์",
        lat: 14.87788,
        lng: 103.491644,
        id: "ChIJ16EkUrPjGTERgIckG5eTwTU",
        m: "ซ.ศรีผไทสมันต์ · อังคาร–อาทิตย์ 11.00–21.00 · ปิดวันจันทร์",
        d: "อาหารเวียดนามและเขมรในบ้านเก่ารีโนเวต มีเมนูพาสต้าสดในร้านเดียวกันด้วย",
      },
      {
        n: "ครัวพู่กัน",
        lat: 14.881073,
        lng: 103.508323,
        id: "ChIJAc-tv3_jGTER2bmqxu2duZU",
        m: "ซ.รุ่งกิจ · 10.00–20.00 · ปิดวันพุธ",
        d: "ร้านอาหารไทยของครอบครัว รสมือเหมือนพ่อแม่ทำให้กิน สะอาด ราคาสบาย อาหารทำสดอาจรอนิดนึง",
      },
      {
        n: "บิ๊กไบท์ Big Bite",
        lat: 14.887283,
        lng: 103.499272,
        id: "ChIJN7vKbjXiGTER3KKJEWk1NYs",
        m: "ถ.ศิริรัฐ · ทุกวัน 09.30–23.30",
        d: "ร้านอาหารไทยกลางเมือง ร้านกว้าง รับกลุ่มใหญ่ได้สบาย เปิดถึงดึก",
      },
      {
        n: "ร้านอาหารเคียงคลอง",
        lat: 14.824196,
        lng: 103.49734,
        id: "ChIJk7RQYZnjGTERSWl72U49LC4",
        m: "ต.นอกเมือง · ทุกวัน 10.30–20.00",
        d: "ร้านใหญ่หลายห้อง เด่นเรื่องปลาและอาหารทะเล ที่จอดรถเยอะ เหมาะกับมาทั้งครอบครัว",
      },
      {
        n: "ร้านอาหารไพลิน",
        lat: 14.889496,
        lng: 103.492922,
        id: "ChIJodMFjbbjGTERa5zETBn5Cbs",
        m: "ถ.ธนสาร · ทุกวัน 06.00–16.00",
        d: "ข้าวราดแกงสไตล์ไทย-จีนเจ้าดังในเมือง เปิดแต่เช้า เหมาะกับมื้อเช้าก่อนเข้างาน",
      },
    ],
    ที่เที่ยว: [
      {
        n: "อนุสาวรีย์พระยาสุรินทร์ภักดีศรีณรงค์จางวาง (ปุม)",
        lat: 14.87842,
        lng: 103.489533,
        id: "ChIJUd5bCLHjGTERywBgliOnACU",
        m: "ใจกลางเมือง · เปิดตลอด",
        d: "วงเวียนประจำเมืองที่มีรูปปั้นช้างล้อมรอบ คนสุรินทร์มักแวะสักการะ มีร้านดอกไม้และเครื่องสักการะข้าง ๆ",
      },
      {
        n: "สวนสาธารณะสุรินทร์",
        lat: 14.874061,
        lng: 103.500646,
        id: "ChIJE6xTY1LiGTERdb_YYE8cnLA",
        m: "ใกล้โรงแรม · ทุกวัน 04.00–22.00",
        d: "สวนใหญ่ใกล้งาน มีลู่วิ่ง 2 กม. เหมาะเดินเล่นช่วงเช้าหรือเย็นก่อนกลับ",
      },
      {
        n: "พิพิธภัณฑสถานแห่งชาติ สุรินทร์",
        lat: 14.848348,
        lng: 103.473848,
        id: "ChIJf89NrmzjGTERIMfjgTCV4OQ",
        m: "ต.ชะเนียง · พุธ–อาทิตย์ 09.00–16.00",
        d: "เล่าประวัติศาสตร์และศิลปะของสุรินทร์ตั้งแต่ยุคก่อนประวัติศาสตร์ ใช้เวลาราวชั่วโมงเดียวก็ทั่ว",
      },
      {
        n: "หมู่บ้านทอผ้าไหมท่าสว่าง",
        lat: 14.955725,
        lng: 103.472077,
        id: "ChIJ0ZSos0PhGTERqJPErRuJ0xc",
        m: "ต.ท่าสว่าง · ราว 8 กม. จากตัวเมือง",
        d: "ชมการย้อมและทอผ้าไหมยกทองแบบดั้งเดิม เลือกซื้อผ้าไหมเป็นของฝากได้",
      },
      {
        n: "วนอุทยานพนมสวาย",
        lat: 14.76287,
        lng: 103.374322,
        id: "ChIJnYNPNXL6GTERoliC8BuBMN0",
        m: "ต.นาบัว · ราว 20 กม. · 08.30–16.30",
        d: "ภูเขาเตี้ย ๆ มีพระพุทธรูปใหญ่บนยอด ขึ้นไปจะเห็นวิวทุ่งกว้างรอบด้าน",
      },
      {
        n: "ปราสาทศีขรภูมิ",
        lat: 14.944501,
        lng: 103.79877,
        id: "ChIJSX13JDZCFzER9kZNzIys4Kw",
        m: "อ.ศีขรภูมิ · ราว 35 กม. · 07.30–18.00",
        d: "ปราสาทขอมอายุราวพันปีที่ยังสมบูรณ์มาก ทับหลังสลักหินงดงาม บรรยากาศเงียบสงบ",
      },
      {
        n: "หมู่บ้านช้างตากลาง",
        lat: 15.265941,
        lng: 103.496824,
        id: "ChIJYTuzj4fWGTERl-P9snitkLE",
        m: "อ.ท่าตูม · ราว 1 ชม. จากตัวเมือง · 08.00–17.00",
        d: "ชุมชนที่คนกับช้างอยู่ร่วมกันมาหลายรุ่น มีการแสดงช่วง 10.00 และ 14.00 น.",
      },
    ],
  };
  /* ===================================================== */

  // ทดลองดูหน้าตาแต่ละช่วงเวลา: ต่อท้ายลิงก์ด้วย ?now=2027-01-15T10:00
  var q = new URLSearchParams(location.search);
  function now() {
    return q.get("now")
      ? new Date(q.get("now") + "+07:00").getTime()
      : Date.now();
  }

  // ---------- Gate ----------
  var gate = document.getElementById("gate");
  var opened = false;
  try {
    opened = sessionStorage.getItem("opened") === "1";
  } catch (e) {}
  function openGate() {
    gate.classList.add("open");
    try {
      sessionStorage.setItem("opened", "1");
    } catch (e) {}
    setTimeout(function () {
      gate.classList.add("gone");
    }, 1000);
  }
  if (opened) {
    gate.classList.add("gone");
  } else {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "instant" });
    window.addEventListener("pageshow", function () {
      if (gate.classList.contains("open")) return;
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }
  document.getElementById("openCard").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflow = "";
    openGate();
  });

  // ---------- Dress color selector ----------
  var dressColors = document.querySelector("#dress .dots"),
    dressArt = document.querySelector("#dress .dress-art");
  window.addEventListener("load", function () {
    dressColors
      .querySelectorAll("button[data-image]")
      .forEach(function (button) {
        var image = new Image();
        image.src = button.dataset.image;
      });
  });
  dressColors.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-image]");
    if (!button) return;
    dressColors.querySelectorAll("button[data-image]").forEach(function (item) {
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });
    dressArt.src = button.dataset.image;
    dressArt.alt =
      "ภาพวาดเตเต้และทีมเต้นรำในชุดลายสก็อตสี" + button.dataset.color;
  });
  document.getElementById("dress").addEventListener("click", function (event) {
    if (event.target.closest(".dot")) return;
    dressColors
      .querySelectorAll("button[data-image]")
      .forEach(function (button) {
        button.setAttribute("aria-pressed", "false");
      });
    dressArt.src = "images/dance.webp";
    dressArt.alt = "ภาพวาดเตเต้และทีมเต้นรำในชุดลายสก็อต";
  });

  // ---------- Countdown: ก่อนงาน / วันงาน / หลังงาน ----------
  var DAY_START = new Date("2027-01-15T00:00:00+07:00").getTime();
  var DAY_END = new Date("2027-01-16T00:00:00+07:00").getTime();
  var cells = {};
  document.querySelectorAll("#count b").forEach(function (b) {
    cells[b.dataset.k] = b;
  });
  var upCells = {};
  document.querySelectorAll("#countUp b").forEach(function (b) {
    upCells[b.dataset.k] = b;
  });
  function fill(c, ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    c.d.textContent = String(Math.floor(s / 86400)).padStart(2, "0");
    c.h.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
    c.m.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    c.s.textContent = String(s % 60).padStart(2, "0");
  }
  function show(st) {
    document.querySelectorAll(".cd-state").forEach(function (el) {
      el.hidden = el.dataset.state !== st;
    });
  }
  var timer;
  function tick() {
    var t = now();
    if (t >= DAY_END) {
      show("after");
      fill(upCells, t - DAY_END);
      return;
    }
    if (t >= DAY_START) {
      show("today");
      return;
    }
    show("before");
    fill(cells, DAY_START - t);
  }
  tick();
  timer = setInterval(tick, 1000);

  // ---------- Gallery: วนได้ไม่สิ้นสุด + ดูภาพใหญ่ ----------
  (function () {
    var N = GALLERY.length;
    if (!N) return;
    var stage = document.getElementById("galStage"),
      track = document.getElementById("galTrack");
    var countEl = document.getElementById("galCount");
    var REDUCE =
      window.matchMedia &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    var DIR = "images/gallery/";
    function media(it, big) {
      if (it.video) {
        var v = document.createElement("video");
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("muted", "");
        v.preload = "none";
        v.poster = DIR + it.video + "-poster.jpg";
        ["webm", "mp4"].forEach(function (t) {
          var so = document.createElement("source");
          so.src = DIR + it.video + "." + t;
          so.type = "video/" + t;
          v.appendChild(so);
        });
        v.setAttribute("aria-label", "วิดีโอเตเต้และทีม");
        return v;
      }
      var im = new Image();
      im.decoding = "async";
      im.alt = "ภาพเตเต้และทีม";
      im.src = DIR + it.src + (big ? ".jpg" : "-sm.jpg");
      im.width = it.w;
      im.height = it.h;
      if (!big) im.loading = "lazy";
      return im;
    }
    // สร้าง 3 ชุดต่อกัน เพื่อให้วนได้เนียน (ชุดกลางคือของจริง)
    var slides = [];
    for (var c = 0; c < 3; c++) {
      GALLERY.forEach(function (it, i) {
        var f = document.createElement("figure");
        f.className = "gal-slide";
        f.dataset.i = i;
        if (c !== 1) f.setAttribute("aria-hidden", "true");
        f.appendChild(media(it, false));
        track.appendChild(f);
        slides.push(f);
      });
    }
    var cur = N,
      offset = 0;
    window.__weddingGallery = {
      activeIndex: 0,
      uniqueCount: N,
      uniqueIndexes: GALLERY.map(function (_, i) {
        return i;
      }),
    };
    // ทุกภาพสูงเท่ากัน: คำนวณความสูงจากภาพที่กว้างที่สุด เพื่อให้ภาพแนวนอนยังไม่ล้นจอ
    var maxR = Math.max.apply(
      null,
      GALLERY.map(function (it) {
        return it.w / it.h;
      }),
    );
    function sizes() {
      var W = stage.clientWidth,
        mobile = W < 640;
      var capH = Math.min(
        innerHeight * (mobile ? 0.5 : 0.62),
        mobile ? 420 : 540,
      );
      var maxW = W * (mobile ? 0.9 : 0.7);
      var H = Math.round(Math.min(capH, maxW / maxR));
      stage.style.height = H + "px";
      slides.forEach(function (f) {
        var it = GALLERY[f.dataset.i];
        f.style.height = H + "px";
        f.style.width = Math.round((H * it.w) / it.h) + "px";
      });
    }
    function reportGalleryChange(index) {
      window.__weddingGallery = window.__weddingGallery || {};
      var uniqueIndexes = GALLERY.map(function (_, i) {
        return i;
      });
      window.__weddingGallery.activeIndex = index;
      window.__weddingGallery.uniqueCount = N;
      window.__weddingGallery.uniqueIndexes = uniqueIndexes;
      document.dispatchEvent(
        new CustomEvent("wedding-gallery-changed", {
          detail: {
            activeIndex: index,
            uniqueIndexes: uniqueIndexes.slice(),
          },
        }),
      );
    }
    function place(anim) {
      var s = slides[cur];
      offset = stage.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2);
      track.classList.toggle("anim", !!anim && !REDUCE);
      track.style.transform = "translate3d(" + offset + "px,0,0)";
      slides.forEach(function (f, k) {
        f.classList.toggle("on", k === cur);
      });
      reportGalleryChange(cur % N);
      countEl.textContent = (cur % N) + 1 + " / " + N;
      preload((cur % N) + 3);
      preload((cur % N) - 3);
      playVisible();
    }
    function normalize() {
      if (cur < N || cur >= 2 * N) {
        cur = N + (((cur % N) + N) % N);
        place(false);
        void track.offsetWidth;
      }
    }
    function go(n) {
      normalize();
      cur = Math.max(0, Math.min(3 * N - 1, cur + n));
      place(true);
    }
    function goTo(k) {
      cur = k;
      place(true);
    }
    track.addEventListener("transitionend", function (e) {
      if (e.target === track) normalize();
    });
    function playVisible() {
      slides.forEach(function (f, k) {
        var v = f.querySelector("video");
        if (!v) return;
        var near = Math.abs(k - cur) <= 2;
        if (near && !lbOpen) {
          if (v.preload !== "auto") {
            v.preload = "auto";
          }
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else v.pause();
      });
    }
    document.getElementById("galPrev").addEventListener("click", function () {
      go(-1);
    });
    document.getElementById("galNext").addEventListener("click", function () {
      go(1);
    });
    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLb(cur % N);
      }
    });
    // ลาก/ปัด
    var drag = null;
    stage.addEventListener("pointerdown", function (e) {
      if (e.button > 0) return;
      normalize();
      drag = {
        x: e.clientX,
        y: e.clientY,
        t: Date.now(),
        dx: 0,
        id: e.pointerId,
        moved: false,
        target: e.target.closest(".gal-slide"),
      };
      track.classList.remove("anim");
    });
    stage.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      drag.dx = e.clientX - drag.x;
      if (
        !drag.moved &&
        Math.abs(drag.dx) > 6 &&
        Math.abs(drag.dx) > Math.abs(e.clientY - drag.y)
      ) {
        drag.moved = true;
        stage.classList.add("dragging");
        try {
          stage.setPointerCapture(drag.id);
        } catch (_) {}
      }
      if (drag.moved)
        track.style.transform = "translate3d(" + (offset + drag.dx) + "px,0,0)";
    });
    function endDrag(e, cancel) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var d = drag;
      drag = null;
      stage.classList.remove("dragging");
      if (cancel) {
        place(true);
        return;
      }
      if (!d.moved) {
        if (d.target) {
          var k = slides.indexOf(d.target);
          if (k === cur) openLb(cur % N);
          else goTo(k);
        }
        return;
      }
      var v = d.dx / Math.max(1, Date.now() - d.t),
        w = slides[cur].offsetWidth + 12;
      var steps = Math.round(-d.dx / w);
      if (steps === 0 && (Math.abs(d.dx) > 40 || Math.abs(v) > 0.45))
        steps = d.dx < 0 ? 1 : -1;
      steps = Math.max(-4, Math.min(4, steps));
      cur = Math.max(0, Math.min(3 * N - 1, cur + steps));
      place(true);
    }
    stage.addEventListener("pointerup", function (e) {
      endDrag(e, false);
    });
    stage.addEventListener("pointercancel", function (e) {
      endDrag(e, true);
    });
    stage.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });

    function relayout() {
      sizes();
      place(false);
    }
    relayout();
    if ("ResizeObserver" in window)
      new ResizeObserver(function () {
        relayout();
      }).observe(stage);
    else window.addEventListener("resize", relayout);
    // เล่นวิดีโอเฉพาะตอนแกลเลอรีอยู่บนจอ
    var galVisible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (es) {
          galVisible = es[0].isIntersecting;
          if (galVisible) playVisible();
          else
            slides.forEach(function (f) {
              var v = f.querySelector("video");
              if (v) v.pause();
            });
        },
        { threshold: 0.15 },
      ).observe(stage);
    }

    // ---------- Lightbox ----------
    var lb = document.getElementById("lb"),
      lbStage = document.getElementById("lbStage"),
      lbCount = document.getElementById("lbCount"),
      lbZoom = document.getElementById("lbZoom");
    var lbOpen = false,
      lbI = 0,
      lbEl = null,
      lastFocus = null,
      busy = false,
      zoomScale = 1,
      zoomX = 0,
      zoomY = 0;
    function clampPan() {
      if (!lbEl) return;
      var maxX = Math.max(
          0,
          (lbEl.offsetWidth * zoomScale - lbStage.clientWidth) / 2,
        ),
        maxY = Math.max(
          0,
          (lbEl.offsetHeight * zoomScale - lbStage.clientHeight) / 2,
        );
      zoomX = Math.max(-maxX, Math.min(maxX, zoomX));
      zoomY = Math.max(-maxY, Math.min(maxY, zoomY));
    }
    function setZoom(scale) {
      zoomScale = Math.max(1, Math.min(3, scale));
      if (zoomScale === 1) zoomX = zoomY = 0;
      else clampPan();
      lbStage.classList.toggle("is-zoomed", zoomScale > 1);
      lbZoom.setAttribute("aria-pressed", zoomScale > 1 ? "true" : "false");
      lbZoom.setAttribute("aria-label", zoomScale > 1 ? "ย่อภาพ" : "ซูมภาพ");
      if (lbEl) {
        lbEl.style.transform =
          "translate3d(" +
          zoomX +
          "px," +
          zoomY +
          "px,0) scale(" +
          zoomScale +
          ")";
      }
    }
    function preload(i) {
      var it = GALLERY[(i + N) % N];
      if (it.src) {
        var im = new Image();
        im.src = DIR + it.src + ".jpg";
      }
    }
    function show(i, dir) {
      lbI = (i + N) % N;
      reportGalleryChange(lbI);
      zoomScale = 1;
      zoomX = zoomY = 0;
      lbStage.classList.remove("is-zoomed", "is-panning");
      lbZoom.setAttribute("aria-pressed", "false");
      lbZoom.setAttribute("aria-label", "ซูมภาพ");
      var el = media(GALLERY[lbI], true);
      el.className = "lb-media";
      if (el.tagName === "VIDEO") {
        el.preload = "auto";
        el.autoplay = true;
      }
      var old = lbEl;
      lbEl = el;
      if (dir && !REDUCE) {
        el.classList.add(dir > 0 ? "from-r" : "from-l");
      }
      lbStage.appendChild(el);
      if (el.tagName === "VIDEO") {
        var p = el.play();
        if (p && p.catch) p.catch(function () {});
      }
      if (dir && !REDUCE) {
        void el.offsetWidth;
        el.classList.remove("from-r", "from-l");
      }
      if (old) {
        if (dir && !REDUCE) {
          old.style.transform = "";
          old.classList.add(dir > 0 ? "to-l" : "to-r");
          setTimeout(function () {
            old.remove();
          }, 430);
        } else old.remove();
      }
      lbCount.textContent = lbI + 1 + " / " + N;
      preload(lbI + 3);
      preload(lbI - 3);
    }
    function lbGo(n) {
      if (busy) return;
      busy = true;
      setTimeout(
        function () {
          busy = false;
        },
        REDUCE ? 0 : 280,
      );
      show(lbI + n, n);
    }
    function openLb(i) {
      lastFocus = document.activeElement;
      lbOpen = true;
      playVisible();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      lbStage.innerHTML = "";
      lbEl = null;
      show(i, 0);
      requestAnimationFrame(function () {
        lb.classList.add("show");
      });
      document.getElementById("lbClose").focus();
    }
    function closeLb() {
      if (!lbOpen) return;
      lbOpen = false;
      lb.classList.remove("show");
      document.body.style.overflow = "";
      setTimeout(
        function () {
          lb.hidden = true;
          lbStage.innerHTML = "";
          lbEl = null;
          document.dispatchEvent(new CustomEvent("wedding-lightbox-closed"));
        },
        REDUCE ? 0 : 250,
      );
      cur = N + lbI;
      place(false);
      playVisible();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.getElementById("lbClose").addEventListener("click", closeLb);
    document.getElementById("lbPrev").addEventListener("click", function () {
      lbGo(-1);
    });
    document.getElementById("lbNext").addEventListener("click", function () {
      lbGo(1);
    });
    lbZoom.addEventListener("click", function () {
      setZoom(zoomScale > 1 ? 1 : 2);
    });
    lbStage.addEventListener("dblclick", function (e) {
      if (e.target === lbEl) {
        e.preventDefault();
        setZoom(zoomScale > 1 ? 1 : 2);
      }
    });
    lbStage.addEventListener(
      "wheel",
      function (e) {
        if (!lbEl || lbEl.tagName === "VIDEO") return;
        e.preventDefault();
        setZoom(zoomScale + (e.deltaY < 0 ? 0.25 : -0.25));
      },
      { passive: false },
    );
    var suppressStageClick = false;
    lb.addEventListener("click", function (e) {
      if (suppressStageClick && e.target === lbStage) {
        suppressStageClick = false;
        return;
      }
      if (e.target === lb || e.target === lbStage) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (!lbOpen) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowRight") lbGo(1);
      else if (e.key === "ArrowLeft") lbGo(-1);
      else if (e.key === "Tab") {
        // วนโฟกัสอยู่ในหน้าต่างภาพ
        var f = [].slice.call(lb.querySelectorAll("button")),
          a = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(a + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    // Pinch uses native touch events for iOS Safari; pointer events handle one-finger gestures.
    var t = null,
      pinch = null;
    function pointDistance(a, b) {
      var dx = b.x - a.x,
        dy = b.y - a.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    function pointCenter(a, b) {
      return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }
    function beginPinch(a, b) {
      var center = pointCenter(a, b),
        rect = lbStage.getBoundingClientRect();
      pinch = {
        distance: Math.max(1, pointDistance(a, b)),
        scale: zoomScale,
        imageX:
          (center.x - rect.left - lbStage.clientWidth / 2 - zoomX) / zoomScale,
        imageY:
          (center.y - rect.top - lbStage.clientHeight / 2 - zoomY) / zoomScale,
      };
      t = null;
      lbStage.classList.add("is-panning");
      lbEl.style.transition = "none";
    }
    lbStage.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length < 2 || !lbEl || lbEl.tagName === "VIDEO") return;
        e.preventDefault();
        if (e.touches.length === 2) {
          beginPinch(
            { x: e.touches[0].clientX, y: e.touches[0].clientY },
            { x: e.touches[1].clientX, y: e.touches[1].clientY },
          );
        }
      },
      { passive: false },
    );
    lbStage.addEventListener(
      "touchmove",
      function (e) {
        if (!pinch || e.touches.length < 2 || !lbEl) return;
        e.preventDefault();
        var a = { x: e.touches[0].clientX, y: e.touches[0].clientY },
          b = { x: e.touches[1].clientX, y: e.touches[1].clientY },
          center = pointCenter(a, b),
          rect = lbStage.getBoundingClientRect(),
          scale = pinch.scale * (pointDistance(a, b) / pinch.distance);
        zoomX =
          center.x - rect.left - lbStage.clientWidth / 2 - scale * pinch.imageX;
        zoomY =
          center.y - rect.top - lbStage.clientHeight / 2 - scale * pinch.imageY;
        setZoom(scale);
      },
      { passive: false },
    );
    function endPinch(e) {
      if (!pinch) return;
      e.preventDefault();
      pinch = null;
      t = null;
      lbStage.classList.remove("is-panning");
      if (lbEl) lbEl.style.transition = "";
      if (zoomScale > 1) setZoom(zoomScale);
      suppressStageClick = true;
      setTimeout(function () {
        suppressStageClick = false;
      }, 500);
    }
    lbStage.addEventListener("touchend", endPinch, { passive: false });
    lbStage.addEventListener("touchcancel", endPinch, { passive: false });
    lbStage.addEventListener("pointerdown", function (e) {
      if (!lbEl || e.button > 0 || pinch) return;
      try {
        lbStage.setPointerCapture(e.pointerId);
      } catch (_) {}
      t = {
        x: e.clientX,
        y: e.clientY,
        id: e.pointerId,
        pointerType: e.pointerType,
        zoomX: zoomX,
        zoomY: zoomY,
      };
      if (zoomScale > 1) lbStage.classList.add("is-panning");
      lbEl.style.transition = "none";
    });
    lbStage.addEventListener("pointermove", function (e) {
      if (!t || e.pointerId !== t.id || !lbEl || pinch) return;
      var dx = e.clientX - t.x,
        dy = e.clientY - t.y;
      if (zoomScale > 1) {
        zoomX = t.zoomX + dx;
        zoomY = t.zoomY + dy;
        setZoom(zoomScale);
      } else if (t.pointerType === "touch") {
        if (Math.abs(dy) > Math.abs(dx) && dy > 0) {
          lbEl.style.transform =
            "translate3d(0," +
            dy +
            "px,0) scale(" +
            Math.max(0.85, 1 - dy / 1200) +
            ")";
          lb.style.background =
            "rgba(9,21,40," + Math.max(0.5, 0.95 - dy / 600) + ")";
        } else {
          lbEl.style.transform = "translate3d(" + dx + "px,0,0)";
        }
      }
    });
    function lbEnd(e, cancel) {
      if (!t || e.pointerId !== t.id || pinch) return;
      var dx = e.clientX - t.x,
        dy = e.clientY - t.y,
        pointerType = t.pointerType;
      t = null;
      if (lbEl) {
        lbEl.style.transition = "";
      }
      lbStage.classList.remove("is-panning");
      lb.style.background = "";
      if (e.type === "pointerup" && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        suppressStageClick = true;
        setTimeout(function () {
          suppressStageClick = false;
        }, 0);
      }
      if (zoomScale > 1) {
        setZoom(zoomScale);
        return;
      }
      if (cancel) {
        if (lbEl) lbEl.style.transform = "";
        return;
      }
      if (dy > 110 && Math.abs(dy) > Math.abs(dx)) {
        closeLb();
        return;
      }
      if (lbEl) lbEl.style.transform = "";
      if (
        e.type === "pointerup" &&
        pointerType === "touch" &&
        Math.abs(dx) > 60 &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        lbGo(dx < 0 ? 1 : -1);
        return;
      }
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6 && e.target === lbStage)
        closeLb();
    }
    lbStage.addEventListener("pointerup", function (e) {
      lbEnd(e, false);
    });
    lbStage.addEventListener("pointercancel", function (e) {
      lbEnd(e, true);
    });
  })();

  // ---------- Surin guide + map ----------
  function gmaps(p) {
    return (
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(p.n + " Surin") +
      (p.id ? "&query_place_id=" + p.id : "")
    );
  }
  try {
    (function (G) {
      var map = null,
        layers = {},
        selectedCategories = {};
      if (window.L) {
        map = L.map("guideMap", { scrollWheelZoom: false, tap: true }).setView(
          [VENUE.lat, VENUE.lng],
          13,
        );
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_4ia9_1_4b58e88be9595ecc6f355fbe",
          {
            maxZoom: 19,
            subdomains: "abcd",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        ).addTo(map);
        L.marker([VENUE.lat, VENUE.lng], {
          zIndexOffset: 1000,
          icon: L.divIcon({
            className: "",
            html: '<div class="pin venue"></div>',
            iconSize: [34, 34],
            iconAnchor: [17, 34],
            popupAnchor: [0, -30],
          }),
        })
          .addTo(map)
          .bindPopup(
            "<b>งานแต่งเตเต้ &amp; ทีม</b><br>" +
              VENUE.n +
              '<br><a href="' +
              gmaps(VENUE) +
              '" target="_blank" rel="noopener">เปิดใน Google Maps</a>',
          );
      } else {
        document.getElementById("guideMap").style.display = "none";
      }
      var tabs = document.getElementById("tabs"),
        panels = document.getElementById("panels");
      function esc(t) {
        var d = document.createElement("div");
        d.textContent = t;
        return d.innerHTML;
      }
      Object.keys(G).forEach(function (cat, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.id = "tab" + i;
        b.setAttribute("aria-controls", "pan" + i);
        b.setAttribute("aria-pressed", "false");
        var sw = document.createElement("span");
        sw.className = "sw";
        sw.style.background = COLORS[cat] || "#999";
        b.append(sw, document.createTextNode(cat));
        tabs.appendChild(b);
        var ul = document.createElement("ul");
        ul.className = "places";
        ul.id = "pan" + i;
        ul.hidden = true;
        if (map) layers[i] = L.layerGroup();
        G[cat].forEach(function (p, j) {
          var li = document.createElement("li");
          li.style.setProperty("--place-color", COLORS[cat] || "#999");
          var h = document.createElement("h3");
          if (map && p.lat) {
            var mk = L.marker([p.lat, p.lng], {
              icon: L.divIcon({
                className: "",
                html:
                  '<div class="pin" style="background:' +
                  (COLORS[cat] || "#999") +
                  '"></div>',
                iconSize: [26, 26],
                iconAnchor: [13, 26],
                popupAnchor: [0, -24],
              }),
            }).bindPopup(
              "<b>" +
                esc(p.n) +
                "</b><br>" +
                esc(p.m) +
                '<br><a href="' +
                gmaps(p) +
                '" target="_blank" rel="noopener">เปิดใน Google Maps</a>',
            );
            layers[i].addLayer(mk);
            var nb = document.createElement("button");
            nb.type = "button";
            nb.textContent = p.n;
            nb.setAttribute("aria-label", "ดู " + p.n + " บนแผนที่");
            nb.addEventListener("click", function () {
              selectedCategories[i] = true;
              syncSelection();
              document
                .getElementById("guideMap")
                .scrollIntoView({ behavior: "smooth", block: "center" });
              map.flyTo([p.lat, p.lng], 15, { duration: 0.6 });
              setTimeout(function () {
                mk.openPopup();
              }, 650);
            });
            h.appendChild(nb);
          } else {
            h.textContent = p.n;
          }
          var a = document.createElement("a");
          a.className = "map";
          a.target = "_blank";
          a.rel = "noopener";
          a.href = gmaps(p);
          a.textContent = "นำทาง";
          a.setAttribute("aria-label", "นำทางไป " + p.n + " ด้วย Google Maps");
          var m = document.createElement("div");
          m.className = "meta";
          m.textContent = p.m;
          var d = document.createElement("p");
          d.textContent = p.d;
          li.append(h, a, m, d);
          ul.appendChild(li);
        });
        panels.appendChild(ul);
      });
      if (map) {
        window.addEventListener("load", function () {
          map.invalidateSize();
        });
        if ("ResizeObserver" in window) {
          new ResizeObserver(function () {
            map.invalidateSize();
          }).observe(document.getElementById("guideMap"));
        }
      }
      function showLayer() {
        if (!map) return;
        Object.keys(layers).forEach(function (k) {
          map.removeLayer(layers[k]);
        });
        var pts = [[VENUE.lat, VENUE.lng]];
        Object.keys(selectedCategories).forEach(function (i) {
          layers[i].addTo(map);
          layers[i].eachLayer(function (l) {
            pts.push(l.getLatLng());
          });
        });
        if (!Object.keys(selectedCategories).length) {
          map.setView([VENUE.lat, VENUE.lng], 13);
          return;
        }
        map.fitBounds(pts, { padding: [30, 30], maxZoom: 15 });
      }
      function syncSelection() {
        var hasMultiple = Object.keys(selectedCategories).length > 1;
        panels.classList.toggle("has-multiple", hasMultiple);
        tabs.querySelectorAll("button").forEach(function (b, j) {
          b.setAttribute(
            "aria-pressed",
            selectedCategories[j] ? "true" : "false",
          );
        });
        panels.querySelectorAll("ul").forEach(function (u, j) {
          u.hidden = !selectedCategories[j];
        });
        panels
          .querySelectorAll(".places:not([hidden]) li")
          .forEach(function (li, i) {
            li.classList.toggle("no-top-border", hasMultiple && i < 2);
            li.classList.toggle(
              "category-start",
              hasMultiple &&
                i >= 2 &&
                li === li.parentElement.firstElementChild,
            );
          });
        showLayer();
      }
      tabs.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        var i = [].indexOf.call(tabs.children, b);
        if (selectedCategories[i]) {
          delete selectedCategories[i];
        } else {
          selectedCategories[i] = true;
        }
        syncSelection();
      });
      syncSelection();
    })(G);
  } catch (error) {
    console.error("Unable to initialize the Surin guide:", error);
    document.getElementById("guideMap").style.display = "none";
    document.getElementById("panels").textContent =
      "แสดงรายชื่อร้านและที่เที่ยวไม่ได้ กรุณาตรวจสอบข้อมูลใน script.js";
  }

  // ---------- RSVP → Google Sheet ----------
  var form = document.getElementById("rsvpForm"),
    btn = document.getElementById("rsvpBtn");
  var deadlineDate = document
    .getElementById("rsvpDeadline")
    .getAttribute("datetime");
  var rsvpClosesAt =
    new Date(deadlineDate + "T00:00:00+07:00").getTime() + 24 * 60 * 60 * 1000;
  function closeRsvp() {
    form.hidden = true;
    document.getElementById("sent").classList.remove("show");
    document.getElementById("result").classList.remove("show");
    document.getElementById("rsvpClosed").classList.add("show");
  }
  function isRsvpClosed() {
    return Date.now() >= rsvpClosesAt;
  }
  function watchRsvpDeadline() {
    var remaining = rsvpClosesAt - Date.now();
    if (remaining <= 0) {
      closeRsvp();
      return;
    }
    window.setTimeout(watchRsvpDeadline, Math.min(remaining, 2147483647));
  }
  watchRsvpDeadline();
  function attending() {
    return (
      form.querySelector("input[name=attend]:checked").value === "มาแน่นอน"
    );
  }
  var gangSelect = document.getElementById("f-gang"),
    gangOtherWrap = document.getElementById("gangOtherWrap"),
    gangOtherInput = document.getElementById("f-gang-other"),
    partSelect = document.getElementById("f-part");
  function updateRsvpFields() {
    var on = attending(),
      otherGang = gangSelect.value === "other";
    document.getElementById("attendBits").style.display = on ? "" : "none";
    gangOtherWrap.hidden = !otherGang;
    gangOtherInput.required = otherGang;
    partSelect.required = on;
    if (!otherGang) {
      gangOtherInput.value = "";
      document.getElementById("e-gang-other").style.display = "none";
    }
  }
  form.addEventListener("change", function () {
    updateRsvpFields();
  });
  updateRsvpFields();
  function collect() {
    var on = attending(),
      selectedGang = gangSelect.options[gangSelect.selectedIndex];
    return {
      name: document.getElementById("f-name").value.trim(),
      gang:
        gangSelect.value === "other"
          ? "อื่นๆ: " + gangOtherInput.value.trim()
          : selectedGang && gangSelect.value
            ? selectedGang.textContent.trim()
            : "",
      attend: form.querySelector("input[name=attend]:checked").value,
      count: on ? document.getElementById("f-count").value || "1" : "0",
      part: on ? partSelect.value : "",
      wish: document.getElementById("f-wish").value.trim(),
    };
  }
  function fallback(d) {
    var lines = [
      "ตอบรับงานแต่ง เตเต้ & ทีม 15.01.2570",
      "ชื่อ: " + d.name,
      "แก้งค์: " + d.gang,
      "สถานะ: " + d.attend,
    ];
    if (d.attend === "มาแน่นอน") {
      lines.push("จำนวน: " + d.count + " คน", "ช่วงที่ร่วม: " + d.part);
    }
    if (d.wish) lines.push("ข้อความ: " + d.wish);
    lines.push("#TeteFormsHerTeam");
    var text = lines.join("\n");
    document.getElementById("msg").textContent = text;
    document.getElementById("lineBtn").href =
      "https://line.me/R/share?text=" + encodeURIComponent(text);
    var r = document.getElementById("result");
    r.classList.add("show");
    r.scrollIntoView({ block: "nearest" });
    document.getElementById("copyBtn").onclick = function () {
      (navigator.clipboard
        ? navigator.clipboard.writeText(text)
        : Promise.reject()
      )
        .then(function () {
          document.getElementById("copied").style.display = "block";
        })
        .catch(function () {
          var c = document.getElementById("copied");
          c.textContent = "คัดลอกไม่ได้ กดค้างที่ข้อความด้านบนเพื่อคัดลอกเอง";
          c.style.display = "block";
        });
    };
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (isRsvpClosed()) {
      closeRsvp();
      return;
    }
    var d = collect(),
      en = document.getElementById("e-name"),
      eg = document.getElementById("e-gang"),
      ego = document.getElementById("e-gang-other"),
      ep = document.getElementById("e-part");
    if (!d.name) {
      en.style.display = "block";
      document.getElementById("f-name").focus();
      return;
    }
    en.style.display = "none";
    if (!d.gang) {
      eg.style.display = "block";
      gangSelect.focus();
      return;
    }
    eg.style.display = "none";
    if (gangSelect.value === "other" && !gangOtherInput.value.trim()) {
      ego.style.display = "block";
      gangOtherInput.focus();
      return;
    }
    ego.style.display = "none";
    if (attending() && !partSelect.value) {
      ep.style.display = "block";
      partSelect.focus();
      return;
    }
    ep.style.display = "none";
    document.getElementById("result").classList.remove("show");
    if (!RSVP_URL) {
      fallback(d);
      return;
    }
    btn.disabled = true;
    btn.textContent = "กำลังส่ง…";
    fetch(RSVP_URL + "?endpoint=rsvp", {
      method: "POST",
      mode: "cors",
      body: new URLSearchParams(d),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("RSVP request failed with status " + response.status);
        }
        return response.json();
      })
      .then(function (payload) {
        if (!payload || payload.ok !== true) {
          throw new Error("RSVP endpoint did not confirm the submission");
        }
        form.hidden = true;
        var s = document.getElementById("sent");
        s.classList.add("show");
        s.scrollIntoView({ block: "nearest" });
        document.getElementById("sentTitle").textContent =
          d.attend === "มาแน่นอน"
            ? "ได้รับคำตอบแล้ว แล้วเจอกันนะ!"
            : "ได้รับคำตอบแล้ว ขอบคุณที่บอกเรานะ";
        document.dispatchEvent(
          new CustomEvent("wedding-rsvp-success", {
            detail: { wish: d.wish },
          }),
        );
      })
      .catch(function (error) {
        console.error("RSVP submission failed:", error);
        fallback(d);
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = "ส่งคำตอบ";
      });
  });
  document.getElementById("again").addEventListener("click", function () {
    if (isRsvpClosed()) {
      closeRsvp();
      return;
    }
    document.getElementById("sent").classList.remove("show");
    form.hidden = false;
    document.getElementById("f-name").focus();
  });

  // ---------- Nav highlight ----------
  var links = [].slice.call(document.querySelectorAll(".nav a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) {
              var on = l.getAttribute("href") === "#" + en.target.id;
              l.setAttribute("aria-current", on ? "true" : "false");
              if (on && window.innerWidth < 820) {
                l.parentNode.parentNode.scrollTo({
                  left: l.offsetLeft - 20,
                  behavior: "smooth",
                });
              }
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(function (l) {
      var s = document.querySelector(l.getAttribute("href"));
      if (s) io.observe(s);
    });
  }
})();
