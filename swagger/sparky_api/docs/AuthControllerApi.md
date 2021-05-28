# SparkyserviceApi.AuthControllerApi

All URIs are relative to *http://147.172.178.30:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authenticate**](AuthControllerApi.md#authenticate) | **POST** /api/v1/authenticate | Authentication / Login
[**checkTokenAuthenticationStatus**](AuthControllerApi.md#checkTokenAuthenticationStatus) | **GET** /api/v1/authenticate/check | 
[**verifyTokenValidity**](AuthControllerApi.md#verifyTokenValidity) | **GET** /api/v1/authenticate/verify | 

<a name="authenticate"></a>
# **authenticate**
> AuthenticationInfoDto authenticate(body)

Authentication / Login

Authenticates the user and sets a JWT into the authorization header

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';

let apiInstance = new SparkyserviceApi.AuthControllerApi();
let body = new SparkyserviceApi.CredentialsDto(); // CredentialsDto | 

apiInstance.authenticate(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**CredentialsDto**](CredentialsDto.md)|  | 

### Return type

[**AuthenticationInfoDto**](AuthenticationInfoDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*, application/json

<a name="checkTokenAuthenticationStatus"></a>
# **checkTokenAuthenticationStatus**
> AuthenticationInfoDto checkTokenAuthenticationStatus()



Checks the authentication state of the users authorization header and returns all  user informations which belongs to the user

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.AuthControllerApi();
apiInstance.checkTokenAuthenticationStatus((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**AuthenticationInfoDto**](AuthenticationInfoDto.md)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json

<a name="verifyTokenValidity"></a>
# **verifyTokenValidity**
> AuthenticationInfoDto verifyTokenValidity(jwtToken)



Prints the validity status of a given token

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.AuthControllerApi();
let jwtToken = "jwtToken_example"; // String | 

apiInstance.verifyTokenValidity(jwtToken, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **jwtToken** | **String**|  | 

### Return type

[**AuthenticationInfoDto**](AuthenticationInfoDto.md)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

