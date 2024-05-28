document.addEventListener("DOMContentLoaded", (event) => {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");

  searchButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior

    const keyword = searchInput.value.trim();

    if (keyword) {
      // Store the search keyword in sessionStorage
      sessionStorage.setItem("searchKeyword", JSON.stringify(keyword));
      window.location.href =
        "http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/sale_page/index.html";
    }
  });
});
