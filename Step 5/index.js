let users = [
    {
        firstName : "Marc",
        lastName : "Beaufort",
        email : "marc.beaufort@test.fr",
        active : true
    },
    {
        firstName : "Lucie",
        lastName : "Carmin",
        email : "lucie.carmin@test.fr",
        active : true
    },
    {
        firstName : "Armand",
        lastName : "Perrot",
        email : "armand.perrot@test.fr",
        active : false
    },
    {
        firstName : "Sarah",
        lastName : "Calmels",
        email : "sarah.calmels@test.fr",
        active : true
    },
];

function createUserRow(id, user)
{
    let tr = document.createElement("tr");

    let idTd = document.createElement("td");
    let idText = document.createTextNode(id);
    idTd.appendChild(idText);
    tr.appendChild(idTd);

    let firstNameTd = document.createElement("td");
    let firstNameText = document.createTextNode(user.firstName);
    firstNameTd.appendChild(firstNameText);
    tr.appendChild(firstNameTd);

    let lastNameTd = document.createElement("td");
    let lastNameText = document.createTextNode(user.lastName);
    lastNameTd.appendChild(lastNameText);
    tr.appendChild(lastNameTd);

    let emailTd = document.createElement("td");
    let emailText = document.createTextNode(user.email);
    emailTd.appendChild(emailText);
    tr.appendChild(emailTd);

    let statusTd = document.createElement("td");

    let statusText = "";

    if(user.active === true)
    {
        statusText = document.createTextNode("Actif");
    }
    else
    {
        statusText = document.createTextNode("Inactif");
    }

    statusTd.appendChild(statusText);
    tr.appendChild(statusTd);

    let actionTd = document.createElement("td");

    let showButton = document.createElement("button");
    showButton.setAttribute("type", "button");
    showButton.classList.add("btn");
    showButton.classList.add("btn-primary");
    showButton.classList.add("mx-1");

    let showButtonSpan = document.createElement("span");
    showButtonSpan.classList.add("bi");
    showButtonSpan.classList.add("bi-eye-fill");
    showButton.appendChild(showButtonSpan);
    actionTd.appendChild(showButton);


    let editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.classList.add("btn");
    editButton.classList.add("btn-success");

    let editButtonSpan = document.createElement("span");
    editButtonSpan.classList.add("bi");
    editButtonSpan.classList.add("bi-pencil-fill");
    editButton.appendChild(editButtonSpan);
    actionTd.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("mx-1");

    let deleteButtonSpan = document.createElement("span");
    deleteButtonSpan.classList.add("bi");
    deleteButtonSpan.classList.add("bi-trash-fill");
    deleteButton.setAttribute("data-bs-toggle", "modal");
    deleteButton.setAttribute("data-bs-target", "#deleteUserModal");
    deleteButton.setAttribute("data-bs-username", `${user.firstName} ${user.lastName}`);
    deleteButton.setAttribute("data-bs-user", user.id);
    deleteButton.appendChild(deleteButtonSpan);
    actionTd.appendChild(deleteButton);

    tr.appendChild(actionTd);

    return tr;
}

function filterArrayByStatus(status)
{
    if(status === "all")
    {
        return users;
    }

    let tab = [];

    for(let i = 0; i < users.length; i++)
    {
        if(users[i].active === true && status === "active")
        {
            tab.push(users[i]);
        }
        else if(users[i].active === false && status === "inactive")
        {
            tab.push(users[i]);
        }
    }

    return tab;
}

function filterArrayBySearch(search)
{
    if(search === "")
    {
        return users;
    }

    console.log(search);

    let tab = [];

    for(let i = 0; i < users.length; i++)
    {
        console.log(users[i].firstName.includes(search));
        console.log(users[i].lastName.includes(search));
        if(users[i].firstName.includes(search) || users[i].lastName.includes(search))
        {
            tab.push(users[i]);
        }
    }

    return tab;
}

function renderUsers(users)
{
    // je vais faire une boucle sur le tableau users
    for(let i = 0; i < users.length; i++)
    {
        // pour chaque user dans le tableau, je vais générer un bloc de HTML
        let userRow = createUserRow(i + 1, users[i]);

        // puis je vais devoir l'ajouter à la fin du tbody
        let tbody = document.querySelector("tbody");
        tbody.appendChild(userRow);
    }
}

function addUser()
{
    let firstName = document.getElementById("addUserFirstName").value;
    let lastName = document.getElementById("addUserLastName").value;
    let email = document.getElementById("addUserEmail").value;
    let active = true;
    let id = users.length + 1;

    let user = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        active: active
    };

    console.log(user);

    let row = createUserRow(id, user);
    let tbody = document.querySelector("tbody");
    tbody.appendChild(row);
}

document.addEventListener('DOMContentLoaded', function(event) {
    renderUsers(users);

    let addUserFormButton = document.querySelector("#addUserFormButton");

    addUserFormButton.addEventListener("click", function(event) {
        addUser();
    });

    const deleteModal = document.getElementById('deleteUserModal');

    deleteModal.addEventListener('show.bs.modal', function(event){
        // Le bouton qui a déclenché l'évènement
        const button = event.relatedTarget;
        const username = button.getAttribute('data-bs-username');
        const user = button.getAttribute('data-bs-user');

        // Ici vous pouvez faire en sorte de modifier le modal-body
        let modalBody = document.querySelector("#deleteUserModal .modal-body");
        modalBody.innerHTML = "";
        let text = document.createTextNode(`Voulez-vous vraiment supprimer ${username} ?`);
        modalBody.appendChild(text);

        let deleteButton = document.getElementById("deleteUserFormButton");
        deleteButton.setAttribute("data-bs-user", user);
    });

    let deleteButton = document.getElementById("deleteUserFormButton");
    deleteButton.addEventListener("click", function(event) {
        let button = event.target;
        let userId = button.getAttribute("data-bs-user");

        users.splice(userId - 1, 1);

        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        renderUsers(users);
    });

    let filter = document.getElementById("filterStatus");
    filter.addEventListener("change", function(event) {
       let status = filter.value;

        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
       renderUsers(filterArrayByStatus(status));

    });

    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("change", function(event) {
        let search = searchInput.value;

        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        renderUsers(filterArrayBySearch(search));

    });
});