function createVideosHtml() {
    const container = document.querySelector(".container");
  container.innerHTML = `
    <section>
    <div class="box">
        <form class="search-form">
            <input type="text" name="search" placeholder="Type..." class="search-input">
            <input type="submit" class="submit-btn" value="Search">
        </form>
    </div>
</section>
<main>
  <div class="gallery"></div>
  <div class="summary opacity"></div>
</main>`;
}