# API Calls

For any api call use the `api` axios instance from `/managers/api-manager.ts`, which automatically handle the following:

- Add base api url
- Add auth key and account token to request header
- Handle 401 response to logout user
- Log the request and response

Available endpoint saved in `enums/api.enum.ts`
