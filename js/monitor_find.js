function monitor_search() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "json/monitors.json");
    xhr.onload = function() {
        if (this.status == 200) {
            let monitorData = JSON.parse(xhr.responseText);

            let search_form = document.forms[0]; 
            let budget = search_form.budget.value;
            let useCase = search_form.use_case.value;
            let resolution = search_form.resolution.value;
            let screenSize = search_form.screen_size.value;
            let adjustableStand = search_form.adjustable_stand.value;
                
            function userChoice(bg, us, res, ss, as) {
                this.budget = bg;
                this.useCase = us;
                this.resolution = res;
                this.screenSize = ss;
                this.adjustableStand = as;
            }
            
            let userChoiceObj = new userChoice(budget, useCase, resolution, screenSize, adjustableStand);
            console.log(userChoiceObj);
            var matches = []
            for (i=0; i < monitorData.length; i++) {
               matchNum = 0
               if (userChoiceObj.budget >= monitorData[i].budget) {
                   matchNum += 1
               }
               if (userChoiceObj.useCase === monitorData[i].useCase) {
                   matchNum += 1
               }
               if (userChoiceObj.resolution === monitorData[i].resolution) {
                   matchNum += 1
               }
               if (userChoiceObj.screenSize === monitorData[i].screenSize) {
                   matchNum += 1
               }
               if (userChoiceObj.adjustableStand === monitorData[i].adjustableStand) {
                   matchNum += 1
               }
               matches.push(matchNum)
            }
            console.log(matches)
            highestMatch = Math.max.apply(null, matches)
            indexModel = matches.indexOf(highestMatch)
            recoModel = monitorData[indexModel].model
            console.log(recoModel)
            recoItem = document.getElementById("recommendation_item");
            recoItem.style.display = "block";
            // recoItem.innerHTML = "budget: " + budget + ", Use Case: " + useCase;
            search_form.reset()
        }
    }
    xhr.send();
};