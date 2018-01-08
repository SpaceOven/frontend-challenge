import * as angular from "angular";
import { ContactService } from "../contact-service";
import { Contact } from "../contact";
import { StateService } from "@uirouter/angularjs";
import { ContactViewMessages, ErrorDialogMessages } from "../../../app-constants";
import { LoadingService } from "../../../shared/loading-screen/loading-service";
import { ErrorDialogService } from "../../../shared/error-dialog/error-dialog-service";

interface ContactListScope extends ng.IScope {
    contacts: any;
    messages: any;
}

class ContactListController {

    constructor(private $scope: ContactListScope, 
                private loadingService: LoadingService,
                private contactService: ContactService,
                private errorDialogService: ErrorDialogService,
                private $state: StateService) {

        this.$scope.messages = ContactViewMessages;
        this.listContacts();
    }

    private listContacts = () => {
        this.loadingService.start()
        this.contactService.fetchAll()
            .then((contacts: Contact[]) => {
                this.$scope.contacts = contacts;
            }).catch((error: Error) => {
                this.errorDialogService.displayError(error, ErrorDialogMessages.BUTTON_TEXT_TRY_AGAIN)
                .then(this.listContacts)
            }).then(this.loadingService.stop);
    }
}

angular.module("appModule").controller("contactListController", ContactListController);