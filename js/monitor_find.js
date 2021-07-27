function monitor_find() {
    var search_form = document.forms[0]; 
    let budget_choice = search_form.budget.value;
    let useCase_choice = search_form.use_case.value;
    let resolution_choice = search_form.resolution.value;
    let screenSize_choice = search_form.screen_size.value;
    let adjustableStand_choice = search_form.adjustable_stand.value;
    var recommendation_div = document.createElement("DIV");
    recommendation_div.className = "recommendation_item";
    // recommendation_div.innerHTML = "budget: " + budget_choice + ", Use Case: " + useCase_choice;
    document.getElementById("recommendations").appendChild(recommendation_div)
    search_form.reset()
}