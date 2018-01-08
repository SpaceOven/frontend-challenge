import * as angular from "angular";
import { ContactService } from "../contact-service";
import { Contact } from "../contact";
import { StateService } from "@uirouter/angularjs";
import { ContactViewMessages } from "../contact-constants";
import { LoadingService } from "../../../shared/loading-screen/loading-service";

interface ContactListScope extends ng.IScope {
    contacts: any;
    messages: any;
    initDelete(id: number): void;
}

class ContactListController {

    constructor(private $scope: ContactListScope, 
                private loadingService: LoadingService,
                private contactService: ContactService,
                private $state: StateService) {

        this.$scope.initDelete = this.initDelete;
        this.$scope.messages = ContactViewMessages;
        
        loadingService.start()
        this.contactService.fetchAll()
            .then((contacts: Contact[]) => {
                this.$scope.contacts = contacts;
            }).catch((error: any) => {
                console.log("Erro:" + JSON.stringify(error));
            }).then(loadingService.stop);
    }

    public initDelete = (id: number) => {
        
    }
}

angular.module("appModule").controller("contactListController", ContactListController);