## Integrating with CkEditor

It's possible to setup a callback to be invoked when one start editing one of the pages
within the product being edited:



Also it exposes some methods thru ```window.evoluttree.api``` object.

```
<!-- ... -->
<!-- Load ckeditor previously -->
<script src="http://domain.com/ckeditor/ckeditor.js"></script>
<!-- ... -->

<script>
    // general application settings
    var evltree_config = {
            onStartEditPageBody: function(elementId, pageInfo) {
                var ckEditorInstance = CKEDITOR.replace(elementId);

                ckEditorInstance.on('blur', function(e) {
                    window.evoluttree.api.modifyPage( pageInfo.localId, {body: ckEditorInstance.getData()} )
                });
            }
    };

    // product being edited
    var evltree_editing_product = null;
</script>

<!-- ... -->
<!-- Load Evoluttree here -->
<script src="evoluttree-script.js"></script>
<!-- ... -->

```


