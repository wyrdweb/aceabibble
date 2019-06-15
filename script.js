/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {
    // --------------------- Tooltips starts --------------------------
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
    // --------------------- Tooltips ends --------------------------
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
})(window, document, jQuery);

/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {
    // social share popups
    $(".share a").click(function(e) {
        e.preventDefault();
        window.open(this.href, "", "height = 500, width = 500");
    });

    // toggle the share dropdown in communities
    $(".share-label").on("click", function(e) {
        e.stopPropagation();
        var isSelected = this.getAttribute("aria-selected") == "true";
        this.setAttribute("aria-selected", !isSelected);
        $(".share-label")
            .not(this)
            .attr("aria-selected", "false");
    });

    $(document).on("click", function() {
        $(".share-label").attr("aria-selected", "false");
    });


    // show form controls when the textarea receives focus or backbutton is used and value exists
    var $commentContainerTextarea = $(".comment-container textarea"),
        $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

    $commentContainerTextarea.one("focus", function() {
        $commentContainerFormControls.show();
    });

    if ($commentContainerTextarea.val() !== "") {
        $commentContainerFormControls.show();
    }

    // Expand Request comment form when Add to conversation is clicked
    var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
        $requestCommentFields = $(".request-container .comment-container .comment-fields"),
        $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

    $showRequestCommentContainerTrigger.on("click", function() {
        $showRequestCommentContainerTrigger.hide();
        $requestCommentFields.show();
        $requestCommentSubmit.show();
        $commentContainerTextarea.focus();
    });

    // Mark as solved button
    var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
        $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
        $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

    $requestMarkAsSolvedButton.on("click", function() {
        $requestMarkAsSolvedCheckbox.attr("checked", true);
        $requestCommentSubmitButton.prop("disabled", true);
        $(this).attr("data-disabled", true).closest("form").submit();
    });

    // Change Mark as solved text according to whether comment is filled
    var $requestCommentTextarea = $(".request-container .comment-container textarea");

    $requestCommentTextarea.on("keyup", function() {
        if ($requestCommentTextarea.val() !== "") {
            $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
            $requestCommentSubmitButton.prop("disabled", false);
        } else {
            $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
            $requestCommentSubmitButton.prop("disabled", true);
        }
    });

    // Disable submit button if textarea is empty
    if ($requestCommentTextarea.val() === "") {
        $requestCommentSubmitButton.prop("disabled", true);
    }

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

    // Submit organization form in the request page
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

});
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

// function to list categories in all templates ends here

// function to wrap table in table-responsive class
$(".article-body")
    .find("table")
    .wrap('<div class="table-responsive"></div>');
});