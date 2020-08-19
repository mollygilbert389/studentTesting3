$(document).ready(function () {
    // Getting jQuery references to the product body, title, form, and category select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var listingForm = $("#listing");
    var categorySelect = $("#categories");
    // Adding an event listener for form submission
    $(listingForm).on("submit", handleFormSubmit);
    var url = window.location.search;
    var productId;
    var categoryId;
    // Sets a flag for whether or not we're updating a product to be false initially
    var updating = false;



    // Pulls product Id from url
    if (url.indexOf("?product_id=") !== -1) {
        productId = url.split("=")[1];
        getProductData(productId, "product");
    }
    // Allows categories us to preset category select box
    else if (url.indexOf("?category_id=") !== -1) {
        categoryId = url.split("=")[1];
    }

    // Get categories, and their products
    getCategories();

    // function for once a new product is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !categorySelect.val()) {
            return;
        }
        // Creating a newProduct object to put in DB
        var newProduct = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            CategoryId: categorySelect.val()
        };

        // Run updateProduct to literally update product and submitPost to create new post
        if (updating) {
            newProduct.id = productId;
            updateProduct(newProduct);
        }
        else {
            submitProduct(newProduct);
        }
    }

    // Submits a new post and brings user to all_products page
    function submitProduct(product) {
        $.post("/api/all_products", product, function () {
            window.location.href = "/all_products";
        });
    }

    // Gets date for products we edit or are adding to
    function getProductData(id, type) {
        var queryUrl;
        switch (type) {
            case "product":
                queryUrl = "/api/all_products/" + id;
                break;
            case "category":
                queryUrl = "/api/all_categories/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function (data) {
            if (data) {
                console.log(data.CategoryId || data.id);
                // If this post exists, prefill our cms forms with its data
                titleInput.val(data.title);
                bodyInput.val(data.body);
                categoryId = data.CategoryId || data.id;
                // If we have a post with this id, it lets us to know to update the post
                // when we submit
                updating = true;
            }
        });
    }
    // function for getting categories and listing them
    function getCategories() {
        $.get("/api/all_categories", renderCategoryList);
    }
    // shows list of categories or allows creation of categories
    function renderCategoryList(data) {
        if (!data.length) {
            window.location.href = "/all_categories";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createCategoryRow(data[i]));
        }
        categorySelect.empty();
        console.log(rowsToAdd);
        console.log(categorySelect);
        categorySelect.append(rowsToAdd);
        categorySelect.val(categoryId);
    }

    // Creates the category in dropdown
    function createCategoryRow(category) {
        var listOption = $("<option>");
        listOption.attr("value", category.id);
        listOption.text(category.name);
        return listOption;
    }

    // Updates a product and shows user all_products
    function updateProduct(product) {
        $.ajax({
            method: "PUT",
            url: "/api/all_products",
            data: product
        })
            .then(function () {
                window.location.href = "/all_products";
            });
    }
});