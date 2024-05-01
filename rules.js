class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = key; // TODO: use `key` to get the data object for the current story location
        this.engine.show(this.engine.storyData.Locations[key].Body); // TODO: replace this text by the Body of the location data
        if(this.engine.storyData.Locations[key].preworkout == true){
            this.engine.storyData.preworkout = true;
        }
        if(this.engine.storyData.Locations[key].Choices != {}) { // TODO: check if the location has any Choices
            for(let choice of this.engine.storyData.Locations[key].Choices){ // TODO: loop over the location's Choices
                //console.log("This is the current choice: " + choice);
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            //let button happen, check to see if button has precondition, 
            //if no let button happen, if yes check precondition of "preworkout" and preworkout is true
            
            
            if(choice.Condition){
                let conditionName = Object.keys(choice.Condition)[0];
                if(this.engine.storyData[conditionName] == true){
                    //console.log(Location);
                    this.engine.gotoScene(Location, choice.Target);
                    this.engine.show("&gt; "+choice.Text);
                } else {
                    
                    console.log(this.engine.storyData.Locations.NotYet.Choices[0]);
                    console.log(this.engine.storyData.Locations.NotYet);
                    
                    //this.engine.gotoScene(this.engine.storyData.Locations.NotYet, this.engine.storyData.Locations.NotYet.Choices[0]);
                    //this.engine.show("&gt; "+this.storyData.Locations.NotYet.Text);
                }
            } else {
                this.engine.gotoScene(Location, choice.Target);
                this.engine.show("&gt; "+choice.Text);
            }

        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');