import { API_PASSWORD, API_USERNAME } from "../_services/axiousURL";

export function FormDataHelper() {

    var bodyFormData = new FormData();
    bodyFormData.append(
        'api_username', API_USERNAME
    );
    bodyFormData.append(
        'api_password', API_PASSWORD
    );

    return bodyFormData;
    
}