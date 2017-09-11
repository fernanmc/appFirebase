import { Component, NgZone } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as dialogs from "tns-core-modules/ui/dialogs";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


var firebase = require("nativescript-plugin-firebase");

//let _url = "https://jsonplaceholder.typicode.com/posts/";


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    
    public counter: number = 16;
    public title:string = "text";
    public chat:string;
    public repeater: any;
    public loginTxt:string;
    public listener:any;

    constructor(private http: Http, private ngZone: NgZone){
        firebase.addValueEventListener((result:any)=>{
            this.ngZone.run(()=>{
                this.onQueryEvent(result);
            });
        }, "/users");
        this.listener = {
            onAuthStateChanged: function(data){
                console.log("Logged "+data.loggedIn);
                if(data.loggedIn){
                    alert(data.user.email);
                }
            },
            thisArg:
        };
       /* firebase.addOnMessageReceivedCallback( // esto solo se usa para mnsajes
            ((message)=>{ //aqui sobra
                console.log("Mensaje cabezi");
                console.log(message);
                this.ngZone.run(()=>{
                  var jsonResponse:any;
                  jsonResponse = message;
                  this.title = JSON.stringify(jsonResponse.text);
                });
            })
        );*/
    }

        public get message(): string {
            if (this.counter > 0) {
                return this.counter + " taps left";
            } else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        }

        ngOnInit(){

            firebase.addAuthStateListener(this.listener);
            firebase.removeAuthStateListener(this.listener);
            firebase.hasAuthStateListener(this.listener);
            //"https://jsonplaceholder.typicode.com/posts/";
           /* this.http.get("https://jsonplaceholder.typicode.com/posts/1").
            subscribe((res: Response)=>{
                this.ngZone.run(()=>{
                    console.log("pase por la run");
                    let myResponsejson = res.json();
                    this.title = myResponsejson.title;

                    console.dir(res.json());
                })
            });*/
         //   this.traerDatosFirebase();
          
        }
        
        traerDatosFirebase(){
            firebase.query(
                this.onQueryEvent,
                "/users",
                {
                    singleEvent: false,
                    orderBy:{
                        type: firebase.QueryOrderByType.KEY
                    }
                }
            );
        }

        onQueryEvent(result){
          console.log("hit");
           if(result){
               if(result.error){
                   console.log("error");
               }else if(result.value){
                   this.chat = JSON.stringify(result.value);
                   let newArray: Array<any> = [];
                
                   this.repeater = this.generateArray(result.value);
                  /*  for(var i=0; i< this.repeater.lenght;i++){
                        newArray.push(this.generateArray(this.repeater[i]));
                        console.log(this.generateArray(this.repeater[i]));
                    }
                    this.repeater= newArray;*/
                }
           }
        }

        generateArray(obj){
            return Object.keys(obj).map((key)=>{return obj[key]});
        }

        public onTap() {
            this.counter--;
           firebase.push(
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
              );

            /*  firebase.createUser({
                  email: "fernandomaserow@gmail.com",
                  password: "mispassword"
              }).then( (user) =>{
                console.dir(user);
            }, (error)=>{
                console.log("Error creando el bicho"+ error);
                
            } );*/
        }
        loginEmail(){
            firebase.login({
                type:firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: "fernandomasero@gmail.com",
                    password: "unpassword"
                }
            }).then(
                function(result){
                   // this.loginTxt = JSON.stringify(result);
                    dialogs.alert({
                        title: "usuario logueado",
                        message: "userID: "+result.uid,
                        okButtonText: "OK"
                    });
                   // console.dir(result);
                },
                function(errorMessage){
                  //  this.loginTxt = errorMessage;
                    dialogs.alert({
                        title: "error creando usuario",
                        message: "error: "+errorMessage,
                        okButtonText: "OK" 
                    });
                }
            );
        }

        createEmailUser(){
            firebase.createUser({
                email: "fernandomasero@gmail.com",
                password: "mipassword"
            }).then( 
                function(result){
                    dialogs.alert({
                        title: "usuario creado",
                        message: "userID: "+result.key,
                        okButtonText: "OK"
                    });
                },
                function(errorMessage){
                    dialogs.alert({
                        title: "error creando usuario",
                        message: "error: "+errorMessage,
                        okButtonText: "OK" 
                    });
                }
             );
        }

        resetPassword(){
            firebase.resetPassword({
                type:firebase.LoginType.PASSWORD,              
                    email: "fernandomasero@gmail.com"
             
            }).then(
                function(result){
                   // this.loginTxt = JSON.stringify(result);
                    dialogs.alert({
                        title: "usuario reseteado",
                        message: "recibira un correo",
                        okButtonText: "OK"
                    });
                   // console.dir(result);
                },
                function(errorMessage){
                  //  this.loginTxt = errorMessage;
                  dialogs.alert({
                    title: "Algo fue mal",
                    message: "No recibira un correo",
                    okButtonText: "OK"
                });
                }
            );
        }

        currentUser(){
            firebase.getCurrentUser().then(
                (user)=>{
                    alert(JSON.stringify(user));
                },
                (errorMessage)=>{
                    alert(JSON.stringify(errorMessage));
                }
            );
        }
}
