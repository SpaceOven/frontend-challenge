import * as angular from "angular";
import { StateService } from "@uirouter/angularjs";
import { ErrorDialogMessages } from "../../app-constants";

export class ErrorDialogService {

    constructor(private $mdDialog: ng.material.IDialogService,
                private $state: StateService) {}

    public displayError = (error: Error, closeButtonText = ErrorDialogMessages.DEFAULT_BUTTON_TEXT) => {
        return this.$mdDialog.show(
            this.$mdDialog.confirm()
              .clickOutsideToClose(true)
              .title(ErrorDialogMessages.TITLE)
              .textContent(error.message)
              .ok(closeButtonText)
          );
    }
}

angular.module("appModule").service("errorDialogService", ErrorDialogService);