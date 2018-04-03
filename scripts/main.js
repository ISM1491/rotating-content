
function next_degree(cur, deg) {
  return cur + deg;
}
jQuery.fn.next90 = function(degrees, f) {
  var loc_deg = degrees - 90;
  var steps = 18;
  var callback = f || function() {};
  var that = this;
  var timer = setInterval(function() {
    loc_deg = loc_deg + 5;
    that.css({ transform: "rotateY(" + loc_deg + "deg)" });
    steps--;
    if (steps === 0) {
      clearInterval(timer);
      callback();
    }
  }, 20);
  return $(this);
};
jQuery.fn.prev90 = function(degrees, f) {
  var loc_deg = degrees + 90;
  var steps = 18;
  var callback = f || function() {};
  var that = this;
  var timer = setInterval(function() {
    loc_deg = loc_deg - 5;
    that.css({ transform: "rotateY(" + loc_deg + "deg)" });
    steps--;
    if (steps === 0) {
      clearInterval(timer);
      callback();
    }
  }, 20);
  return $(this);
};
function Rotator(obj_1) {
  var current_deg = 0;
  //инициализируем номера стартового контента
  var current_number = [];
  for (let i = 0; i < obj_1["box"].length; i++) {
    current_number[i] = 1;
  }
  //подсчет переворотов для того чтобы не было отображения на обратной стороне
  var rotateEven = [];
  for (let i = 0; i < obj_1["box"].length; i++) {
    rotateEven[i] = 1;
  }
  //колличество контента в каждом боксе
  var quant = [];
  for (let i = 0; i < obj_1["box"].length; i++) {
    quant[i] = $(obj_1["box"][i] + " .slider_content").length;
  }
  var that = this;
  //функция проверки вперед
  this.checkNext = function(i) {
    if (current_number[i] == quant[i]) {
      current_number[i] = 0;
    }
    current_number[i]++;
    rotateEven[i]++;
    /* Тут переворачиваем контент после переворота потомушто при нечетном перевороте контент на обратной стороне блока (зеркальный) */
    if (rotateEven[i] % 2 == 0) {
      $(
        obj_1["box"][i] + " .slider_content[data-num=" + current_number[i] + "]"
      ).css({
        transform: "rotateY(180deg)"
      });
    } else {
      $(
        obj_1["box"][i] + " .slider_content[data-num=" + current_number[i] + "]"
      ).css({
        transform: "rotateY(360deg)"
      });
    }
  };
  //функция проверки назад
  this.checkPrev = function(i) {
    if (current_number[i] == 1) {
      current_number[i] = quant[i] + 1;
    }
    current_number[i]--;
    rotateEven[i]++;
    /* Тут переворачиваем контент после переворота потомушто при нечетном перевороте контент на обратной стороне блока (зеркальный) */
    if (rotateEven[i] % 2 == 0) {
      $(
        obj_1["box"][i] + " .slider_content[data-num=" + current_number[i] + "]"
      ).css({
        transform: "rotateY(180deg)"
      });
    } else {
      $(
        obj_1["box"][i] + " .slider_content[data-num=" + current_number[i] + "]"
      ).css({
        transform: "rotateY(360deg)"
      });
    }
  };
  //автовращение
  this.autorotate = function() {
    if (obj_1["autorotate"] == "yes") {
      $(".button_box .button_disable").removeClass("no_display");
      setInterval(function() {
        current_deg = next_degree(current_deg, 180);
        for (let i = 0; i < obj_1["box"].length; i++) {
          /* Вражаем на 90 градусов */
          $(obj_1["box"][i]).next90.call(
            $(obj_1["box"][i]),
            current_deg - 90,
            function() {
              //проверяем тут все
              that.checkNext(i);
              //скрываем старый.
              $(obj_1["box"][i] + " .yes_display")
                .addClass("no_display")
                .removeClass("yes_display");
              //даем видимости следующему
              $(
                obj_1["box"][i] +
                  " .slider_content[data-num=" +
                  current_number[i] +
                  "]"
              )
                .addClass("yes_display")
                .removeClass("no_display");
              $(obj_1["box"][i]).next90.call($(obj_1["box"][i]), current_deg);
            }
          );
        }
      }, 5000);
    }
    return that;
  };
  //следующий контент
  this.nextContent = function() {
    $(obj_1["button_next"]).on("click", function(e) {
      e.preventDefault();
      $(".button_box .button_disable").removeClass("no_display");
      current_deg = next_degree(current_deg, 180);
      for (let i = 0; i < obj_1["box"].length; i++) {
        /* Вражаем на 90 градусов */
        $(obj_1["box"][i]).next90.call(
          $(obj_1["box"][i]),
          current_deg - 90,
          function() {
            //проверяем тут все
            that.checkNext(i);
            //скрываем старый.
            $(obj_1["box"][i] + " .yes_display")
              .addClass("no_display")
              .removeClass("yes_display");
            //даем видимости следующему
            $(
              obj_1["box"][i] +
                " .slider_content[data-num=" +
                current_number[i] +
                "]"
            )
              .addClass("yes_display")
              .removeClass("no_display");
            $(obj_1["box"][i]).next90.call(
              $(obj_1["box"][i]),
              current_deg,
              function() {
                $(".button_box .button_disable").addClass("no_display");
              }
            );
          }
        );
      }
    });
    return that;
  };
  //предидущий контент
  this.prevContent = function() {
    $(obj_1["button_prev"]).on("click", function(e) {
      e.preventDefault();
      $(".button_box .button_disable").removeClass("no_display");
      current_deg = next_degree(current_deg, -180);
      for (let i = 0; i < obj_1["box"].length; i++) {
        /* Вражаем на 90 градусов */
        $(obj_1["box"][i]).prev90.call(
          $(obj_1["box"][i]),
          current_deg + 90,
          function() {
            //проверяем тут все
            that.checkPrev(i);
            //скрываем старый.
            $(obj_1["box"][i] + " .yes_display")
              .addClass("no_display")
              .removeClass("yes_display");
            //даем видимости следующему
            $(
              obj_1["box"][i] +
                " .slider_content[data-num=" +
                current_number[i] +
                "]"
            )
              .addClass("yes_display")
              .removeClass("no_display");
            $(obj_1["box"][i]).prev90.call(
              $(obj_1["box"][i]),
              current_deg,
              function() {
                $(".button_box .button_disable").addClass("no_display");
              }
            );
          }
        );
      }
    });
    return that;
  };
  return this;
}


user_object = {
  button_next: "#next_slide_btn",
  button_prev: "#prev_slide_btn",
  box: [".slider_box_1", ".slider_box_2"],
  autorotate: "no"
};
window.onload = function() {
  var new_rotator = new Rotator(user_object).autorotate().nextContent().prevContent();
};
