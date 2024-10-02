document.getElementById('itemInput').focus();

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemText = itemInput.value.trim();

    if (itemText !== "") {
        const li = document.createElement('li');
        li.textContent = itemText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            if (confirm("Are you sure you want to delete this item?")) {
                li.remove();
            }
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            const newText = prompt("Edit item:", itemText);
            if (newText !== null && newText.trim() !== "") {
                li.firstChild.textContent = newText.trim();
            }
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        document.getElementById('shoppingList').appendChild(li);

        itemInput.value = "";
        itemInput.focus();
    } else {
        alert("Please enter an item.");
    }
}
