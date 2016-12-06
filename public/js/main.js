/**** MAIN.JS ***/

function togglePanels(uid){
   
    $(".mpanel").each(function(){
        
        $(this).removeClass("pan-visible").addClass('pan-invisible');
    });
   
    $("#" + uid).addClass("pan-visible").removeClass('pan-invisible');
    //e.stopPropagation();
}
