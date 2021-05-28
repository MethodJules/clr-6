# SparkyserviceApi.RoutingControllerApi

All URIs are relative to *http://147.172.178.30:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**isAlive**](RoutingControllerApi.md#isAlive) | **GET** /api/v1/heartbeat | 
[**route**](RoutingControllerApi.md#route) | **GET** /{path} | 

<a name="isAlive"></a>
# **isAlive**
> isAlive()



Checks if the and API is reachable under /api/v0

### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';

let apiInstance = new SparkyserviceApi.RoutingControllerApi();
apiInstance.isAlive((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="route"></a>
# **route**
> route(path)



### Example
```javascript
import SparkyserviceApi from 'sparkyservice_api';
let defaultClient = SparkyserviceApi.ApiClient.instance;


let apiInstance = new SparkyserviceApi.RoutingControllerApi();
let path = "path_example"; // String | 

apiInstance.route(path, (error, data, response) => {
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
 **path** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearer-key](../README.md#bearer-key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

