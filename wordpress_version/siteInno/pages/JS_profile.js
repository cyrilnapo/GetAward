// Function to setup event listeners for a specific text block
function setupTextBlock(editButtonId, formId, textInputId, textId) {
    document.getElementById(editButtonId).addEventListener('click', function() {
        const form = document.getElementById(formId);
        form.style.display = 'block';
        this.style.display = 'none';
    });

    document.getElementById(formId).addEventListener('submit', function(event) {
        event.preventDefault();
        const newText = document.getElementById(textInputId).value;
        document.getElementById(textId).textContent = newText;
        this.style.display = 'none';
        document.getElementById(editButtonId).style.display = 'block';
    });
}

// Setup all 10 text blocks
setupTextBlock('edit-button-1', 'edit-form-1', 'text-input-1', 'modifiable-text-1');
setupTextBlock('edit-button-2', 'edit-form-2', 'text-input-2', 'modifiable-text-2');
setupTextBlock('edit-button-3', 'edit-form-3', 'text-input-3', 'modifiable-text-3');
setupTextBlock('edit-button-4', 'edit-form-4', 'text-input-4', 'modifiable-text-4');
setupTextBlock('edit-button-5', 'edit-form-5', 'text-input-5', 'modifiable-text-5');
setupTextBlock('edit-button-6', 'edit-form-6', 'text-input-6', 'modifiable-text-6');
setupTextBlock('edit-button-7', 'edit-form-7', 'text-input-7', 'modifiable-text-7');
setupTextBlock('edit-button-8', 'edit-form-8', 'text-input-8', 'modifiable-text-8');
setupTextBlock('edit-button-9', 'edit-form-9', 'text-input-9', 'modifiable-text-9');
setupTextBlock('edit-button-10', 'edit-form-10', 'text-input-10', 'modifiable-text-10');

// Repeat for all 10 text blocks


 function myFunction() {
       var element = document.body;
       element.classList.toggle("dark-mode");
    }