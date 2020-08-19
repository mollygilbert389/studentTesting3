//Js file for the products / items (below)


$(document).ready(function () {
    // product container that will hold the listings
    var productsContainer = $(".products-container");
    var productCategorySelect = $("#category");

    // Click events for the edit / delete
    $(document).on("click", "button.delete", handleProductDelete);
    $(document).on("click", "button.edit", handleProductEdit);

    // variable to hold the product listings
    var products;

    // Need something for when there is a item listening for a specific category
    // Looks for a query param in the url for category_id

    var url = window.location.search;
    var categoryId;
    if (url.indexOf("?category_id=") !== -1) {
        categoryId = url.split("=")[1];
        getProducts(categoryId);
    }

    // if there is no id, get all the products
    else {
        getProducts();
    }

    // function to get all products from db and then updates
    function getProducts(category) {
        categoryId = category || "";
        if (categoryId) {
            categoryId = "/?category_id=" + categoryId;
        }
        $.get("/api/all_products" + categoryId, function (data) {
            console.log("Products", data);
            products = data;
            if (!products || !products.length) {
                displayEmpty(category);
            }
            else {
                initializeRows();
            }
        });
    }

    //[may//may not keep b/c we dont have authentication], 
    //but function that does an API call to delete products/items
    function deleteProduct(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/all_products/" + id
        })
            .then(function () {
                getProducts(productCategorySelect.val());
            });
    }


    //function to append all the built post HTML inside products container
    function initializeRows() {
        productsContainer.empty();
        var productsToAdd = [];
        for (var i = 0; i < products.length; i++) {
            productsToAdd.push(createNewRow(products[i]));
        }
        productsContainer.append(productsToAdd);
    }

    // function to build the post html
    function createNewRow(product) {
        var formattedDate = new Date(product.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newProductCard = $("<div>");
        newProductCard.addClass("card");
        var newProductCardHeading = $("<div>");
        newProductCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("Remove");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("UPDATE");
        editBtn.addClass("edit btn btn-info");
        var newProductTitle = $("<h2>");
        var newProductDate = $("<small>");
        var newProductCategory = $("<h5>");
        newProductCategory.text("Category: " + product.Category.name);
        newProductCategory.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newProductCardBody = $("<div>");
        newProductCardBody.addClass("card-body");
        var newProductBody = $("<p>");
        newProductTitle.text(product.title + " ");
        newProductBody.text(product.body);
        newProductDate.text(formattedDate);
        newProductTitle.append(newProductDate);
        newProductCardHeading.append(deleteBtn);
        newProductCardHeading.append(editBtn);
        newProductCardHeading.append(newProductTitle);
        newProductCardHeading.append(newProductCategory);
        newProductCardBody.append(newProductBody);
        newProductCard.append(newProductCardHeading);
        newProductCard.append(newProductCardBody);
        newProductCard.data("product", product);
        return newProductCard;
    }

    // function to find product to be delete, then deletes
    function handleProductDelete() {
        var currentProduct = $(this)
            .parent()
            .parent()
            .data("product");
        deleteProduct(currentProduct.id);
    }

    // function to fin which product to update, then takes to the appropriate url
    function handleProductEdit() {
        var currentProduct = $(this)
            .parent()
            .parent()
            .data("product");
        window.location.href = "/listing_form?product_id=" + currentProduct.id;
    }

    // function to display a message when there are no products to show
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Category #" + id;
        }
        productsContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html( partial + "" + query );
        productsContainer.append(messageH2);
    }


});

// end
