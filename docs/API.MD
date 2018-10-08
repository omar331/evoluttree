## Evoluttree's API

Evoluttree exposes some of internal methods throught its API. Once it's loaded, the API methods
are available in

```
window.evoluttree.api.*
```

### Methods

```
window.evoluttree.api.modifyProductTitle(newTitle, preventExternalHooks = true)
```
Modify the title of the product currently being edited.

**arguments**
```newTitle``` *string*  - new title
```preventExternalHooks``` *boolean* (optional) - if it's true, calling this function will not
trigger the hook function

**return**  *void*



```
window.evoluttree.api.modifyPage(localPageId, pageInfo, preventExternalHooks = true)
```

Modify properties of some page.

**arguments**
```localPageId``` *string*  - local id of the page
```pageInfo``` *array*  - new values. Example: ```{title: 'Brand new title'}```.
```preventExternalHooks``` *boolean* (optional) - if it's true, calling this function will not
trigger the hook function


