# SparkyserviceApi.UserDto

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**username** | **String** |  | 
**fullName** | **String** |  | [optional] 
**realm** | **String** |  | 
**passwordDto** | [**ChangePasswordDto**](ChangePasswordDto.md) |  | [optional] 
**settings** | [**SettingsDto**](SettingsDto.md) |  | 
**role** | **String** |  | [optional] 
**expirationDate** | **Date** |  | [optional] 

<a name="RealmEnum"></a>
## Enum: RealmEnum

* `LOCAL` (value: `"LOCAL"`)
* `LDAP` (value: `"LDAP"`)
* `MEMORY` (value: `"MEMORY"`)
* `UNKNOWN` (value: `"UNKNOWN"`)


<a name="RoleEnum"></a>
## Enum: RoleEnum

* `DEFAULT` (value: `"DEFAULT"`)
* `ADMIN` (value: `"ADMIN"`)
* `SERVICE` (value: `"SERVICE"`)

