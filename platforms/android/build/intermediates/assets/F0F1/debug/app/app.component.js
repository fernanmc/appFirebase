"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
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
    AppComponent.prototype.onTap = function () {
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
        }).then(function (user) {
            console.dir(user);
        }, function (error) {
            console.log("Error creando el bicho" + error);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFVdkQ7SUFMQTtRQU9XLFlBQU8sR0FBVyxFQUFFLENBQUM7SUFzQ2hDLENBQUM7SUFwQ08sc0JBQVcsaUNBQU87YUFBbEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztZQUN2QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLCtDQUErQyxDQUFDO1lBQzNELENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVNLDRCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEI7Ozs7Ozs7Ozs7Ozs7O2VBY087UUFFSixRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ2hCLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsUUFBUSxFQUFFLGFBQWE7U0FDMUIsQ0FBQyxDQUFDLElBQUksQ0FBRSxVQUFDLElBQUk7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWpELENBQUMsQ0FBRSxDQUFDO0lBQ1IsQ0FBQztJQXZDSSxZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7T0FFVyxZQUFZLENBd0N4QjtJQUFELG1CQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7QUF4Q1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xudmFyIGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgXG4gICAgcHVibGljIGNvdW50ZXI6IG51bWJlciA9IDE2O1xuICAgIFxuICAgICAgICBwdWJsaWMgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291bnRlciArIFwiIHRhcHMgbGVmdFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJIb29ycmFhYXkhIFxcbllvdSBhcmUgcmVhZHkgdG8gc3RhcnQgYnVpbGRpbmchXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBvblRhcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRlci0tO1xuICAgICAgICAgICAvKiBmaXJlYmFzZS5wdXNoKFxuICAgICAgICAgICAgICAgJy91c2VycycsXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZmVybmFubWMnLFxuICAgICAgICAgICAgICAgICBlbWFpbDogXCJmZXJuYW5kb21hc2Vyb0BnbWFpbC5jb21cIixcbiAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwiYWxnb1wiXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGVkIGtleVwiLHJlc3VsdC5rZXkpO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmNyZWF0ZSBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7Ki9cblxuICAgICAgICAgICAgICBmaXJlYmFzZS5DcmVhdGVVc2VyKHtcbiAgICAgICAgICAgICAgICAgIGVtYWlsOiBcImZlcm5hbmRvbWFzZXJvQGdtYWlsLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwibWlzcGFzc3dvcmRcIlxuICAgICAgICAgICAgICB9KS50aGVuKCAodXNlcikgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIodXNlcik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBjcmVhbmRvIGVsIGJpY2hvXCIrIGVycm9yKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfVxufVxuIl19