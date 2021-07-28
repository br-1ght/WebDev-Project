function monitor_find() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "json/monitors.json");
    xhr.onload = function() {
        if (this.status == 200) {
            var monitorData = JSON.parse(xhr.responseText);
            console.log(monitorData);
        }
    }
    xhr.send();

    let search_form = document.forms[0]; 
    let budget = search_form.budget.value;
    let useCase = search_form.use_case.value;
    let resolution = search_form.resolution.value;
    let screenSize = search_form.screen_size.value;
    let adjustableStand = search_form.adjustable_stand.value;
    let recommendation_div = document.createElement("DIV");
    recommendation_div.className = "recommendation_item";
    // recommendation_div.innerHTML = "budget: " + budget_choice + ", Use Case: " + useCase_choice;
    document.getElementById("recommendations").appendChild(recommendation_div);
    search_form.reset();
}