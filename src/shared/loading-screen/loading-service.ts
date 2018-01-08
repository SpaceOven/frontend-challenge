import * as angular from "angular";

export class LoadingService {
    constructor(private $mdDialog: ng.material.IDialogService) {}

    public start = (message?: string) => {
      this.$mdDialog.show({
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