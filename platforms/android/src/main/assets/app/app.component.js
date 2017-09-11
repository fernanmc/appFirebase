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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQXdFO0FBRXhFLHFEQUF1RDtBQUV2RCxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRy9CLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXZELDJEQUEyRDtBQVEzRDtJQVNJLHNCQUFvQixJQUFVLEVBQVUsTUFBYztRQUF0RCxpQkEwQkM7UUExQm1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUC9DLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsVUFBSyxHQUFVLE1BQU0sQ0FBQztRQU96QixRQUFRLENBQUMscUJBQXFCLENBQUMsVUFBQyxNQUFVO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNaLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osa0JBQWtCLEVBQUUsVUFBUyxJQUFJO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUNkLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixDQUFDO1lBQ0wsQ0FBQztTQUVKLENBQUM7UUFDSDs7Ozs7Ozs7OzthQVVLO0lBQ1IsQ0FBQztJQUVHLHNCQUFXLGlDQUFPO2FBQWxCO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENB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Q0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1lBQ0osdUJBQXVCO1FBQzFCLENBQUMsRUFDRCxVQUFTLFlBQVk7WUFDbkIsaUNBQWlDO1lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1osS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQztRQUNILENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUMxQixVQUFDLElBQUk7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFDRCxVQUFDLFlBQVk7WUFDVCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXROSSxZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7eUNBVzRCLFdBQUksRUFBa0IsYUFBTTtPQVQ3QyxZQUFZLENBdU54QjtJQUFELG1CQUFDO0NBQUEsQUF2TkQsSUF1TkM7QUF2Tlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5cblxudmFyIGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbi8vbGV0IF91cmwgPSBcImh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS9wb3N0cy9cIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICAgIFxuICAgIHB1YmxpYyBjb3VudGVyOiBudW1iZXIgPSAxNjtcbiAgICBwdWJsaWMgdGl0bGU6c3RyaW5nID0gXCJ0ZXh0XCI7XG4gICAgcHVibGljIGNoYXQ6c3RyaW5nO1xuICAgIHB1YmxpYyByZXBlYXRlcjogYW55O1xuICAgIHB1YmxpYyBsb2dpblR4dDpzdHJpbmc7XG4gICAgcHVibGljIGxpc3RlbmVyOmFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSl7XG4gICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcigocmVzdWx0OmFueSk9PntcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMub25RdWVyeUV2ZW50KHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgXCIvdXNlcnNcIik7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSB7XG4gICAgICAgICAgICBvbkF1dGhTdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIFwiK2RhdGEubG9nZ2VkSW4pO1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubG9nZ2VkSW4pe1xuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLnVzZXIuZW1haWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAvKiBmaXJlYmFzZS5hZGRPbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrKCAvLyBlc3RvIHNvbG8gc2UgdXNhIHBhcmEgbW5zYWplc1xuICAgICAgICAgICAgKChtZXNzYWdlKT0+eyAvL2FxdWkgc29icmFcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lbnNhamUgY2FiZXppXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKT0+e1xuICAgICAgICAgICAgICAgICAgdmFyIGpzb25SZXNwb25zZTphbnk7XG4gICAgICAgICAgICAgICAgICBqc29uUmVzcG9uc2UgPSBtZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IEpTT04uc3RyaW5naWZ5KGpzb25SZXNwb25zZS50ZXh0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7Ki9cbiAgICB9XG5cbiAgICAgICAgcHVibGljIGdldCBtZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudGVyID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50ZXIgKyBcIiB0YXBzIGxlZnRcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiSG9vcnJhYWF5ISBcXG5Zb3UgYXJlIHJlYWR5IHRvIHN0YXJ0IGJ1aWxkaW5nIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmdPbkluaXQoKXtcblxuICAgICAgICAgICAgZmlyZWJhc2UuYWRkQXV0aFN0YXRlTGlzdGVuZXIodGhpcy5saXN0ZW5lcik7XG4gICAgICAgICAgICBmaXJlYmFzZS5yZW1vdmVBdXRoU3RhdGVMaXN0ZW5lcih0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgICAgIGZpcmViYXNlLmhhc0F1dGhTdGF0ZUxpc3RlbmVyKHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgLy9cImh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS9wb3N0cy9cIjtcbiAgICAgICAgICAgLyogdGhpcy5odHRwLmdldChcImh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS9wb3N0cy8xXCIpLlxuICAgICAgICAgICAgc3Vic2NyaWJlKChyZXM6IFJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhc2UgcG9yIGxhIHJ1blwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG15UmVzcG9uc2Vqc29uID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IG15UmVzcG9uc2Vqc29uLnRpdGxlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlcy5qc29uKCkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICAgLy8gICB0aGlzLnRyYWVyRGF0b3NGaXJlYmFzZSgpO1xuICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cmFlckRhdG9zRmlyZWJhc2UoKXtcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgICAgIHRoaXMub25RdWVyeUV2ZW50LFxuICAgICAgICAgICAgICAgIFwiL3VzZXJzXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6e1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBvblF1ZXJ5RXZlbnQocmVzdWx0KXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdFwiKTtcbiAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgIGlmKHJlc3VsdC5lcnJvcil7XG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdC52YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5jaGF0ID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICBsZXQgbmV3QXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdGVyID0gdGhpcy5nZW5lcmF0ZUFycmF5KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAvKiAgZm9yKHZhciBpPTA7IGk8IHRoaXMucmVwZWF0ZXIubGVuZ2h0O2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcnJheS5wdXNoKHRoaXMuZ2VuZXJhdGVBcnJheSh0aGlzLnJlcGVhdGVyW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdlbmVyYXRlQXJyYXkodGhpcy5yZXBlYXRlcltpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwZWF0ZXI9IG5ld0FycmF5OyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZW5lcmF0ZUFycmF5KG9iail7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGtleSk9PntyZXR1cm4gb2JqW2tleV19KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblRhcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRlci0tO1xuICAgICAgICAgICBmaXJlYmFzZS5wdXNoKFxuICAgICAgICAgICAgICAgJy91c2VycycsXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZmVybmFubWMnLFxuICAgICAgICAgICAgICAgICBlbWFpbDogXCJmZXJuYW5kb21hc2Vyb0BnbWFpbC5jb21cIixcbiAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwiYWxnb1wiXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGVkIGtleVwiLHJlc3VsdC5rZXkpO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmNyZWF0ZSBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8qICBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcbiAgICAgICAgICAgICAgICAgIGVtYWlsOiBcImZlcm5hbmRvbWFzZXJvd0BnbWFpbC5jb21cIixcbiAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBcIm1pc3Bhc3N3b3JkXCJcbiAgICAgICAgICAgICAgfSkudGhlbiggKHVzZXIpID0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHVzZXIpO1xuICAgICAgICAgICAgfSwgKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgY3JlYW5kbyBlbCBiaWNob1wiKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9ICk7Ki9cbiAgICAgICAgfVxuICAgICAgICBsb2dpbkVtYWlsKCl7XG4gICAgICAgICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgICAgICAgICAgdHlwZTpmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBcImZlcm5hbmRvbWFzZXJvQGdtYWlsLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogXCJ1bnBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgLy8gdGhpcy5sb2dpblR4dCA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwidXN1YXJpbyBsb2d1ZWFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJ1c2VySUQ6IFwiK3Jlc3VsdC51aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3JNZXNzYWdlKXtcbiAgICAgICAgICAgICAgICAgIC8vICB0aGlzLmxvZ2luVHh0ID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImVycm9yIGNyZWFuZG8gdXN1YXJpb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJlcnJvcjogXCIrZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCIgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVFbWFpbFVzZXIoKXtcbiAgICAgICAgICAgIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiBcImZlcm5hbmRvbWFzZXJvQGdtYWlsLmNvbVwiLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBcIm1pcGFzc3dvcmRcIlxuICAgICAgICAgICAgfSkudGhlbiggXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJ1c3VhcmlvIGNyZWFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJ1c2VySUQ6IFwiK3Jlc3VsdC5rZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZSl7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiZXJyb3IgY3JlYW5kbyB1c3VhcmlvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImVycm9yOiBcIitlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIiBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNldFBhc3N3b3JkKCl7XG4gICAgICAgICAgICBmaXJlYmFzZS5yZXNldFBhc3N3b3JkKHtcbiAgICAgICAgICAgICAgICB0eXBlOmZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCwgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogXCJmZXJuYW5kb21hc2Vyb0BnbWFpbC5jb21cIlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubG9naW5UeHQgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcInVzdWFyaW8gcmVzZXRlYWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcInJlY2liaXJhIHVuIGNvcnJlb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZSl7XG4gICAgICAgICAgICAgICAgICAvLyAgdGhpcy5sb2dpblR4dCA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBbGdvIGZ1ZSBtYWxcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJObyByZWNpYmlyYSB1biBjb3JyZW9cIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFVzZXIoKXtcbiAgICAgICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbihcbiAgICAgICAgICAgICAgICAodXNlcik9PntcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yTWVzc2FnZSk9PntcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3JNZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxufVxuIl19