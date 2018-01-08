import * as angular from "angular";
import * as ng from "angular";
import { ContactService } from "./components/contact/contact-service";

const appModule = angular.module("appModule", ["ui.router", "restangular", "ngMaterial", "ngSanitize"]);

appModule.config((
            $mdIconProvider: angular.material.IIconProvider, 
            $mdThemingProvider: angular.material.IThemingProvider,
            $stateProvider: any, 
            $urlRouterProvider: any) => {
        $stateProvider
        .state("home", {
            url: "/home",
            data: { "selectedItem": "home" },
            controller: "contactListController",
            templateUrl: "contact/list/contact-list-partial.html"
        }).state("updateContact", {
            url: "/contact/:id/update",
            controller: "contactFormController",
            templateUrl: "contact/form/contact-form-partial.html"
        }).state("createContact", {
            url: "/contact/create",
            data: { "selectedItem": "createContact" },
            controller: "contactFormController",
            templateUrl: "contact/form/contact-form-partial.html"
        }).state("viewContact", {
            url: "/contact/:id",
            controller: "contactViewController",
            templateUrl: "contact/view/contact-view-partial.html"
        });
        $urlRouterProvider.otherwise('/home')

        $mdIconProvider
            .defaultIconSet("./svg/avatars.svg", 128)
            .icon("menu", "./svg/menu.svg", 18)
            .icon("add", "./svg/ic_add_circle_white_18px.svg", 18)
            .icon("save", "./svg/ic_cloud_done_white_18px.svg", 18)
            .icon("error", "./svg/ic_error_white_18px.svg", 18)
            .icon("feedback", "./svg/ic_feedback_white_18px.svg", 18)
            .icon("home", "./svg/ic_home_white_18px.svg", 18)
            .icon("details", "./svg/ic_info_white_18px.svg", 18)
            .icon("add_info", "./svg/ic_note_add_white_18px.svg", 18)
            .icon("add_contact", "./svg/ic_person_add_white_18px.svg", 18)
            .icon("contact", "./svg/ic_person_white_18px.svg", 18)
            .icon("remove", "./svg/ic_remove_circle_white_18px.svg", 18)
            .icon("email", "./svg/ic_email_white_18px.svg", 18)
            .icon("contact_dark", "./svg/ic_person_black_18px.svg", 18)
            .icon("contact_dark_big", "./svg/ic_person_black_48px.svg", 48)
            ;

        $mdThemingProvider
            .theme("default")
            .primaryPalette("deep-purple")
            .accentPalette("grey");
    }
);

appModule.run(($rootScope: angular.IRootScopeService) => {
    
});

export { appModule };