/* ============================================================
   DESIGN CATALOGUE / LOOKBOOK
   ------------------------------------------------------------
   Every image lives in /images. To add one, drop the file in and
   add a line to the right category below:
        [ "file.jpg", "English caption", "தமிழ் தலைப்பு" ]
   Set "wide" or "tall" as a 4th value to make a plate bigger.
   ============================================================ */
(function () {
  "use strict";
  var R = window.BC_ROOT || "";
  function I(f) { return R + "images/" + f; }

  var CATS = [
    { en: "All Designs", ta: "அனைத்தும்", key: "all" },
    { en: "Front Elevations", ta: "முகப்பு", key: "elev" },
    { en: "Living & Hall", ta: "வரவேற்பறை", key: "living" },
    { en: "Kitchen & Dining", ta: "சமையலறை", key: "kitchen" },
    { en: "Bedrooms", ta: "படுக்கையறை", key: "bed" },
    { en: "Outdoor & Garden", ta: "தோட்டம்", key: "out" },
    { en: "Commercial", ta: "வர்த்தகம்", key: "com" },
    { en: "Renovation", ta: "புதுப்பிப்பு", key: "renov" },
    { en: "Plots", ta: "பிளாட்", key: "plot" }
  ];

  var PLATES = [
    // ---- front elevations ----
    ["villa-front.jpg","Modern Villa Elevation","நவீன வில்லா முகப்பு","elev","wide"],
    ["twostorey-front.jpg","Two-Storey Elevation","இரு மாடி முகப்பு","elev"],
    ["garden-front.jpg","Garden Home Elevation","தோட்ட வீடு முகப்பு","elev"],
    ["2bhk-front.jpg","2BHK Elevation","2BHK முகப்பு","elev"],
    ["compact-front.jpg","Compact Home Elevation","சிறிய வீடு முகப்பு","elev"],
    ["traditional-front.jpg","Traditional Elevation","பாரம்பரிய முகப்பு","elev"],
    ["elevation-1.jpg","Elevation Study 01","வடிவமைப்பு 01","elev"],
    ["elevation-2.jpg","Elevation Study 02","வடிவமைப்பு 02","elev"],
    ["elevation-3.jpg","Elevation Study 03","வடிவமைப்பு 03","elev","tall"],
    ["elevation-4.jpg","Elevation Study 04","வடிவமைப்பு 04","elev"],
    ["elevation-5.jpg","Elevation Study 05","வடிவமைப்பு 05","elev"],
    ["i0.jpg","Modern Home Concept","நவீன வீடு","elev"],
    ["i1.jpg","Villa Concept","வில்லா வடிவமைப்பு","elev"],
    ["i2.jpg","Two-Storey Concept","இரு மாடி வீடு","elev"],
    ["i3.jpg","Elevation Concept","முகப்பு வடிவமைப்பு","elev"],
    ["i4.jpg","Garden Home Concept","தோட்ட வீடு","elev"],
    ["i5.jpg","Compact Home Concept","சிறிய வீடு","elev"],

    // ---- living & hall ----
    ["villa-living-room.jpg","Villa Living Room","வில்லா வரவேற்பறை","living","wide"],
    ["twostorey-living-room.jpg","Double-Height Living","இரு மாடி வரவேற்பறை","living","tall"],
    ["garden-living-room.jpg","Garden Home Living","தோட்ட வீடு வரவேற்பறை","living"],
    ["2bhk-hall.jpg","2BHK Hall","2BHK ஹால்","living"],
    ["traditional-hall.jpg","Traditional Hall","பாரம்பரிய ஹால்","living"],
    ["look-villa-1.jpg","Living Room Study 01","வரவேற்பறை 01","living"],
    ["look-villa-2.jpg","Living Room Study 02","வரவேற்பறை 02","living"],
    ["look-int-1.jpg","Interior Study 01","இன்டீரியர் 01","living"],
    ["look-int-2.jpg","Interior Study 02","இன்டீரியர் 02","living"],
    ["look-int-3.jpg","Interior Study 03","இன்டீரியர் 03","living"],
    ["i6.jpg","Living Room Concept","வரவேற்பறை","living"],
    ["i9.jpg","False Ceiling Detail","ஃபால்ஸ் சீலிங்","living"],
    ["i10.jpg","TV Unit Detail","டிவி யூனிட்","living"],

    // ---- kitchen ----
    ["villa-kitchen.jpg","Villa Kitchen","வில்லா சமையலறை","kitchen","wide"],
    ["twostorey-kitchen.jpg","Island Kitchen","ஐலண்ட் கிச்சன்","kitchen"],
    ["garden-kitchen.jpg","Garden Home Kitchen","தோட்ட வீடு சமையலறை","kitchen"],
    ["2bhk-kitchen.jpg","2BHK Modular Kitchen","2BHK கிச்சன்","kitchen"],
    ["traditional-kitchen.jpg","Traditional Wooden Kitchen","பாரம்பரிய சமையலறை","kitchen","tall"],
    ["look-villa-3.jpg","Kitchen Study 01","சமையலறை 01","kitchen"],
    ["look-villa-4.jpg","Kitchen Study 02","சமையலறை 02","kitchen"],
    ["i7.jpg","Modular Kitchen Concept","மாடுலார் கிச்சன்","kitchen"],

    // ---- bedrooms ----
    ["villa-bedroom.jpg","Villa Bedroom","வில்லா படுக்கையறை","bed","wide"],
    ["twostorey-bedroom.jpg","Balcony Bedroom","பால்கனி படுக்கையறை","bed"],
    ["garden-bedroom.jpg","Garden View Bedroom","தோட்ட படுக்கையறை","bed"],
    ["2bhk-bedroom.jpg","2BHK Bedroom","2BHK படுக்கையறை","bed"],
    ["traditional-bedroom.jpg","Traditional Bedroom","பாரம்பரிய படுக்கையறை","bed"],
    ["i8.jpg","Bedroom Concept","படுக்கையறை","bed"],
    ["i11.jpg","Wardrobe Detail","வார்ட்ரோப்","bed"],

    // ---- outdoor ----
    ["villa-backyard.jpg","Villa Pool & Deck","வில்லா நீச்சல் குளம்","out","wide"],
    ["twostorey-pool.jpg","Swimming Pool Court","நீச்சல் குளம்","out","tall"],
    ["garden-backyard.jpg","Landscaped Garden","தோட்ட அமைப்பு","out"],
    ["2bhk-terrace.jpg","Terrace Garden","மொட்டை மாடி தோட்டம்","out"],
    ["traditional-backyard.jpg","Open Courtyard","திறந்த முற்றம்","out"],

    // ---- commercial ----
    ["commercial-mall-2.jpg","Mall — Glazed Frontage","வர்த்தக வளாகம்","com","wide"],
    ["commercial-mahal-2.jpg","Mahal — Main Hall","மஹால் ஹால்","com","tall"],
    ["commercial-mahal-3.jpg","Mahal — Seating & Stage","அரங்கம்","com"],
    ["commercial-mahal-4.jpg","Mahal — Dining Area","உணவு அரங்கம்","com"],
    ["commercial-mall-1.jpg","Retail Block","கடை வளாகம்","com"],
    ["commercial-mall-3.jpg","Mall — Upper Levels","மேல் தளங்கள்","com"],
    ["i16.jpg","Office Building","அலுவலகம்","com"],
    ["i17.jpg","Retail Space","கடை இடம்","com"],
    ["i18.jpg","Business Tower","வணிக கோபுரம்","com"],
    ["i19.jpg","Showroom","ஷோரூம்","com"],

    // ---- renovation ----
    ["look-renov-2.jpg","Renovation Study 02","புதுப்பிப்பு 02","renov"],
    ["look-renov-3.jpg","Renovation Study 03","புதுப்பிப்பு 03","renov"],
    ["look-renov-4.jpg","Renovation Study 04","புதுப்பிப்பு 04","renov"],
    ["look-renov-5.jpg","Renovation Study 05","புதுப்பிப்பு 05","renov"],
    ["i12.jpg","Home Makeover","வீடு புதுப்பிப்பு","renov"],
    ["i13.jpg","Building Extension","மாடி உயர்த்துதல்","renov"],
    ["i14.jpg","Kitchen Remodel","கிச்சன் புதுப்பிப்பு","renov"],
    ["i15.jpg","Restoration Work","மறுசீரமைப்பு","renov"],

    // ---- plots ----
    ["i20.jpg","DTCP Approved Plots","DTCP பிளாட்","plot","wide"],
    ["i21.jpg","Layout Plan","லேஅவுட்","plot"],
    ["i22.jpg","Prime Location","முக்கிய இடம்","plot"],
    ["i23.jpg","Investment Land","முதலீட்டு நிலம்","plot"]
  ];

  var tabs = document.getElementById("galTabs"),
      grid = document.getElementById("galGrid"),
      count = document.getElementById("galCount");
  if (!tabs || !grid) return;

  function render(key) {
    var list = key === "all" ? PLATES : PLATES.filter(function (p) { return p[3] === key; });
    grid.innerHTML = "";
    list.forEach(function (p, i) {
      var d = document.createElement("figure");
      d.className = "plate" + (p[4] ? " " + p[4] : "");
      d.innerHTML =
        '<img src="' + I(p[0]) + '" alt="' + p[1] + '" loading="lazy">' +
        '<span class="plate-no">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<figcaption><b>' + p[1] + "</b><span class='tamil'>" + p[2] + "</span></figcaption>";
      d.addEventListener("click", function () { window.BCopenLightbox(I(p[0]), p[1], p[2]); });
      grid.appendChild(d);
      if (window.BCobserve) window.BCobserve(d);
    });
    if (count) count.textContent = list.length + (list.length === 1 ? " design" : " designs");
  }

  CATS.forEach(function (c, i) {
    var b = document.createElement("button");
    b.className = "gal-tab" + (i === 0 ? " active" : "");
    b.innerHTML = c.en + '<span class="gt tamil">' + c.ta + "</span>";
    b.addEventListener("click", function () {
      [].slice.call(tabs.querySelectorAll(".gal-tab")).forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      render(c.key);
    });
    tabs.appendChild(b);
  });
  render("all");
})();
