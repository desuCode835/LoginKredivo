document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');
    const switchButtons = document.querySelectorAll('.switch-form');
    const backButtons = document.querySelectorAll('.back-btn');
    const logoutBtn = document.querySelector('.logout-btn');

    // Function to handle form display
    function showForm(formType) {
        // First hide all forms
        [registrationForm, loginForm, dashboard].forEach(form => {
            if (form) {
                form.style.display = 'none';
            }
        });

        // Then show the requested form
        let formToShow;
        switch(formType) {
            case 'login':
                formToShow = loginForm;
                break;
            case 'registration':
                formToShow = registrationForm;
                break;
            case 'dashboard':
                formToShow = dashboard;
                break;
        }

        if (formToShow) {
            formToShow.style.display = 'block';
        }
    }

    // Show registration form by default
    showForm('registration');

    // Handle form switching
    switchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const formToShow = button.getAttribute('data-form');
            showForm(formToShow);
        });
    });

    // Handle back buttons - always go back to registration
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showForm('registration');
        });
    });

    // Handle registration form submission
    const registrationFormElement = registrationForm.querySelector('form');
    if (registrationFormElement) {
        registrationFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (data.nomor_ktp && !validateKTP(data.nomor_ktp)) {
                showError('Nomor KTP harus 16 digit');
                return;
            }

            if (data.npwp && !validateNPWP(data.npwp)) {
                showError('Format NPWP tidak valid');
                return;
            }

            console.log('Registration data:', data);
            showForm('dashboard');
        });
    }

    // Handle login form submission
    const loginFormElement = loginForm.querySelector('form');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            console.log('Login data:', data);
            showForm('dashboard');
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            showForm('login');
        });
    }

    // Handle loan application buttons
    const loanButtons = document.querySelectorAll('.loan-card button');
    loanButtons.forEach(button => {
        button.addEventListener('click', () => {
            const loanType = button.closest('.loan-card').querySelector('h3').textContent;
            showLoanApplication(loanType);
        });
    });

    // Validation functions
    function validateKTP(ktp) {
        return /^\d{16}$/.test(ktp);
    }

    function validateNPWP(npwp) {
        return /^\d{15}$/.test(npwp);
    }

    function showError(message) {
        alert(message);
    }

    function showLoanApplication(type) {
        alert(`Aplikasi pinjaman ${type} akan segera tersedia`);
    }

    // Add input validation effects
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'rgba(255, 123, 0, 0.5)';
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });

        // Real-time validation for specific fields
        if (input.name === 'nomor_ktp') {
            input.addEventListener('input', () => {
                const isValid = validateKTP(input.value);
                input.setCustomValidity(isValid ? '' : 'Nomor KTP harus 16 digit');
                input.style.borderColor = input.value ? (isValid ? 'rgba(255, 123, 0, 0.5)' : '#ff4444') : 'rgba(255, 255, 255, 0.2)';
            });
        }

        if (input.name === 'npwp') {
            input.addEventListener('input', () => {
                if (input.value) {
                    const isValid = validateNPWP(input.value);
                    input.setCustomValidity(isValid ? '' : 'Format NPWP tidak valid');
                    input.style.borderColor = isValid ? 'rgba(255, 123, 0, 0.5)' : '#ff4444';
                } else {
                    input.setCustomValidity('');
                    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
        }
    });
});
