import * as angular from "angular";
import { LoadingMessages } from "../../app-constants";

export class LoadingService {
    constructor(private $mdDialog: ng.material.IDialogService) {}

    public start = (message = LoadingMessages.DEFAULT) => {
      this.$mdDialog.show({
        locals: { message },
        controller: ($scope, message) => { 
          $scope.message = message;
        },
        templateUrl: "./loading-screen/loading-template.html",
        parent: angular.element(document.body),
        clickOutsideToClose: false,
        fullscreen: false,
        escapeToClose: false,
      });
    }

    public stop = () => {
      this.$mdDialog.cancel();
    }
}

angular.module("appModule").service("loadingService", LoadingService);