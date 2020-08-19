//Js file for the categories of items (below)


$(document).ready(function () {
    // Getting references to the name input and category container and table body
    var nameInput = $("#category-name");
    var categoryList = $("tbody");
    var categoryContainer = $(".category-container");


    // Adding event listeners to the form to create a new object, and the button to delete
    $(document).on("submit", "#category-form", handleCategoryFormSubmit);
    $(document).on("click", ".delete-category", handleDeleteButtonPress); // delete will be handled in CreateCategory row function

    // Getting the initial list of categories
    getCategories();

    //function when the form is submitted to create a new category
    function handleCategoryFormSubmit(event) {
        event.preventDefault();
        // what to do if the field hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // call the function and pass the value of the name input
        upsertCategory({
            name: nameInput
                .val()
                .trim()
        });
    }
    //function for creating a category. Calls getcategory once complete
    function upsertCategory(categoryData) {
        $.post("/api/all_categories", categoryData)
            .then(getCategories);
    }


    //function for creating a new list row for categories 
    function createCategoryRow(categoryData) {
        var newTr = $("<tr>");
        newTr.data("category", categoryData);
        newTr.append("<td>" + categoryData.name + "</td>");
        if (categoryData.Products) {
            newTr.append("<td> " + categoryData.Products.length + "</td>");
        } else {
            newTr.append("<td>0</td>");
        }
        newTr.append("<td><a href='/all_products?category_id=" + categoryData.id + "'>See All Products</a></td>");
        newTr.append("<td><a href='/listing_form?category_id=" + categoryData.id + "'>Post an Item in this Category</a></td>");
        // newTr.append("<td><a style='cursor:pointer;color:red' class='delete-category'>Delete Category</a></td>");
        return newTr;
    }

    //function for retrieving categories & then almost getting them to the page
    function getCategories() {
        $.get("/api/all_categories", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createCategoryRow(data[i]));
            }
            renderCategoryList(rowsToAdd);
            nameInput.val("");
        });
    }

    //function for rendering the list of categories on the page
    function renderCategoryList(rows) {
        categoryList.children().not(":last").remove();
        categoryContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            categoryList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    // alert function for what to render when there are no categories for a product
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a Category before you can create a product listing.");
        categoryContainer.append(alertDiv);
    }

    //function for what happens for the delete button
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("category");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/all_categories/" + id
        })
            .then(getCategories);
    }

});

  //end