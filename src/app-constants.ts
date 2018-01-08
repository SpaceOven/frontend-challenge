import * as angular from "angular";

export enum ContactApiConfig {
    REST_URL = "http://api.pipz.io/v1",
    CONTACT_NAMESPACE = "contact",
    API_KEY = "a50ebd9fa5fae19f13890a",
    API_SECRET = "513c9cb9b73ccc76ad",
    AUTH_BASIC_PREFIX = "Basic "
}

export enum RequestMessages {    
    NO_INTERNET_CONNECTION = "A conexão com a internet foi perdida. Por favor, verifique sua rede e tente novamente.",
    NOT_FOUND = "O contato que você procura não foi encontrado.",
    DEFAULT_ERROR = "Ocorreu um erro inesperado ao tentar realizar a operação.",
}
export enum ContactViewMessages {
    CREATE_CONTACT = "Novo Contato",
    UPDATE_CONTACT = "Atualizar Informações de Contato",
    CONTACT_NAME = "Nome",
    CONTACT_EMAIL = "Email",
    CONTACT_TWITTER = "Twitter",
    CONTACT_PHONE = "Telefone",
    UNKNOWN = "(Não Informado)",
    CREATE = "Novo",
    DETAILS = "Detalhes",
    DELETE = "Remover",
    SAVE = "Salvar",
    CANCEL = "Cancelar",
}

export enum ContactValidationMessages {
    REQUIRED_FIELD = "Este campo é obrigatório.",
    INVALID_EMAIL = "O email precisa de um formato válido. (Exemplo: pessoa@email.com).",
    INVALID_NAME = "O nome deve ter no máximo 100 caracteres.",
    INVALID_PHONE = "O número de telefone precisa de um formato válido. (Exemplo: (48) 55555-5555).",
    INVALID_TWITTER = "Cole aqui a URL do seu twitter. (Exemplo: https://twitter.com/pipz)",
}

export enum RemoveContactModalMessages {
    TITLE = "Remover Contato",
    TEXT_CONTENT = "Deseja mesmo remover este contato?",
    CONFIRM = "Confirmar",
    CANCEL = "Cancelar",
}

export enum LoadingMessages {
    DEFAULT = "Carregando...",
    SAVING_NEW_CONTACT = "Salvando novo contato, Por favor, aguarde...",
    UPDATING_CONTACT = "Atualizando o contato. Por favor, aguarde...",
    REMOVING_CONTACT = "Removendo o contato. Por favor, aguarde...",
}

export enum ErrorDialogMessages {
    DEFAULT_BUTTON_TEXT = "Ok",
    BUTTON_TEXT_TRY_AGAIN = "Tentar Novamente",
    TITLE = "Ocorreu um erro",
}

export enum AllowedContactFields {
    ID = "id",
    NAME = "name",
    EMAIL = "email",
    PHONE = "phone",
    TWITTER = "twitter",
}