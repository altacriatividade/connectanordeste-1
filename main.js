// Pequeno efeito suave de scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});




// Expandable Details Logic
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function (e) {
        // Prevent click bubbling if clicking inside the card's already open details
        // But we remove the panel from DOM so this specific check might be moot, 
        // yet good to stop propagation if clicking close button.

        const detailsData = this.querySelector('.details-data');
        if (!detailsData) return;

        const detailsContent = detailsData.innerHTML;
        const gridContainer = document.querySelector('.grid-4');

        // Check if this card is already active
        if (this.classList.contains('active-card')) {
            closeAllDetails();
            return;
        }

        // Close any open details
        closeAllDetails();

        // Mark this card as active
        this.classList.add('active-card');

        // Create details panel
        const panel = document.createElement('div');
        panel.classList.add('details-panel');
        panel.innerHTML = `<span class="details-close" onclick="closeAllDetails(event)">×</span>` + detailsContent;

        // Find where to insert
        // Logic: Insert after the last card of the current row
        const cardArray = Array.from(gridContainer.children).filter(el => el.classList.contains('event-card'));
        const currentIndex = cardArray.indexOf(this);
        const currentTop = this.offsetTop;

        let insertAfterIndex = cardArray.length - 1; // Default to last

        for (let i = currentIndex + 1; i < cardArray.length; i++) {
            if (cardArray[i].offsetTop > currentTop) {
                insertAfterIndex = i - 1;
                break;
            }
        }

        // Insert the panel
        const referenceNode = cardArray[insertAfterIndex];
        if (referenceNode.nextSibling) {
            referenceNode.parentNode.insertBefore(panel, referenceNode.nextSibling);
        } else {
            referenceNode.parentNode.appendChild(panel);
        }

        // Show panel
        panel.style.display = 'block';

        // Scroll to panel with delay to account for layout shift
        setTimeout(() => {
            const yOffset = -100;
            const y = panel.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
    });
});
function closeAllDetails(e) {
    if (e) e.stopPropagation();

    document.querySelectorAll('.details-panel').forEach(panel => panel.remove());
    document.querySelectorAll('.event-card').forEach(card => card.classList.remove('active-card'));
}



