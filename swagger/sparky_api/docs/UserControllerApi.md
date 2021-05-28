# SparkyserviceApi.UserControllerApi

All URIs are relative to *http://147.172.178.30:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createLocalUser**](UserControllerApi.md#createLocalUser) | **PUT** /api/v1/users | Adds a new local user
[**deleteUser**](UserControllerApi.md#deleteUser) | **DELETE** /api/v1/users/{realm}/{username} | Deletes a user
[**editUser**](UserControllerApi.md#editUser) | **PATCH** /api/v1/users | Edits users (in any realm)
[**getAllUsers**](UserControllerApi.md#getAllUsers) | **GET** /api/v1/users | Gets all users from all supported realms
[**getAllUsersFromRealm**](UserControllerApi.md#getAllUsersFromRealm) | **GET** /api/v1/users/{realm} | Gets all users from a single realm
[**getUser**](UserControllerApi.md#getUser) | **GET** /api/v1/users/{realm}/{username} | Gets a unique user

<a name="createLocalUser"></a>
# **createLocalUser**
> UserDto createLocalUser(body)

Adds a new local user

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.UserControllerApi();
let body = new SparkyserviceApi.UsernameDto(); // UsernameDto | 

apiInstance.createLocalUser(body, (error, data, response) => {
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
 **body** | [**UsernameDto**](UsernameDto.md)|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

<a name="deleteUser"></a>
# **deleteUser**
> deleteUser(realm, username)

Deletes a user

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.UserControllerApi();
let realm = "realm_example"; // String | 
let username = "username_example"; // String | 

apiInstance.deleteUser(realm, username, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **realm** | **String**|  | 
 **username** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="editUser"></a>
# **editUser**
> UserDto editUser(body)

Edits users (in any realm)

Edit and return the new user

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.UserControllerApi();
let body = new SparkyserviceApi.UserDto(); // UserDto | 

apiInstance.editUser(body, (error, data, response) => {
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
 **body** | [**UserDto**](UserDto.md)|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

<a name="getAllUsers"></a>
# **getAllUsers**
> [UserDto] getAllUsers()

Gets all users from all supported realms

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.UserControllerApi();
apiInstance.getAllUsers((error, data, response) => {
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

[**[UserDto]**](UserDto.md)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

<a name="getAllUsersFromRealm"></a>
# **getAllUsersFromRealm**
> [UserDto] getAllUsersFromRealm(realm)

Gets all users from a single realm

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.UserControllerApi();
let realm = "realm_example"; // String | 

apiInstance.getAllUsersFromRealm(realm, (error, data, response) => {
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
 **realm** | **String**|  | 

### Return type

[**[UserDto]**](UserDto.md)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

<a name="getUser"></a>
# **getUser**
> UserDto getUser(realm, username)

Gets a unique user

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.UserControllerApi();
let realm = "realm_example"; // String | 
let username = "username_example"; // String | 

apiInstance.getUser(realm, username, (error, data, response) => {
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
 **realm** | **String**|  | 
 **username** | **String**|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

