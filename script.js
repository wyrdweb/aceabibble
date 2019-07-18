document.addEventListener('DOMContentLoaded', function() {
    function closest (element, selector) {
      if (Element.prototype.closest) {
        return element.closest(selector);
      }
      do {
        if (Element.prototype.matches && element.matches(selector)
          || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
          || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
          return element;
        }
        element = element.parentElement || element.parentNode;
      } while (element !== null && element.nodeType === 1);
      return null;
    }

    // social share popups
    Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(this.href, '', 'height = 500, width = 500');
      });
    });

    // In some cases we should preserve focus after page reload
    function saveFocus() {
      var activeElementId = document.activeElement.getAttribute("id");
      sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
    }
    var returnFocusTo = sessionStorage.getItem('returnFocusTo');
    if (returnFocusTo) {
      sessionStorage.removeItem('returnFocusTo');
      var returnFocusToEl = document.querySelector(returnFocusTo);
      returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
    }

    // show form controls when the textarea receives focus or backbutton is used and value exists
    var commentContainerTextarea = document.querySelector('.comment-container textarea'),
      commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

    if (commentContainerTextarea) {
      commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
        commentContainerFormControls.style.display = 'block';
        commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
      });

      if (commentContainerTextarea.value !== '') {
        commentContainerFormControls.style.display = 'block';
      }
    }

    // Expand Request comment form when Add to conversation is clicked
    var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
      requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
      requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

    if (showRequestCommentContainerTrigger) {
      showRequestCommentContainerTrigger.addEventListener('click', function() {
        showRequestCommentContainerTrigger.style.display = 'none';
        Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
        requestCommentSubmit.style.display = 'inline-block';

        if (commentContainerTextarea) {
          commentContainerTextarea.focus();
        }
      });
    }

    // Submit requests filter form on status or organization change in the request list page
    Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
      el.addEventListener('change', function(e) {
        e.stopPropagation();
        saveFocus();
        closest(this, 'form').submit();
      });
    });

    // Submit requests filter form on search in the request list page
    var quickSearch = document.querySelector('#quick-search');
    quickSearch && quickSearch.addEventListener('keyup', function(e) {
      if (e.keyCode === 13) { // Enter key
        e.stopPropagation();
        saveFocus();
        closest(this, 'form').submit();
      }
    });

    function toggleNavigation(toggleElement) {
      var menu = document.getElementById('user-nav');
      var isExpanded = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', !isExpanded);
      toggleElement.setAttribute('aria-expanded', !isExpanded);
    }

    if (typeof burgerMenu !== 'undefined') {
      var burgerMenu = document.querySelector('.header .icon-menu');
      var userMenu = document.querySelector('#user-nav');

      burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleNavigation(this);
      });

      burgerMenu.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) { // Enter key
          e.stopPropagation();
          toggleNavigation(this);
        }
      });

      }

      if (typeof userMenu !== 'undefined') {
      userMenu.addEventListener('keyup', function(e) {
        if (e.keyCode === 27) { // Escape key
          e.stopPropagation();
          this.setAttribute('aria-expanded', false);
          burgerMenu.setAttribute('aria-expanded', false);
        }
      });

      if (userMenu.children.length === 0) {
        burgerMenu.style.display = 'none';
      }
  }

    // Submit organization form in the request page
    var requestOrganisationSelect = document.querySelector('#request-organization select');

    if (requestOrganisationSelect) {
      requestOrganisationSelect.addEventListener('change', function() {
        closest(this, 'form').submit();
      });
    }

    // Toggles expanded aria to collapsible elements
    Array.prototype.forEach.call(document.querySelectorAll('.collapsible-nav, .collapsible-sidebar'), function(el) {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        var isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
      });
    });

    // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
    const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
    const subsectionsList = document.querySelector(".section-list");

    if (subsectionsList && subsectionsList.children.length > 6) {
      seeAllTrigger.setAttribute("aria-hidden", false);

      seeAllTrigger.addEventListener("click", function(e) {
        subsectionsList.classList.remove("section-list--collapsed");
        seeAllTrigger.parentNode.removeChild(seeAllTrigger);
      });
    }
  });

  // --------------------- Material Design stuff --------------------------
  var buttons = document.querySelectorAll('.mdc-button, .mdc-fab');
  for (var i = 0, button; button = buttons[i]; i++) {
      mdc.ripple.MDCRipple.attachTo(button);
  }

  var nodes = document.querySelectorAll('.mdc-icon-toggle');
  for (var i = 0, node; node = nodes[i]; i++) {
      mdc.iconToggle.MDCIconToggle.attachTo(node);
  }

  var checkboxes = document.querySelectorAll('.mdc-checkbox');
  for (var i = 0, checkbox; checkbox = checkboxes[i]; i++) {
      new mdc.checkbox.MDCCheckbox(checkbox);
  }

  var radios = document.querySelectorAll('.mdc-radio');
  for (var i = 0, radio; radio = radios[i]; i++) {
      new mdc.radio.MDCRadio(radio);
  }

  var interactiveListItems = document.querySelectorAll('.mdc-list-item');
  for (var i = 0, li; li = interactiveListItems[i]; i++) {
      mdc.ripple.MDCRipple.attachTo(li);

      // Prevent link clicks from jumping demo to the top of the page
      li.addEventListener('click', function(evt) {
          evt.preventDefault();
      });
  }
  // --------------------- Material Design stuff done --------------------------

  // Section Tree With Article Click Update

  if (typeof $(".section-tree-with-article") != "undefined") {
      var aTags = $(".section-tree-with-article .article-list a");
      aTags.click(function(e) {
          e.preventDefault();
          window.location.href = $(this).get(0).href;
      });
  }

  if (typeof $(".clearfix > .side-column").get(0) == "undefined") {
      $(".clearfix > .main-column").css("width", "100%");
  }

  // Remove view all link from category page
  if (
      typeof $(".section-tree-with-article .article-body").get(0) != "undefined"
  ) {
      $(".section-tree-with-article .article-body").remove();
  }

  var x = new Date();
  var y = x.getFullYear();
  $("#year").html(y);

  // social share popups
    $(".share a").click(function(e) {
      e.preventDefault();
      window.open(this.href, "", "height = 500, width = 500");
  });

    // Submit requests filter form in the request list page
    $("#request-status-select, #request-organization-select")
        .on("change", function() {
            search();
        });

    // Submit requests filter form in the request list page
    $("#quick-search").on("keypress", function(e) {
        if (e.which === 13) {
            search();
        }
    });

    function search() {
        window.location.search = $.param({
            query: $("#quick-search").val(),
            status: $("#request-status-select").val(),
            organization_id: $("#request-organization-select").val()
        });
    }

    $(".header .icon-menu").on("click", function(e) {
        e.stopPropagation();
        var menu = document.getElementById("user-nav");
        var isExpanded = menu.getAttribute("aria-expanded") === "true";
        menu.setAttribute("aria-expanded", !isExpanded);
    });

    if ($("#user-nav").children().length === 0) {
        $(".header .icon-menu").hide();
    }


  /*-----------------------------Submit organization form in the request page-----------------------------*/

  $("#request-organization select").on("change", function() {
        this.form.submit();
    });

    // Toggles expanded aria to collapsible elements
    $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
        e.stopPropagation();
        var isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
    });

    //add class to breadcrumb items in sub-nav
    $(".breadcrumbs li a").addClass("breadcrumb-item");

  // Function to list categories in all templates
  // get id and template name
  var _location = window.location.href.split("/");
  var _templatename = _location[5];
  if (
      _location.length > 5 &&
      (_templatename == "categories" ||
          _templatename == "sections" ||
          _templatename == "articles")
  ) {
      var _templateid = _location[6].split("-")[0];
  }

  var categoriesList = function(_categories) {
      $.ajax({
          url: "/api/v2/help_center/" +
              $("html")
              .attr("lang")
              .toLowerCase() +
              "/categories.json",
          type: "GET",
          dataType: "json",
          success: _categories
      });
  };

  var _list = "";

  $(document).ajaxStart(function() {
      $("#loader").show();
  });
  $(document).ajaxStop(function() {
      $("#loader").hide();
  });

  categoriesList(function(data) {
      $(data.categories).each(function(idx, itm) {
          _list =
              _list +
              '<li><a href="' +
              itm.html_url +
              '" id="' +
              itm.id +
              '">' +
              itm.name +
              "</a></li>";
      });

      $(".left-side-category-list").html(_list);
      $(".left-side-category-list a#" + _templateid).addClass("active");

      if (_templatename == "sections" || _templatename == "articles") {
          var categoryid = $(".breadcrumbs > li:nth-child(2) > a")
              .attr("href")
              .split("/categories/")[1]
              .split("-")[0];
          $(".left-side-category-list a#" + categoryid).addClass("active");
      }
  });


  /*-------Custom selector-------*/
  $(function () {

   var usStates = [
  {name: "Alabama", value: "alabama"},
  {name: "Alaska", value: "alaska"},
  {name: "Arizona", value: "arizona"},
  {name: "Arkansas", value: "arkansas"},
  {name: "California", value: "california"},
  {name: "Colorado", value: "colorado"},
  {name: "Connecticut", value: "connecticut"},
  {name: "Delaware", value: "delaware"},
  {name: "Florida", value: "florida"},
  {name: "Georgia", value: "georgia"},
  {name: "Hawaii", value: "hawaii"},
  {name: "Idaho", value: "idaho"},
  {name: "Illinois", value: "illinois"},
  {name: "Indiana", value: "indiana"},
  {name: "Iowa", value: "iowa"},
  {name: "Kansas", value: "kansas"},
  {name: "Kentucky", value: "kentucky"},
  {name: "Louisiana", value: "louisiana"},
  {name: "Maine", value: "maine"},
  {name: "Maryland", value: "maryland"},
  {name: "Massachusetts", value: "massachusetts"},
  {name: "Michigan", value: "michigan"},
  {name: "Minnesota", value: "minnesota"},
  {name: "Mississippi", value: "mississippi"},
  {name: "Missouri", value: "missouri"},
  {name: "Montana", value: "montana"},
  {name: "Nebraska", value: "nebraska"},
  {name: "Nevada", value: "nevada"},
  {name: "New Hampshire", value: "new hampshire"},
  {name: "New Jersey", value: "new jersey"},
  {name: "New Mexico", value: "new mexico"},
  {name: "New York", value: "new york"},
  {name: "North Carolina", value: "north carolina"},
  {name: "North Dakota", value: "north dakota"},
  {name: "Ohio", value: "ohio"},
  {name: "Oklahoma", value: "oklahoma"},
  {name: "Oregon", value: "oregon"},
  {name: "Pennsylvania", value: "pennsylvania"},
  {name: "Rhode Island", value: "rhode island"},
  {name: "South Carolina", value: "south carolina"},
  {name: "South Dakota", value: "south dakota"},
  {name: "Tennessee", value: "tennessee"},
  {name: "Texas", value: "texas"},
  {name: "Utah", value: "utah"},
  {name: "Vermont", value: "vermont"},
  {name: "Virginia", value: "virginia"},
  {name: "Washington", value: "washington"},
  {name: "West Virginia", value: "west virginia"},
  {name: "Wisconsin", value: "wisconsin"},
  {name: "Wyoming", value: "wyoming"}
  ];

  $('.search-full').append(' <select name="state" class="state" id="stateId" required><option value="novalue">United States</option></select><div class="error">Select your state</div> ')
  $('.state').insertBefore('.query');

  var stateSelect = document.getElementById('stateId');
  if(stateSelect!=null){
      for(var i = 0; i < usStates.length; i++) {
          var option = document.createElement("option");
          option.text = usStates[i].name;
          option.value = usStates[i].value;
          stateSelect.add(option);
      }
  }

  $('#query').prop("readonly", true);
  $('#stateId').change(function() {
        if( $(this).val() == "novalue") {
                 $('#query').prop( "readonly", true );
      }else{
      $('#query').prop("readonly", false)
              $('.error').hide();
      }
  });

   $('#query').click(function (event) {
        if ($(this).attr('readonly')) {
            $('.error').show();
        }
    });

  $(document).ready(function(){
      var murl = window.location.protocol + "//" + window.location.host + "/hc/en-us/search?utf8=âœ“";
      // console.log(murl);
      jQuery('form.search.search-full').keydown(function(e){
      var states = jQuery('select#stateId').val();
      var text = jQuery('form.search.search-full input#query').val();
      if(e.which == 13){
         e.preventDefault();
        murl=murl+"&query="+text+"+"+states;
        // console.log(murl);
         window.location.replace( murl)
          // windows.location.href =
         return false;
      }else {
     console.log(murl);
        return true;
      }

    });
  });

    /*---End---*/
  });