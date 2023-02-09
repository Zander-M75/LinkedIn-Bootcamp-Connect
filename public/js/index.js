document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-user-form");
    const userList = document.getElementById("user-list");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullNameInput = document.getElementById("full-name-input");
        const linkedinLinkInput = document.getElementById("linkedin-link-input");

        const fullName = fullNameInput.value;
        const linkedinLink = linkedinLinkInput.value;

        const userId = Date.now();
        const userCard = createUserCard(userId, fullName, linkedinLink);
        userList.appendChild(userCard);

        fullNameInput.value = "";
        linkedinLinkInput.value = "";
    });

    function createUserCard(userId, fullName, linkedinLink) {
        const userCard = document.createElement("div");
        userCard.classList.add("col-4", "user-card");
        userCard.id = `user-card-${userId}`;

        const userName = document.createElement("h4");
        userName.textContent = fullName;
        userCard.appendChild(userName);

        const userLink = document.createElement("p");
        const userLinkAnchor = document.createElement("a");
        userLinkAnchor.href = linkedinLink;
        userLinkAnchor.textContent = linkedinLink;
        userLink.appendChild(userLinkAnchor);
        userCard.appendChild(userLink);

        const removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger");
        removeButton.id = `remove-user-button-${userId}`;
        removeButton.textContent = "Remove My Info";
        removeButton.addEventListener("click", function () {
            const removeConfirm = confirm(`Are you sure you want to remove ${fullName}'s info?`);
            if (removeConfirm) {
                userCard.remove();
            }
        });
        userCard.appendChild(removeButton);

        return userCard;
    }
});
