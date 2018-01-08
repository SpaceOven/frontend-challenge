import * as angular from "angular";
import { IService, IProvider } from "restangular";
import { ContactApiConfig } from "./contact-constants";
import { Base64 } from "js-base64";

const buildCredentials = (): string => {
  return ContactApiConfig.AUTH_BASIC_PREFIX + Base64.encode(
    ContactApiConfig.API_KEY + ":" + ContactApiConfig.API_SECRET
  );
}

angular.module("appModule")
  .service("contactApiService", (Restangular: IService): IService => {
    return Restangular.withConfig((RestangularConfigurer: IProvider) => {
      RestangularConfigurer.setFullResponse(true)
                           .setBaseUrl(ContactApiConfig.REST_URL)
                           .setDefaultHeaders({Authorization: buildCredentials()});
    });
});