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

            // Form validation: if a field is empty, show alert message 
            if (budget == "") {
                alert("Budget must be selected!");
                return false; // Prevent the form from being submitted
            }
            if (useCase.length === 0) { // Check if use case array is empty
                alert("Please select at least 1 choice for use case!")
                return false;
            }
            if (resolution == "") {
                alert("Resolution must be selected!")
                return false;
            }
            if (screenSize == "") {
                alert("Screen size must be selected!")
                return false;
            }
            if (adjustableStand == "") {
                alert("Please choose an option whether you need an adjustable stand!")
                return false;
            }

            // Put the data into an object to compare with the monitors
            function userChoice(bg, us, res, ss, as) {
                this.budget = bg;
                this.useCase = us;
                this.resolution = res;
                this.screenSize = ss;
                this.adjustableStand = as;
            }
            
            let userChoiceObj = new userChoice(budget, useCase, resolution, screenSize, adjustableStand);
            console.log(userChoiceObj);
            
            // Match user's inputs to the monitors specifications
            var matches = []
            for (i=0; i < monitorData.length; i++) { 
               matchCount = 0
               if (userChoiceObj.budget >= monitorData[i].budget) {
                   matchCount += 1
               }
               for (j = 0; j < userChoiceObj.useCase.length; j++) { 
                   if (userChoiceObj.useCase[j] === monitorData[i].useCase[j] && monitorData[i].useCase[j] === "Work") {
                       matchCount += 100
                   }

                   if (userChoiceObj.useCase[j] === monitorData[i].useCase[0] && monitorData[i].useCase[0] === "Gaming") {
                       matchCount += 200
                   }

                   if (userChoiceObj.useCase[j] === monitorData[i].useCase[1] && monitorData[i].useCase[1] === "Gaming") {
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
            let highestMatch = Math.max.apply(null, matches) // Find the number of the highest match count
            let indexesOfHighest = [] // Since there could be multiple monitors that can have the highest match count, store the index in an array
            for (i=0; i< matches.length; i++) {
                if (matches[i] === highestMatch) {
                    indexesOfHighest.push(i)
                }
            }
            console.log(indexesOfHighest)
            
            for (i = 0; i < indexesOfHighest.length; i++) { // Showing the recommendations
                let recoModel = monitorData[indexesOfHighest[i]].model // monitor name for anchor link and image
                let recoModelName = recoModel.replaceAll("-", " ") // Display the monitor name without the dashes(-)
                let recoModelUseCase = monitorData[indexesOfHighest[i]].useCase
                let recoModelRes = monitorData[indexesOfHighest[i]].resolution
                let recoModelRR = monitorData[indexesOfHighest[i]].refreshRate
                let recoModelSize = monitorData[indexesOfHighest[i]].screenSize
                let recoModelPrice = monitorData[indexesOfHighest[i]].price
                let recoModelAS = monitorData[indexesOfHighest[i]].adjustableStand
                let recoDiv = document.createElement("DIV")
                recoStyle = recoDiv.classList.add("recommendation_item")
                recoDiv.innerHTML = "<img src='images/" + recoModel + ".jpg' height=200px>" + "<a href='monitors/" + recoModel + ".html' target='_blank'><h1>" + recoModelName + "</h1></a>" + "<div class='recommendation_spec_list'><p>Specifications</p><ul><li>Price: " + recoModelPrice + "</li><li>Use case: " + recoModelUseCase + "</li><li>Resolution: " + recoModelRes + "</li><li>Screen Size: " + recoModelSize + "</li><li>Refresh rate: " + recoModelRR + "</li><li>Adjustable Stand: " + recoModelAS + "</li></ul></div>" 
                recommendations.appendChild(recoDiv)
            }
            search_form.reset()
        }
    }
    xhr.send();
};