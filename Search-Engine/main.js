
//get Data json file
function getData(keyword = '') {
    return fetch('./data.json')
        .then((response) => {
            return response.json();
        }).then((data) => {
            return data.filter(function (e) { return (e.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1; });
        })
}

//block item Employee
function itemEmployee(image, name, age, gender, email) {
    return `<div class="item">
    <div class="image-employee">
        <img src="` + image + `" alt="">
    </div>
    <div class="description-eployee">
        <h3 class="name-employee">Name: ` + name + `</h3>
        <p class="age-employee">Age: ` + age + `</p>
        <p class="gender-employee">Gender: `+ gender + `</p>
        <p>Email: <a href="mailto:` + email + `" class="email-employee">` + email + `</a></p>
    </div>
</div>`
}


//load Employee
function loadEmployee(keyword = '') {
    var listEmployeeHTML = '';
    getData(keyword).then((data) => {
        if(data.length == 0) {
            listEmployeeHTML = '<h2 class="no-results">No match was found</h2>';
        }else {
            console.log(typeof(data));
            data.forEach(function (item, index) {
                listEmployeeHTML += itemEmployee(data[index].image, data[index].name, data[index].age, data[index].gender, data[index].email);
            })
        }
        document.getElementById("list-employee").innerHTML = listEmployeeHTML;
    });
}
loadEmployee()

var body = document.getElementById("body");
const input = document.getElementById("searchText");
input.addEventListener('keyup', (event) => {
    body.classList.add("body-spinner");
    setTimeout(function () {
        loadEmployee(event.target.value);
        body.classList.remove("body-spinner");
    }, 3000);
});


