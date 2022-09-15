let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1; 
let year = today.getFullYear();
if (date < 10) {
    date = '0' + date
}
if (month < 10) {
    month = '0' + month
}
max_date = year - 18 + '-' + month + '-' + date;
min_date = year - 55 + '-' + month + '-' + date;
document.getElementById("dob").setAttribute("min", min_date);
document.getElementById("dob").setAttribute("max", max_date);

let user_entries = local_storage.getItem("user-entries");
if (user_entries) {
    user_entries = JSON.parse(user_entries);
} else {
    user_entries = [];
}

const displayEntries = () => {
    const saveduser_entries = local_storage.getItem("user-entries");
    let entries = "";
    if (saveduser_entries) {
        const parseduser_entries = JSON.parse(saveduser_entries);
        entries = parseduser_entries
            .map((entry) => {
                const name = `<td class='border px-4 py-2'>${entry.name}</td>`;
                const email = `<td class='border px-4 py-2'>${entry.email}</td>`;
                const password = `<td class='border px-4 py-2'>${entry.password}</td>`;
                const dob = `<td class='border px-4 py-2'>${entry.dob}</td>`;
                const acceptTerms = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;
                const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
                return row;
            })
            .join("\n");
    }
    var table = `<table class="table-auto w-full"><tr>
  <th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">Password</th>
  <th class="px-4 py-2">Dob</th>
  <th class="px-4 py-2">Accepted terms?</th>
</tr>${entries} </table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTermsAndConditions =
        document.getElementById("acceptTerms").checked;
    const userDetails = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions,
    };
    user_entries.push(userDetails);
    local_storage.setItem("user-entries", JSON.stringify(user_entries));

    displayEntries();
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();