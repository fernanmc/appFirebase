"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var dialogs = require("tns-core-modules/ui/dialogs");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var firebase = require("nativescript-plugin-firebase");
//let _url = "https://jsonplaceholder.typicode.com/posts/";
var AppComponent = (function () {
    function AppComponent(http, ngZone) {
        var _this = this;
        this.http = http;
        this.ngZone = ngZone;
        this.counter = 16;
        this.title = "text";
        firebase.addValueEventListener(function (result) {
            _this.ngZone.run(function () {
                _this.onQueryEvent(result);
            });
        }, "/users");
        this.listener = {
            onAuthStateChanged: function (data) {
                console.log("Logged " + data.loggedIn);
                if (data.loggedIn) {
                    alert(data.user.email);
                }
            },
            thisArg: this
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
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
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
    };
    AppComponent.prototype.traerDatosFirebase = function () {
        firebase.query(this.onQueryEvent, "/users", {
            singleEvent: false,
            orderBy: {
                type: firebase.QueryOrderByType.KEY
            }
        });
    };
    AppComponent.prototype.onQueryEvent = function (result) {
        console.log("hit");
        if (result) {
            if (result.error) {
                console.log("error");
            }
            else if (result.value) {
                this.chat = JSON.stringify(result.value);
                var newArray = [];
                this.repeater = this.generateArray(result.value);
                /*  for(var i=0; i< this.repeater.lenght;i++){
                      newArray.push(this.generateArray(this.repeater[i]));
                      console.log(this.generateArray(this.repeater[i]));
                  }
                  this.repeater= newArray;*/
            }
        }
    };
    AppComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    AppComponent.prototype.onTap = function () {
        this.counter--;
        firebase.push('/users', {
            username: 'fernanmc',
            email: "fernandomasero@gmail.com",
            password: "algo"
        }).then(function (result) {
            console.log("Created key", result.key);
        }, function (error) {
            console.log("firebase.create error: " + error);
        });
        /*  firebase.createUser({
              email: "fernandomaserow@gmail.com",
              password: "mispassword"
          }).then( (user) =>{
            console.dir(user);
        }, (error)=>{
            console.log("Error creando el bicho"+ error);
            
        } );*/
    };
    AppComponent.prototype.loginEmail = function () {
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: "fernandomasero@gmail.com",
                password: "unpassword"
            }
        }).then(function (result) {
            // this.loginTxt = JSON.stringify(result);
            dialogs.alert({
                title: "usuario logueado",
                message: "userID: " + result.uid,
                okButtonText: "OK"
            });
            // console.dir(result);
        }, function (errorMessage) {
            //  this.loginTxt = errorMessage;
            dialogs.alert({
                title: "error creando usuario",
                message: "error: " + errorMessage,
                okButtonText: "OK"
            });
        });
    };
    AppComponent.prototype.createEmailUser = function () {
        firebase.createUser({
            email: "fernandomasero@gmail.com",
            password: "mipassword"
        }).then(function (result) {
            dialogs.alert({
                title: "usuario creado",
                message: "userID: " + result.key,
                okButtonText: "OK"
            });
        }, function (errorMessage) {
            dialogs.alert({
                title: "error creando usuario",
                message: "error: " + errorMessage,
                okButtonText: "OK"
            });
        });
    };
    AppComponent.prototype.resetPassword = function () {
        firebase.resetPassword({
            type: firebase.LoginType.PASSWORD,
            email: "fernandomasero@gmail.com"
        }).then(function (result) {
            // this.loginTxt = JSON.stringify(result);
            dialogs.alert({
                title: "usuario reseteado",
                message: "recibira un correo",
                okButtonText: "OK"
            });
            // console.dir(result);
        }, function (errorMessage) {
            //  this.loginTxt = errorMessage;
            dialogs.alert({
                title: "Algo fue mal",
                message: "No recibira un correo",
                okButtonText: "OK"
            });
        });
    };
    AppComponent.prototype.currentUser = function () {
        firebase.getCurrentUser().then(function (user) {
            alert(JSON.stringify(user));
        }, function (errorMessage) {
            alert(JSON.stringify(errorMessage));
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQXdFO0FBRXhFLHFEQUF1RDtBQUV2RCxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRy9CLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXZELDJEQUEyRDtBQVEzRDtJQVNJLHNCQUFvQixJQUFVLEVBQVUsTUFBYztRQUF0RCxpQkEwQkM7UUExQm1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUC9DLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsVUFBSyxHQUFVLE1BQU0sQ0FBQztRQU96QixRQUFRLENBQUMscUJBQXFCLENBQUMsVUFBQyxNQUFVO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNaLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osa0JBQWtCLEVBQUUsVUFBUyxJQUFJO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUNkLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixDQUFDO1lBQ0wsQ0FBQztZQUNELE9BQU8sRUFBQyxJQUFJO1NBQ2YsQ0FBQztRQUNIOzs7Ozs7Ozs7O2FBVUs7SUFDUixDQUFDO0lBRUcsc0JBQVcsaUNBQU87YUFBbEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENB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WiwwQ0FBMEM7WUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixPQUFPLEVBQUUsb0JBQW9CO2dCQUM3QixZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUM7WUFDSix1QkFBdUI7UUFDMUIsQ0FBQyxFQUNELFVBQVMsWUFBWTtZQUNuQixpQ0FBaUM7WUFDakMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDWixLQUFLLEVBQUUsY0FBYztnQkFDckIsT0FBTyxFQUFFLHVCQUF1QjtnQkFDaEMsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzFCLFVBQUMsSUFBSTtZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUNELFVBQUMsWUFBWTtZQUNULEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBdE5JLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FXNEIsV0FBSSxFQUFrQixhQUFNO09BVDdDLFlBQVksQ0F1TnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXZORCxJQXVOQztBQXZOWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5cbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuXG52YXIgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuLy9sZXQgX3VybCA9IFwiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzL1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgXG4gICAgcHVibGljIGNvdW50ZXI6IG51bWJlciA9IDE2O1xuICAgIHB1YmxpYyB0aXRsZTpzdHJpbmcgPSBcInRleHRcIjtcbiAgICBwdWJsaWMgY2hhdDpzdHJpbmc7XG4gICAgcHVibGljIHJlcGVhdGVyOiBhbnk7XG4gICAgcHVibGljIGxvZ2luVHh0OnN0cmluZztcbiAgICBwdWJsaWMgbGlzdGVuZXI6YW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIG5nWm9uZTogTmdab25lKXtcbiAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKChyZXN1bHQ6YW55KT0+e1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5vblF1ZXJ5RXZlbnQocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBcIi91c2Vyc1wiKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IHtcbiAgICAgICAgICAgIG9uQXV0aFN0YXRlQ2hhbmdlZDogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgXCIrZGF0YS5sb2dnZWRJbik7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sb2dnZWRJbil7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEudXNlci5lbWFpbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXNBcmc6dGhpc1xuICAgICAgICB9O1xuICAgICAgIC8qIGZpcmViYXNlLmFkZE9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2soIC8vIGVzdG8gc29sbyBzZSB1c2EgcGFyYSBtbnNhamVzXG4gICAgICAgICAgICAoKG1lc3NhZ2UpPT57IC8vYXF1aSBzb2JyYVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVuc2FqZSBjYWJlemlcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpPT57XG4gICAgICAgICAgICAgICAgICB2YXIganNvblJlc3BvbnNlOmFueTtcbiAgICAgICAgICAgICAgICAgIGpzb25SZXNwb25zZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gSlNPTi5zdHJpbmdpZnkoanNvblJlc3BvbnNlLnRleHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTsqL1xuICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291bnRlciArIFwiIHRhcHMgbGVmdFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJIb29ycmFhYXkhIFxcbllvdSBhcmUgcmVhZHkgdG8gc3RhcnQgYnVpbGRpbmchXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuZ09uSW5pdCgpe1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRBdXRoU3RhdGVMaXN0ZW5lcih0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgICAgIGZpcmViYXNlLnJlbW92ZUF1dGhTdGF0ZUxpc3RlbmVyKHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgZmlyZWJhc2UuaGFzQXV0aFN0YXRlTGlzdGVuZXIodGhpcy5saXN0ZW5lcik7XG4gICAgICAgICAgICAvL1wiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzL1wiO1xuICAgICAgICAgICAvKiB0aGlzLmh0dHAuZ2V0KFwiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzFcIikuXG4gICAgICAgICAgICBzdWJzY3JpYmUoKHJlczogUmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFzZSBwb3IgbGEgcnVuXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbXlSZXNwb25zZWpzb24gPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gbXlSZXNwb25zZWpzb24udGl0bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIocmVzLmpzb24oKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgICAvLyAgIHRoaXMudHJhZXJEYXRvc0ZpcmViYXNlKCk7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRyYWVyRGF0b3NGaXJlYmFzZSgpe1xuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICAgICAgdGhpcy5vblF1ZXJ5RXZlbnQsXG4gICAgICAgICAgICAgICAgXCIvdXNlcnNcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTp7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uUXVlcnlFdmVudChyZXN1bHQpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0XCIpO1xuICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgaWYocmVzdWx0LmVycm9yKXtcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0LnZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXQgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgIGxldCBuZXdBcnJheTogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHRoaXMucmVwZWF0ZXIgPSB0aGlzLmdlbmVyYXRlQXJyYXkocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIC8qICBmb3IodmFyIGk9MDsgaTwgdGhpcy5yZXBlYXRlci5sZW5naHQ7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2godGhpcy5nZW5lcmF0ZUFycmF5KHRoaXMucmVwZWF0ZXJbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2VuZXJhdGVBcnJheSh0aGlzLnJlcGVhdGVyW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRlcj0gbmV3QXJyYXk7Ki9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdlbmVyYXRlQXJyYXkob2JqKXtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KT0+e3JldHVybiBvYmpba2V5XX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uVGFwKCkge1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyLS07XG4gICAgICAgICAgIGZpcmViYXNlLnB1c2goXG4gICAgICAgICAgICAgICAnL3VzZXJzJyxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdmZXJuYW5tYycsXG4gICAgICAgICAgICAgICAgIGVtYWlsOiBcImZlcm5hbmRvbWFzZXJvQGdtYWlsLmNvbVwiLFxuICAgICAgICAgICAgICAgICBwYXNzd29yZDogXCJhbGdvXCJcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZWQga2V5XCIscmVzdWx0LmtleSk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuY3JlYXRlIGVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLyogIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICAgICAgICAgICAgZW1haWw6IFwiZmVybmFuZG9tYXNlcm93QGdtYWlsLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwibWlzcGFzc3dvcmRcIlxuICAgICAgICAgICAgICB9KS50aGVuKCAodXNlcikgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIodXNlcik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBjcmVhbmRvIGVsIGJpY2hvXCIrIGVycm9yKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gKTsqL1xuICAgICAgICB9XG4gICAgICAgIGxvZ2luRW1haWwoKXtcbiAgICAgICAgICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICAgICAgICAgICAgICB0eXBlOmZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IFwiZmVybmFuZG9tYXNlcm9AZ21haWwuY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBcInVucGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmxvZ2luVHh0ID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJ1c3VhcmlvIGxvZ3VlYWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcInVzZXJJRDogXCIrcmVzdWx0LnVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2Upe1xuICAgICAgICAgICAgICAgICAgLy8gIHRoaXMubG9naW5UeHQgPSBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiZXJyb3IgY3JlYW5kbyB1c3VhcmlvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImVycm9yOiBcIitlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIiBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUVtYWlsVXNlcigpe1xuICAgICAgICAgICAgZmlyZWJhc2UuY3JlYXRlVXNlcih7XG4gICAgICAgICAgICAgICAgZW1haWw6IFwiZmVybmFuZG9tYXNlcm9AZ21haWwuY29tXCIsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwibWlwYXNzd29yZFwiXG4gICAgICAgICAgICB9KS50aGVuKCBcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcInVzdWFyaW8gY3JlYWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcInVzZXJJRDogXCIrcmVzdWx0LmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3JNZXNzYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJlcnJvciBjcmVhbmRvIHVzdWFyaW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiZXJyb3I6IFwiK2Vycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiIFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc2V0UGFzc3dvcmQoKXtcbiAgICAgICAgICAgIGZpcmViYXNlLnJlc2V0UGFzc3dvcmQoe1xuICAgICAgICAgICAgICAgIHR5cGU6ZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELCAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBcImZlcm5hbmRvbWFzZXJvQGdtYWlsLmNvbVwiXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgLy8gdGhpcy5sb2dpblR4dCA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwidXN1YXJpbyByZXNldGVhZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwicmVjaWJpcmEgdW4gY29ycmVvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3JNZXNzYWdlKXtcbiAgICAgICAgICAgICAgICAgIC8vICB0aGlzLmxvZ2luVHh0ID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFsZ28gZnVlIG1hbFwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5vIHJlY2liaXJhIHVuIGNvcnJlb1wiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50VXNlcigpe1xuICAgICAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKFxuICAgICAgICAgICAgICAgICh1c2VyKT0+e1xuICAgICAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3JNZXNzYWdlKT0+e1xuICAgICAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShlcnJvck1lc3NhZ2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG59XG4iXX0=