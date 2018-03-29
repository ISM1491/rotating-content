// jQuery.fn.rotate = function(degrees, f) {
//     var loc_deg=degrees-90;
//     var steps= 12;
//     var callback=f ||function () {};
//     var that=this;
//     var timer = setInterval(function () {
//         loc_deg=loc_deg+7.5;
//         that.css({'transform' : 'rotateY('+ loc_deg +'deg)'});
//         steps--;
//         if(steps===0){
//             clearInterval(timer);
//             callback();
//         }
//     }, 20);
//     return $(this);
// };
// window.onload=function () {
//     function makeDeg() {
//         var currentDeg = 0;
//
//         return function() {
//             return currentDeg+=90;
//         };
//     }
//     var new_deg=makeDeg();
//     var quant=($(".slider_box .slider_content").length)/2;
//     var current_number=1;
//     var rotateEven=1;
//     var flag=true;
//     $("#next_slide_btn").on("click",function (e) {
//         e.preventDefault();
//         $(".button_box .button_disable").removeClass("no_display");
//         $(".slider_box .yes_display").rotate(new_deg(),function () {
//             if(current_number==quant){
//                 current_number=0;
//                 flag=false;
//             }
//             current_number++;
//             rotateEven++;
//             if(rotateEven%2==0){$(".slider_content[data-num="+current_number+"]").children().css({'transform' : 'rotateY(180deg)'});}
//             else {$(".slider_content[data-num="+current_number+"]").children().css({'transform' : 'rotateY(360deg)'});}
//             $(".slider_box .yes_display").addClass("no_display").removeClass("yes_display");
//             $(".slider_content[data-num="+current_number+"]").addClass("yes_display").removeClass("no_display").rotate(new_deg(),function () {
//                 $(".button_box .button_disable").addClass("no_display");
//             });
//         });
//     })
// }

function Rotator(obj_1){
  function makeDeg() {
    var currentDeg = 0;
  
    return function() {
      return (currentDeg += 90);
    };
  }
  var new_deg=[];
  for(let i=0;i<obj_1["box"].length;i++){
    new_deg[i]= makeDeg();
  }
  var current_number=[];
  for(let i=0;i<obj_1["box"].length;i++){
    current_number[i]=1;
  }
  var rotateEven=[];
  for(let i=0;i<obj_1["box"].length;i++){
    rotateEven[i]=1;
  }
  var quant = $(".slider_box .slider_content").length / 2;
  
  $(obj_1["button"]).on("click", function(e) {
    e.preventDefault();
    $(".button_box .button_disable").removeClass("no_display");
//деактивировали кнопку и началось выполнение переворота

    for (let i=0; i<obj_1["box"].length;i++){
      $(obj_1["box"][i]).rotate(new_deg[i](), function() {
        if (current_number[i] == quant) {
          current_number[i] = 0;
        }
        current_number[i]++;
        rotateEven[i]++;
        if (rotateEven[i] % 2 == 0) {
          $(obj_1["box"][i]+" .slider_content[data-num=" + current_number[i] + "]").css({
            transform: "rotateY(180deg)"
          });
        } else {
          $(obj_1["box"][i]+" .slider_content[data-num=" + current_number[i] + "]").css({
            transform: "rotateY(360deg)"
          });
        }
        $(obj_1["box"][i]+" .yes_display")
          .addClass("no_display")
          .removeClass("yes_display");
        $(obj_1["box"][i]+" .slider_content[data-num=" + current_number[i] + "]")
          .addClass("yes_display")
          .removeClass("no_display");
        $(obj_1["box"][i]).rotate(new_deg[i](), function() {
          $(".button_box .button_disable").addClass("no_display");
        });
      });
    }
  });
}


/* Функция вращения */
jQuery.fn.rotate = function(degrees, f) {
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
user_object={
  "button":"#next_slide_btn",
  "box":[".slider_box_1", ".slider_box_2"]
}
window.onload=function(){
  var new_rotator=new Rotator(user_object);
}
/* window.onload = function() {
  function makeDeg() {
    var currentDeg = 0;

    return function() {
      return (currentDeg += 90);
    };
  }
  var new_deg = makeDeg();
  var quant = $(".slider_box .slider_content").length / 2;
  var current_number = 1;
  var rotateEven = 1;
  $("#next_slide_btn").on("click", function(e) {
    e.preventDefault();
    $(".button_box .button_disable").removeClass("no_display");
    $(".slider_box").rotate(new_deg(), function() {
      if (current_number == quant) {
        current_number = 0;
      }
      current_number++;
      rotateEven++;
      if (rotateEven % 2 == 0) {
        $(".slider_content[data-num=" + current_number + "]").css({
          transform: "rotateY(180deg)"
        });
      } else {
        $(".slider_content[data-num=" + current_number + "]").css({
          transform: "rotateY(360deg)"
        });
      }
      $(".slider_box .yes_display")
        .addClass("no_display")
        .removeClass("yes_display");
      $(".slider_content[data-num=" + current_number + "]")
        .addClass("yes_display")
        .removeClass("no_display");
      $(".slider_box").rotate(new_deg(), function() {
        $(".button_box .button_disable").addClass("no_display");
      });
    });
  });
  //console.log(obj_1["box"][1]);
}; */
