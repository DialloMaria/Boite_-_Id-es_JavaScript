document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('submissionForm');
    const successMessage = document.getElementById('success-message');
 
 
    form.addEventListener('submit', function(event) {
        event.preventDefault();
 
 
        // Clear previous errors
        const inputs = form.querySelectorAll('.form-control, .form-select, textarea');
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
 
 
        let isValid = true;
 
 
        // Validate libelle
        const libelle = document.getElementById('libelle');
        if (libelle.value.trim() === '') {
            isValid = false;
            libelle.classList.add('is-invalid');
        }
 
 
        // Validate categorie
        const categorie = document.getElementById('categorie');
        if (categorie.value === '') {
            isValid = false;
            categorie.classList.add('is-invalid');
        }
 
 
        // Validate message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            isValid = false;
            message.classList.add('is-invalid');
        }
 
 
        if (isValid) {
            // Affichage du message de succès
            successMessage.classList.remove('d-none');
            form.reset();
        }
    });
 });
 