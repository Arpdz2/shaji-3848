var test = 0;

$( document ).ready(function() {
    document.getElementById("previousslide").style.display = "none";
});

function changeActive(){
    $('#nextslide').click(function(){
        document.getElementById("nextslide").style.display = "none";
        document.getElementById("previousslide").style.display = "none";
        window.setTimeout(function(){
            if (test < 4)
                document.getElementById("nextslide").style.display = "block";
            if (test > 0)
                document.getElementById("previousslide").style.display = "block";
        },1700);
    });
    test++;
    if (test < 1){
        document.getElementById("previousslide").style.display = "none";
        document.getElementById("introprogress").className = "active";
        document.getElementById("contentprogress").className = "";
        document.getElementById("demoprogress").className = "";
    }
    if (test > 0 && test < 4){
        document.getElementById("introprogress").className = "done";
        document.getElementById("contentprogress").className = "active";
        document.getElementById("demoprogress").className = "";
    }
    if (test >= 4) {
        document.getElementById("introprogress").className = "done";
        document.getElementById("contentprogress").className = "done";
        document.getElementById("demoprogress").className = "active";
    }
}

function decrement() {
    $('#previousslide').click(function(){
        document.getElementById("nextslide").style.display = "none";
        document.getElementById("previousslide").style.display = "none";
        window.setTimeout(function(){
            if (test > 0)
                document.getElementById("previousslide").style.display = "block";
            if (test < 4)
                document.getElementById("nextslide").style.display = "block";
        },1700);
    });
    test--;
    if (test < 1){
        document.getElementById("previousslide").style.display = "none";
        document.getElementById("introprogress").className = "active";
        document.getElementById("contentprogress").className = "";
        document.getElementById("demoprogress").className = "";
    }
    if (test > 0 && test < 4){
        document.getElementById("introprogress").className = "done";
        document.getElementById("contentprogress").className = "active";
        document.getElementById("demoprogress").className = "";
    }
    if (test >= 4) {
        document.getElementById("introprogress").className = "done";
        document.getElementById("contentprogress").className = "done";
        document.getElementById("demoprogress").className = "active";
    }
}

function changeProgress() {
    $(function(){
        document.getElementById("nextslide").style.display = "none";
        document.getElementById("previousslide").style.display = "none";
        window.setTimeout(function(){
            if (test > 0)
                document.getElementById("previousslide").style.display = "block";
            if (test < 4)
                document.getElementById("nextslide").style.display = "block";
        },1700);
    });
    if (test < 1){
        document.getElementById("previousslide").style.display = "none";
        document.getElementById("introprogress").className = "active";
        document.getElementById("contentprogress").className = "";
        document.getElementById("demoprogress").className = "";
    }
    if (test > 0 && test < 4){
        document.getElementById("introprogress").className = "done";
        document.getElementById("contentprogress").className = "active";
        document.getElementById("demoprogress").className = "";
    }
    if (test >= 4) {
        document.getElementById("introprogress").className = "done";
        document.getElementById("contentprogress").className = "done";
        document.getElementById("demoprogress").className = "active";
    }
}




