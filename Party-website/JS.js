





// $(".container-fluid").animate({width: "100%"}, 1000);
// $(".container-fluid").animate({height: "100vh"}, 1000, function(){
//     $(".container-fluid h3").fadeIn(1000, function(){
//         $(".container-fluid > p").show(1000, function(){
//             $(".col-md-3").slideDown(1000);
//         });
//     });
// });


function sideNave(){
    if ($(".side-nav").width() == "250"){
        $(".side-nav").width("0px");
        $("#main").css("margin-left", "0px");
    }
    else{
        $(".side-nav").width("250px");
        $("#main").css("margin-left", "250px");
    }
}



$("a").click(function () {
    let sectionId = $(this).attr("data-location");
    console.log(sectionId);
    let positionOfSection = $(sectionId).offset().top;
    $("html , body").animate({scrollTop: positionOfSection}, 700);
})





$("#singers div:first").css("display", "block");
$("#singers h3").click(function () {
    $(this).next().slideToggle(500);
    $("#singers div").not($(this).next()).slideUp(500);
});









function countdown() {
    let now = new Date();
    let event = new Date("2022-12-22");

    now = now.getTime();
    event = event.getTime();

    let remTime = event - now;
    if(remTime <= 0) return;

    let s = Math.floor(remTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    h = (h<10)? "0"+h : h;
    m = (m<10)? "0"+m : m;
    s = (s<10)? "0"+s : s;

    $($(".timer")[0]).html("<h3>" + d + " D" + "</h3>");
    $($(".timer")[1]).html("<h3>" + h + " h" + "</h3>");
    $($(".timer")[2]).html("<h3>" + m + " m" + "</h3>");
    $($(".timer")[3]).html("<h3>" + s + " s" + "</h3>");

    if(remTime > 0)
        setTimeout(countdown, 1000);
}

countdown();




$("textarea").keyup(function () {
    let max = 100;
    let length = $(this).val().length;
    let character = max - length;
    console.log(character);
    if (character <= 0) {
        $("#char").text("your available character finished");
        let text = $(this).val();
        $(this).val(text.substr(0, max));
    } else {
        $("#char").text(character);
    }
});