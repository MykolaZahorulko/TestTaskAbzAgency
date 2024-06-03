export function goTo() {
    const menuLinks = document.querySelectorAll('[data-goto]');

    menuLinks.forEach(function (menuLink) {
        menuLink.addEventListener("click", function (e) {
            e.preventDefault();
            const gotoBlockId = this.getAttribute("data-goto");
            const gotoBlock = document.querySelector(gotoBlockId);

            if (gotoBlock) {
                const header = document.querySelector("header");
                const gotoBlockValue = gotoBlock.offsetTop - header.offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
            }
        });
    });
}