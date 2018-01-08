import * as angular from "angular";
import { ContactService } from "../contact-service";
import { Contact } from "../contact";
import { StateParams } from "@uirouter/angularjs";
import { ContactViewMessages } from "../contact-constants";
import { LoadingService } from "../../../shared/loading-screen/loading-service";

interface ContactFormScope extends ng.IScope {
    contact: Contact;
    messages: any;
    isSaving: boolean;
    initDelete(event: any): void;
}

class ContactFormController {
    
    constructor(private $stateParams: StateParams,
                private $scope: ContactFormScope,
                private loadingService: LoadingService,
                private $mdDialog: ng.material.IDialogService,
                private contactService: ContactService) {

        this.$scope.messages = ContactViewMessages;
        this.$scope.initDelete = this.initDelete;
        
        loadingService.start()
        this.contactService.fetchOne($stateParams.id)
            .then((contact: Contact) => {
                this.$scope.contact = contact;
            }).catch((error: any) => {
                console.log("ERRÃO");
                if (error.message) {

                }
            }).then(loadingService.stop);
    }

    public initDelete = (event: any) => {
        var confirm: ng.material.IConfirmDialog = this.$mdDialog.confirm()
              .title("Delete Contact")
              .textContent("Are you sure you want to delete this contact?")
              .ariaLabel("Lucky day")
              .targetEvent(event)
              .ok("Confirm")
              .cancel("Cancel");    
        this.$mdDialog.show(confirm).then(() => {
            this.loadingService.start()
            this.doDelete(this.$scope.contact)
                .then(this.loadingService.stop);
        });
    }

    public save = (contact: Contact) => {
        this.toggleIsSaving();
        if (contact.id) {
            this.doUpdate(contact);
        }
        this.doSave(contact);
    }

    private doSave(contact: Contact) {
        this.contactService.create(contact)
            .catch((error: any) => {

            }).then(this.toggleIsSaving)
    }

    private doUpdate(contact: Contact) {
        return this.contactService.update(contact);
    }   
    
    private doDelete(contact: Contact): Promise<any> {
        return this.contactService.delete(contact);
    }

    private toggleIsSaving = () => {
        this.$scope.isSaving = !this.$scope.isSaving;
    }
}

angular.module("appModule").controller("contactFormController", ContactFormController);