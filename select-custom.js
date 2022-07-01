$(function(){
  selectbox();
  selectInit();


  $(document).on('click', function(event){
    selectObserverOpened(event);
  });

  // selectbox
  function selectbox() {
    var downBtn = $(".btn_selectbox");

    $('body').on("click", ".btn_selectbox", function (event) {
      var target = event.target;

      if (".btn_selectbox") {
        if ($(target).hasClass("disabled")) {
          return;
        }

        $(target).closest('.selectbox').siblings('.selectbox').removeClass('selectOpen');
        $(target).closest('.selectbox').siblings('.selectbox').find('.btn_selectbox').removeClass('btn_selectbox-selected').attr("aria-expanded", "false");
        $(target).closest('.selectbox').siblings('.selectbox').find('.combobox').hide();

        $(target).addClass("first_placeholder");
        $(target).parents(".selectbox").toggleClass("selectOpen");
        $(target).toggleClass("btn_selectbox-selected").attr("aria-expanded", "true");
        $(target).siblings(".combobox").toggle();

        // if ($(target).hasClass("btn_selectbox-selected")) {
        //   $(target).attr("aria-expanded", "false");
        //   $(target).siblings(".combobox").hide();
        //   $(target).parents(".selectbox").removeClass("selectOpen");
        // } else {
        //   dropOut();
          
        // }
      }
    });

    $(".combobox").each(function () {
      $(this)
        .find("li")
        .last()
        .find("button")
        .blur(function () {
          dropOut();
        });
    });

    var dropOut = function () {
      downBtn.removeClass("btn_selectbox-selected").attr("aria-expanded", "false");
      downBtn.parents(".selectbox").removeClass("selectOpen");
      downBtn.siblings(".combobox").hide();
    };

    $('body').on("click", ".combobox_option", function (event) {
      var target = event.target;
      if (target.tagName === "BUTTON") {
        $(target).parents(".combobox").attr("aria-activedescendant", $(target).attr("id"));
        $(target).attr("aria-selected", true).parent().addClass("active").siblings().removeClass("active").find("button").attr("aria-selected", false);
        $(target).parents(".btn_selectbox").text(target.innerText);
        $(target).parents(".selectbox").find(".btn_selectbox").toggleClass("btn_selectbox-selected").text(target.innerText).attr("aria-selected", "false").attr("aria-expanded", "false").next().hide();
        $(target).parents(".selectbox").removeClass("selectOpen");
      } else {
        return;
      }
    });
  }

  // select 초기값 설정
  function selectInit() {
    $(".combobox_listbox li").each(function (event) {
      let thisIndex = $(this).index();
      if ($(this).find('button').data("value") !== "" && $(this).find('button').attr("aria-selected") == "true") {
        $(this).closest(".selectbox").find(".btn_selectbox").text($(this).find('button').text()).addClass('first_placeholder');
      }else if($(this).find('button').data("value") !== "" && thisIndex == 0){
        $(this).find('button').attr("aria-selected", "true")
        $(this).closest(".selectbox").find(".btn_selectbox").text($(this).find('button').text()).removeClass('first_placeholder');
      }
    });
  }

  function selectObserverOpened(event) {
    const isOpened = $(event.currentTarget).find('.selectbox.selectOpen').length > 0;

    if (isOpened) {
      if ($(event.target).parents('.selectbox').length > 0) {
        //console.log('소팅 내부입니다');
      } else {
        //console.log('소팅 외부입니다');
        $('.btn_selectbox').closest('.selectbox').siblings('.selectbox').removeClass('selectOpen');
        $('.btn_selectbox').closest('.selectbox').siblings('.selectbox').find('.btn_selectbox').removeClass('btn_selectbox-selected').attr("aria-expanded", "false");
        $('.btn_selectbox').closest('.selectbox').siblings('.selectbox').find('.combobox').hide();
      }
    } else {
      return;
    }
  }
});