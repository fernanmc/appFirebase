import { Component } from "@angular/core";
var firebase = require("nativescript-plugin-firebase");




@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    
    public counter: number = 16;
    
        public get message(): string {
            if (this.counter > 0) {
                return this.counter + " taps left";
            } else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        }
        
        public onTap() {
            this.counter--;
           /* firebase.push(
               '/users',
               {
                 username: 'fernanmc',
                 email: "fernandomasero@gmail.com",
                 password: "algo"
               }
              ).then(
                  function (result) {
                    console.log("Created key",result.key);
                  },
                  function (error) {
                    console.log("firebase.create error: " + error);
                  }
              );*/

              firebase.CreateUser({
                  email: "fernandomasero@gmail.com",
                  password: "mispassword"
              }).then( (user) =>{
                console.dir(user);
            }, (error)=>{
                console.log("Error creando el bicho"+ error);
                
            } );
        }
}
