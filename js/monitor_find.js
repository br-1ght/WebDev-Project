function monitor_search() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "json/monitors.json");
    xhr.onload = function() {
        if (this.status == 200) {
            let monitorData = JSON.parse(xhr.responseText);

            let recommendations = document.getElementById("recommendations");
            recommendations.innerHTML = "" // Clear all the recommendations if user wants to search again

            /* Get data from user's input */
            let search_form = document.forms[0]; 
            let budget = search_form.budget.value;

            let useCase = [];
            if (document.getElementById("workCheck").checked) {
                useCase.push(document.getElementById("workCheck").value)
            }
            if (document.getElementById("gamingCheck").checked) {
                useCase.push(document.getElementById("gamingCheck").value)
            }

            let resolution = search_form.resolution.value;
            let screenSize = search_form.screen_size.value;
            let adjustableStand = search_form.adjustable_stand.value;
            
            /* Put the data into an object to compare with the monitors*/
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
            for (i=0; i < monitorData.length; i++) { // Use the user's data to compare with all the monitors 
               matchCount = 0
               if (userChoiceObj.budget >= monitorData[i].budget) {
                   matchCount += 1
               }
               for (j = 0; j < userChoiceObj.useCase.length; j++) { // TODO Rework this 
                   if (userChoiceObj.useCase[j] === monitorData[i].useCase[j] && monitorData[i].useCase[j] === "work") {
                       matchCount += 100
                       if (j === 1) {
                           matchCount += 200
                       }
                   }

                   if (userChoiceObj.useCase[j] === monitorData[i].useCase[j] && monitorData[i].useCase[j] === "gaming") {
                       matchCount += 200
                   }
               }
               if (userChoiceObj.resolution === monitorData[i].resolution) {
                   matchCount += 1
               }
               if (userChoiceObj.screenSize === monitorData[i].screenSize) {
                   matchCount += 1
               }
               if (userChoiceObj.adjustableStand === monitorData[i].adjustableStand) {
                   matchCount += 1
               }
               matches.push(matchCount)
            }
            console.log(matches)
            let highestMatch = Math.max.apply(null, matches)
            let indexesOfHighest = [] 
            for (i=0; i< matches.length; i++) {
                if (matches[i] === highestMatch) {
                    indexesOfHighest.push(i)
                }
            }
            console.log(indexesOfHighest)
            
            for (i = 0; i < indexesOfHighest.length; i++) { /* Showing the recommendations */
                recoModel = monitorData[indexesOfHighest[i]].model
                recoModelName = recoModel.replaceAll("-", " ") /* Display the monitor name without the dashes(-) */
                let recoDiv = document.createElement("DIV")
                recoStyle = recoDiv.classList.add("recommendation_item")
                recoDiv.innerHTML = "<img src='images/" + recoModel + ".jpg' height=200px>" + "<a href='monitors/" + recoModel + ".html' target='_blank'><h1>" + recoModelName + "</h1></a>"
                recommendations.appendChild(recoDiv)
            }
            search_form.reset()
        }
    }
    xhr.send();
};