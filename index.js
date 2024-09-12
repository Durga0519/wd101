let userform = document.getElementById("user-form");

// Function to retrieve entries from local storage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let userentries = retrieveEntries();

// Function to display entries in the table
const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptandterms}</td>`;

        const row = `<tr> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Dob</th>
    <th class="px-4 py-2">Accepted terms?</th>
    </tr>${tableEntries}</table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

// Function to calculate age from DOB
const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

// Function to save the form data
const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptandterms = document.getElementById("acceptTerms").checked;

    // Check if DOB is valid
    const age = calculateAge(dob);

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptandterms
    };

    userentries.push(entry);

    // Save updated entries to local storage
    localStorage.setItem("user-entries", JSON.stringify(userentries));

    // Display the updated list of entries
    displayEntries();
};

// Add event listener for form submission
userform.addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();
