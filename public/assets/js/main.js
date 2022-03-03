$( document ).ready(function() {

const list = $(".a-main-menu");
const btn_search = $("#btn-search-0");
const btn_search_1 = $("#btn-search-1");
const search = $("#text-search-0");
const search_1 = $("#text-search-1");
const three_dots = $(".three-dots");
const btn_search_page = $(".btn-search-page");
const search_page = $(".page-search");
const phone_menu = $(".menu-mini");
const btn_burger = $(".button-menu-mini");
const pass = $(".password");
const conf_pass = $(".confirmation-password");
const btn_modal = $(".insert-balance");
const modal = $("#modal-0");
const body = $("body");
const close_modal = $("#close-popup");
const create_acc = $("#create-account");
const modal_1 = $("#modal-1");
const close_modal_1 = $("#close-popup-1");
const log_to_acc = $("#log-to-account");
const radio = $("input:radio[name=select]");
const dot = $(".dot");
const option = $(".option");
const dot_before = $(".dot::before");
const flag_on = $(".choose-flag");
const flag_off = $(".choose-language");
const alerts = $(".for-alerts");
const new_alerts = $(".submenu-alerts");

// открытие листов (мини меню профиля, лист)
list.click(function() {
    $(this).toggleClass("open");
});

// открытие поиска до 767px
btn_search.click(function() {
    $(this).toggleClass("open");
    search.toggleClass("open");
});

// открытие поиска после 767px
btn_search_1.click(function() {
    $(this).toggleClass("open");
    search_1.toggleClass("open");
});

// открытие поиска страницы
three_dots.click(function() {
    $(this).toggleClass("rot-90");
    search_page.toggleClass("open");
    btn_search_page.toggleClass("open");
    if (this.className != "three-dots rot-90") {
        $(this).html("...");
    }else{
        $(this).html("lll");
    }  
});

// открытие меню на телефоне
btn_burger.click(function() {
    $(this).toggleClass("rot-90");
    phone_menu.toggleClass("open");
});

// добавление поля для подтверждения пароля
pass.keyup(function() {
    if (pass.val().length > 0) {
        conf_pass.addClass("open"); 
        setTimeout(function(){
            conf_pass.addClass("open-op"); 
        }, 1);
    } else {
        conf_pass.removeClass("open-op"); 
        setTimeout(function(){
            conf_pass.removeClass("open");   
        }, 300);
    }
});

// открытие модальных окон (пополнение баланса, поддержка)
btn_modal.click(function() {
    body.toggleClass("body-open-modal");
    modal.toggleClass("open");
    setTimeout(function(){
        modal.toggleClass("open-op");   
    }, 300);
});

// открытие модаки для регестрации из модалки для входа
create_acc.click(function() {
    modal.removeClass("open-op"); 
    modal.removeClass("open");
    body.removeClass("body-open-modal");
    body.toggleClass("body-open-modal");
    modal_1.toggleClass("open");
    setTimeout(function(){
        modal_1.toggleClass("open-op");   
    }, 300);
});

// открытие модаки для входа из модалки для регестрации
log_to_acc.click(function() {
    modal_1.removeClass("open-op"); 
    modal_1.removeClass("open");
    body.removeClass("body-open-modal");
    body.toggleClass("body-open-modal");
    modal.toggleClass("open");
    setTimeout(function(){
        modal.toggleClass("open-op");   
    }, 300);
});

// закрытие модальных окон (пополнение баланса, поддержка)
close_modal.click(function() {
    modal.removeClass("open-op"); 
    body.removeClass("body-open-modal");
    modal.removeClass("open");
});

// закрытие модалки для регестрации
close_modal_1.click(function() {
    modal_1.removeClass("open-op"); 
    body.removeClass("body-open-modal");
    modal_1.removeClass("open");
});

// выбор платежной системы и ОС на конфигураторе
radio.click(function() {
    for(var i=0; i<radio.length; ++i){
    if($(radio[i]).is(':checked') == false) {
        dot.removeClass("cheked")  
        option.removeClass("cheked"); 
    }
}
    if(radio.is(':checked') == true) {
    $(this).siblings(dot).addClass("cheked"); 
    $(this).parent(option).addClass("cheked"); 
    $(this).siblings(dot_before).addClass("cheked"); 
} 
});

// окно выбора языка 
flag_on.click(function() {
    flag_off.toggleClass("open");
});

// замена языка
flag_off.click(function() {
    ru = "\n                    <img src=\"assets/img/ru.svg\" class=\"img-flag\">\n                ";
    en = "\n                    <img src=\"assets/img/en.svg\" class=\"img-flag\">\n                ";
    if (this.innerHTML == en) {
        flag_on.html(en);
        flag_off.html(ru);
    }else{
        flag_on.html(ru);
        flag_off.html(en);
    }
    flag_off.removeClass("open");
});

// окно уведовмления
alerts.click(function() {
    new_alerts.toggleClass("open");
});

// закрытие окон при клике вне окна
window.addEventListener('click', e => {
    const target = e.target 
    if (!target.closest('a.a-main-menu') && !target.closest('a.a-main-menu.open')
    && !target.closest('ul.submenu')) {
        list.removeClass("open");
    }
    if (!target.closest('#text-search-0') && !target.closest('#btn-search-0')) {
        btn_search.removeClass("open");
        search.removeClass("open");
    }
    if (!target.closest('#text-search-1') && !target.closest('#btn-search-1')) {
        btn_search_1.removeClass("open");
        search_1.removeClass("open");
    }
    if (!target.closest('.page-search') && !target.closest('.three-dots')
    && !target.closest('.btn-search-page')) {
        three_dots.removeClass("rot-90");
        btn_search_page.removeClass("open");
        search_page.removeClass("open");
        three_dots.html("...");
    }
    if (!target.closest('.e-menu-mini') && !target.closest('.button-menu-mini') 
    && !target.closest('.menu-mini')) {
        btn_burger.removeClass("rot-90");
        phone_menu.removeClass("open");
    }
    if (!target.closest('.for-raise-balance') && !target.closest('.insert-balance')
    && !target.closest('.create-account')) {
        modal.removeClass("open-op"); 
        body.removeClass("body-open-modal");
        modal.removeClass("open");
        modal_1.removeClass("open-op"); 
        modal_1.removeClass("open");
    }
    if (!target.closest('.for-flag') && !target.closest('.img-flag')) {
        flag_off.removeClass("open");
    }
    if (!target.closest('.for-alerts') && !target.closest('.submenu-alerts')) {
        new_alerts.removeClass("open");
    }
})

// динамическое увелечение <textarea>
$("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
    this.style.height = (this.scrollHeight) + "px";
});

});

// Ползунки конфигурации
function config(value, x) {
    range = $(".range")[x];
    output = $(".value")[x];
    output_2 = $(".value-price")[x];
    let arr = [" Мбит/с", " ядер", " Гб", " Гб"]
    output.innerHTML = value + arr[x];
    output_2.innerHTML = value + arr[x];
    range.style.background = 'linear-gradient(90deg, #647180 ' + value + '%, #272D34 ' + value + '%)';
}