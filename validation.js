
    document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM
    const form = document.getElementById('ideaForm'); // Le formulaire de soumission d'idées
    const errorMessage = document.getElementById('error-message'); // Pour afficher les messages d'erreur généraux
    const successMessage = document.getElementById('success-message'); // Pour afficher les messages de succès
    const tableBody = document.getElementById('ideaTableBody'); // Le corps du tableau où les idées seront affichées
    const errorLibelle = document.getElementById('error-libelle'); // Message d'erreur pour le champ "Libellé"
    const errorCategorie = document.getElementById('error-categorie'); // Message d'erreur pour le champ "Catégorie"
    const errorDescription = document.getElementById('error-description'); // Message d'erreur pour le champ "Description"

    // Tableau pour stocker les idées
    let ideas = [];

    // Écouteur d'événement pour le formulaire lors de la soumission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

        // Réinitialisation des messages d'erreur et de succès
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        errorLibelle.textContent = '';
        errorCategorie.textContent = '';
        errorDescription.textContent = '';

        // Validation des entrées
        const libelle = document.getElementById('libelle').value.trim(); // Récupération et suppression des espaces autour du libellé
        const categorie = document.getElementById('categorie').value; // Récupération de la catégorie sélectionnée
        const description = document.getElementById('description').value.trim(); // Récupération et suppression des espaces autour de la description

        let isValid = true; // Indicateur de validité des entrées
        const libelleRegex = /^[^\d]+$/;  // Cette expression régulière assure qu'aucun chiffre n'est présent dans le libellé
        const descriptionRegex = /^[^\d]+$/;  // Cette expression régulière assure qu'aucun chiffre n'est présent dans le libellé

        // Validation du libellé
        if (!libelle) {
            errorLibelle.textContent = 'Le libellé est obligatoire.';
            isValid = false;
        } else if (!libelleRegex.test(libelle)) {
            errorLibelle.textContent = 'Le libellé ne doit pas contenir de chiffres.';
            isValid = false;
        }

        // Validation de la catégorie
        if (!categorie) {
            errorCategorie.textContent = 'La catégorie est obligatoire.';
            isValid = false;
        }

        // Validation de la description
        if (!description) {
            errorDescription.textContent = 'La description est obligatoire.';
            isValid = false;
        }

        // Affichage du message d'erreur si la validation échoue
        if (!isValid) {
            errorMessage.textContent = 'Veuillez corriger les erreurs ci-dessus.';
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 2000); // Masque le message d'erreur après 2 secondes
            return;
        }

        // Ajout de la nouvelle idée au tableau
        const newIdea = { libelle, categorie, description, approved: false }; // Création d'un objet idée
        ideas.push(newIdea); // Ajout de l'idée au tableau
        // localStorage.setItem("ideas",JSON.stringify(ideas));
        renderTable(); // Mise à jour de l'affichage du tableau

        // Affichage du message de succès
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000); // Masque le message de succès après 2 secondes

        // Réinitialisation du formulaire
        form.reset(); // Réinitialise les champs du formulaire
    });

    // Fonction pour afficher les idées dans le tableau
    function renderTable() {
        tableBody.innerHTML = ''; // Vide le corps du tableau
        ideas.forEach((idea, index) => {
            const row = document.createElement('tr'); // Crée une nouvelle ligne pour chaque idée
            row.innerHTML = `   
                <td>${idea.libelle}</td>
                <td>${idea.categorie}</td>
                <td>${idea.description}</td>
                <td>
                    <button class="btn btn-${idea.approved ? 'danger' : 'success'} btn-sm" onclick="toggleApproval(${index})">${idea.approved ? 'Désapprouver' : 'Approuver'}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteIdea(${index})">Supprimer</button>
                </td>
            `; // Remplit la ligne avec les données de l'idée et ajoute les boutons pour approuver/désapprouver et supprimer
            tableBody.appendChild(row); // Ajoute la ligne au tableau
        });
    }

    // Fonction pour approuver/désapprouver une idée
    window.toggleApproval = function(index) {
        ideas[index].approved = !ideas[index].approved; // Inverse le statut d'approbation de l'idée
        renderTable(); // Met à jour l'affichage du tableau
    };

    // Fonction pour supprimer une idée
    window.deleteIdea = function(index) {
        ideas.splice(index, 1); // Supprime l'idée du tableau à l'index spécifié
        renderTable(); // Met à jour l'affichage du tableau
    };
});
