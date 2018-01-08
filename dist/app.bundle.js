webpackJsonp([0],[,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});!function(e){e.REST_URL="http://api.pipz.io/v1",e.CONTACT_NAMESPACE="contact",e.API_KEY="a50ebd9fa5fae19f13890a",e.API_SECRET="513c9cb9b73ccc76ad",e.AUTH_BASIC_PREFIX="Basic "}(t.ContactApiConfig||(t.ContactApiConfig={}));!function(e){e.NO_INTERNET_CONNECTION="A conexão com a internet foi perdida. Por favor, verifique sua rede e tente novamente.",e.NOT_FOUND="O contato que você procura não foi encontrado.",e.DEFAULT_ERROR="Ocorreu um erro inesperado ao tentar realizar a operação."}(t.RequestMessages||(t.RequestMessages={}));!function(e){e.CREATE_CONTACT="Novo Contato",e.UPDATE_CONTACT="Atualizar Informações de Contato",e.CONTACT_NAME="Nome",e.CONTACT_EMAIL="Email",e.CONTACT_TWITTER="Twitter",e.CONTACT_PHONE="Telefone",e.UNKNOWN="(Nome Não Informado)",e.CREATE="Novo",e.DETAILS="Detalhes",e.DELETE="Remover",e.SAVE="Salvar",e.CANCEL="Cancelar"}(t.ContactViewMessages||(t.ContactViewMessages={}));!function(e){e.REQUIRED_FIELD="Esse campo é obrigatório.",e.INVALID_EMAIL="O email precisa de um formato válido. (Exemplo: pessoa@email.com).",e.INVALID_NAME="O nome deve ter no máximo 100 caracteres.",e.INVALID_PHONE="O número de telefone precisa de um formato válido. (Exemplo: (48) 55555-5555).",e.INVALID_TWITTER="URL inválida, cole aqui a URL do seu twitter. (Exemplo: https://twitter.com/pipz)"}(t.ContactValidationMessages||(t.ContactValidationMessages={}));!function(e){e.TITLE="Remover Contato",e.TEXT_CONTENT="Deseja mesmo remover este contato?",e.CONFIRM="Confirmar",e.CANCEL="Cancelar"}(t.RemoveContactModalMessages||(t.RemoveContactModalMessages={}));!function(e){e.DEFAULT="Carregando...",e.SAVING_NEW_CONTACT="Salvando novo contato, Por favor, aguarde...",e.UPDATING_CONTACT="Atualizando o contato. Por favor, aguarde...",e.REMOVING_CONTACT="Removendo o contato. Por favor, aguarde..."}(t.LoadingMessages||(t.LoadingMessages={}));!function(e){e.DEFAULT_BUTTON_TEXT="Ok",e.BUTTON_TEXT_TRY_AGAIN="Tentar Novamente",e.TITLE="Ocorreu um erro"}(t.ErrorDialogMessages||(t.ErrorDialogMessages={}));!function(e){e.ID="id",e.NAME="name",e.EMAIL="email",e.PHONE="phone",e.TWITTER="twitter"}(t.AllowedContactFields||(t.AllowedContactFields={}))},,,,,,,,,,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=n.module("appModule",["ui.router","restangular","ngMaterial","ngSanitize"]);t.appModule=i,i.config(function(e,t,o,n){o.state("home",{url:"/home",data:{selectedItem:"home"},controller:"contactListController",templateUrl:"contact/list/contact-list-partial.html"}).state("updateContact",{url:"/contact/:id/update",controller:"contactFormController",templateUrl:"contact/form/contact-form-partial.html"}).state("createContact",{url:"/contact/create",data:{selectedItem:"createContact"},controller:"contactFormController",templateUrl:"contact/form/contact-form-partial.html"}).state("viewContact",{url:"/contact/:id",controller:"contactViewController",templateUrl:"contact/view/contact-view-partial.html"}),n.otherwise("/home"),e.icon("feedback","./svg/ic_feedback_white_18px.svg",18).icon("home","./svg/ic_home_white_18px.svg",18).icon("add_contact","./svg/ic_person_add_white_18px.svg",18).icon("contact","./svg/ic_person_white_18px.svg",18).icon("email","./svg/ic_email_white_18px.svg",18).icon("contact_dark","./svg/ic_person_black_18px.svg",18).icon("contact_dark_big","./svg/ic_person_black_48px.svg",48),t.theme("default").primaryPalette("deep-purple").accentPalette("grey")}),i.run(function(e){})},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=o(1),a=o(6),r=function(){return i.ContactApiConfig.AUTH_BASIC_PREFIX+a.Base64.encode(i.ContactApiConfig.API_KEY+":"+i.ContactApiConfig.API_SECRET)};n.module("appModule").service("contactApiService",function(e){return e.withConfig(function(e){e.setFullResponse(!0).setBaseUrl(i.ContactApiConfig.REST_URL).setDefaultHeaders({Authorization:r()})})})},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=o(1),a=o(2),r=function(){function e(e){var t=this;this.contactApiService=e,this.fetchOne=function(e){return t.contactApiService.one(i.ContactApiConfig.CONTACT_NAMESPACE,e).get().then(function(e){return e.data},t.handleResponseError)},this.fetchAll=function(){return t.contactApiService.one(i.ContactApiConfig.CONTACT_NAMESPACE).get().then(function(e){return a.map(e.data.objects,function(e){return e})},t.handleResponseError)},this.create=function(e){return t.contactApiService.all(i.ContactApiConfig.CONTACT_NAMESPACE).post(e).then(function(){},t.handleResponseError)},this.update=function(e){return t.contactApiService.one(i.ContactApiConfig.CONTACT_NAMESPACE,e.id).patch(t.filterAllowedFields(e,!1)).then(function(){},t.handleResponseError)},this.delete=function(e){return t.contactApiService.one(i.ContactApiConfig.CONTACT_NAMESPACE,e.id).remove().then(function(){},t.handleResponseError)},this.filterAllowedFields=function(e,t){void 0===t&&(t=!0);var o=[i.AllowedContactFields.NAME,i.AllowedContactFields.EMAIL,i.AllowedContactFields.PHONE,i.AllowedContactFields.TWITTER];return t&&o.push(i.AllowedContactFields.ID),a.pick(e,o)},this.handleResponseError=function(e){switch(console.log(JSON.stringify(e)),e.status){case-1:throw new Error(i.RequestMessages.NO_INTERNET_CONNECTION);case 404:throw new Error(i.RequestMessages.NOT_FOUND);case 400:throw e.data;default:throw new Error(i.RequestMessages.DEFAULT_ERROR)}},e.setErrorInterceptor(function(e,t){console.log("Interceptor -> "+JSON.stringify(e)),console.log("restangularObject -> "+JSON.stringify(t))})}return e}();t.ContactService=r,n.module("appModule").service("contactService",r)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=o(1),a=function(){function e(e,t,o,n,a,r,c){var s=this;this.$stateParams=e,this.$state=t,this.$scope=o,this.errorDialogService=n,this.loadingService=a,this.$mdDialog=r,this.contactService=c,this.initDelete=function(e){var t=s.$mdDialog.confirm().title(i.RemoveContactModalMessages.TITLE).textContent(i.RemoveContactModalMessages.TEXT_CONTENT).targetEvent(e).ok(i.RemoveContactModalMessages.CONFIRM).cancel(i.RemoveContactModalMessages.CANCEL);s.$mdDialog.show(t).then(function(){s.doDelete(s.$scope.contact)})},this.save=function(e,t){t.id&&e.$valid?s.doUpdate(t):e.$valid&&s.doSave(t)},this.goHome=function(){s.$state.go("home")},this.$scope.messages=i.ContactViewMessages,this.$scope.validationMessages=i.ContactValidationMessages,this.$scope.initDelete=this.initDelete,this.$scope.save=this.save,e.id&&(a.start(),this.contactService.fetchOne(e.id).then(function(e){s.$scope.contact=e}).catch(function(e){s.loadingService.stop(),s.errorDialogService.displayError(e).then(s.goHome)}).then(this.loadingService.stop))}return e.prototype.doSave=function(e){var t=this;this.loadingService.start(i.LoadingMessages.SAVING_NEW_CONTACT),this.contactService.create(e).then(this.goHome).catch(function(e){console.log("É possível"),t.loadingService.stop(),t.errorDialogService.displayError(e)})},e.prototype.doUpdate=function(e){var t=this;this.loadingService.start(i.LoadingMessages.UPDATING_CONTACT),this.contactService.update(e).then(this.goHome).catch(function(e){t.loadingService.stop(),t.errorDialogService.displayError(e)})},e.prototype.doDelete=function(e){this.loadingService.start(i.LoadingMessages.REMOVING_CONTACT),this.contactService.delete(e).then(this.goHome)},e}();n.module("appModule").controller("contactFormController",a)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=o(1),a=function(){function e(e,t,o,n,a){var r=this;this.$scope=e,this.loadingService=t,this.contactService=o,this.errorDialogService=n,this.$state=a,this.listContacts=function(){r.loadingService.start(),r.contactService.fetchAll().then(function(e){r.$scope.contacts=e}).catch(function(e){r.errorDialogService.displayError(e,i.ErrorDialogMessages.BUTTON_TEXT_TRY_AGAIN).then(r.listContacts)}).then(r.loadingService.stop)},this.$scope.messages=i.ContactViewMessages,this.listContacts()}return e}();n.module("appModule").controller("contactListController",a)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=o(1),a=function(){function e(e,t){var o=this;this.$mdDialog=e,this.$state=t,this.displayError=function(e,t){return void 0===t&&(t=i.ErrorDialogMessages.DEFAULT_BUTTON_TEXT),o.$mdDialog.show(o.$mdDialog.confirm().clickOutsideToClose(!0).title(i.ErrorDialogMessages.TITLE).textContent(e.message).ok(t))}}return e}();t.ErrorDialogService=a,n.module("appModule").service("errorDialogService",a)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=o(1),a=function(){function e(e){var t=this;this.$mdDialog=e,this.start=function(e){void 0===e&&(e=i.LoadingMessages.DEFAULT),t.$mdDialog.show({locals:{message:e},templateUrl:"./loading-screen/loading-template.html",parent:n.element(document.body),clickOutsideToClose:!1,fullscreen:!1,escapeToClose:!1})},this.stop=function(){t.$mdDialog.cancel()}}return e}();t.LoadingService=a,n.module("appModule").service("loadingService",a)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0})},,,,,,,,,,,,,,function(e,t,o){o(11),o(1),o(18),o(16),o(17),o(12),o(13),o(14),e.exports=o(15)}],[32]);