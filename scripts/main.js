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
window.onload = function() {
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
};
/* hello in=ts end */
/* branch master */
