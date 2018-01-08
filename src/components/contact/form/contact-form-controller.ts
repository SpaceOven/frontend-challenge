import * as angular from "angular";
import { ContactService } from "../contact-service";
import { Contact } from "../contact";
import { StateParams, StateService } from "@uirouter/angularjs";
import {ContactValidationMessages, 
        ContactViewMessages, 
        LoadingMessages,
        RemoveContactModalMessages} from "../../../app-constants";
import { LoadingService } from "../../../shared/loading-screen/loading-service";
import { ErrorDialogService } from "../../../shared/error-dialog/error-dialog-service";

interface ContactFormScope extends ng.IScope {
    contact: Contact;
    messages: any;
    validationMessages: any;
    isSaving: boolean;
    initDelete(event: any): void;
    save(contactForm: ng.IFormController, contact: Contact): void;
}

class ContactFormController {
    
    constructor(private $stateParams: StateParams,
                private $state: StateService,
                private $scope: ContactFormScope,
                private errorDialogService: ErrorDialogService,
                private loadingService: LoadingService,
                private $mdDialog: ng.material.IDialogService,
                private contactService: ContactService) {

        this.$scope.messages = ContactViewMessages;
        this.$scope.validationMessages = ContactValidationMessages;
        this.$scope.initDelete = this.initDelete;
        this.$scope.save = this.save;
        
        if ($stateParams.id) {
            loadingService.start()
            this.contactService.fetchOne($stateParams.id)
                .then((contact: Contact) => {
                    this.$scope.contact = contact;
                }).catch((error: Error) => {
                    this.loadingService.stop();
                    // Há um problema com o restangular onde a response é transformada no caminho.
                    // this.errorDialogService.displayError(error).then(this.goHome);
                }).then(this.loadingService.stop);
        } else {
            this.$scope.contact = new Contact();
        }
    }

    public initDelete = (event: any) => {
        var confirm: ng.material.IConfirmDialog = this.$mdDialog.confirm()
              .title(RemoveContactModalMessages.TITLE)
              .textContent(RemoveContactModalMessages.TEXT_CONTENT)
              .targetEvent(event)
              .ok(RemoveContactModalMessages.CONFIRM)
              .cancel(RemoveContactModalMessages.CANCEL);
        this.$mdDialog.show(confirm).then(() => {
            this.doDelete(this.$scope.contact);
        });
    }

    public save = (contactForm: ng.IFormController, contact: Contact) => {
        if (contact.id && contactForm.$valid) {
            this.doUpdate(contact);
        } else if (contactForm.$valid) {
            this.doSave(contact);
        }
    }

    private doSave(contact: Contact) {
        this.loadingService.start(LoadingMessages.SAVING_NEW_CONTACT);
        this.contactService.create(contact)
            .then(this.goHome)
            .catch((error: any) => {
                console.log("É possível");
                this.loadingService.stop();
                this.errorDialogService.displayError(error);
            })
    }

    private doUpdate(contact: Contact) {
        this.loadingService.start(LoadingMessages.UPDATING_CONTACT);
        this.contactService.update(contact)
            .then(this.goHome)
            .catch((error: any) => {
                this.loadingService.stop();
                this.errorDialogService.displayError(error);
            });
    }   
    
    private doDelete(contact: Contact) {
        this.loadingService.start(LoadingMessages.REMOVING_CONTACT);
        this.contactService.delete(contact)
            .then(this.goHome);;
    }

    private goHome = () => {
        this.$state.go("home");
    }
}

angular.module("appModule").controller("contactFormController", ContactFormController);