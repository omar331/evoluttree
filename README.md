# Evoluttree

A ReactJs based, backend agnostic, drag and drop, tree-structured content management system.

Built on top of **ReactJs**, **Redux**, **Immutable**, **React dnd** and other wonders
of javascript's world.

## Some definitions

* **product** a container for diferent types of contents like a main title, description and tree
of nested pages.
* **page** a node in content hierarchy. It contains a title and a body and can have a list
of children pages.


## Application state / Product structure

The application state contains the data about product being edited:

* **general information**, like remote (id), local id (localId) and title
* **page hierarchy**: each page contains a local id (localId), a remote id (id), a title,
      contents and optionally its children pages
* **localId** a locally created id for pages and other elements used by  frontend
* **id** a remotely created id. It's not created by this application, but it's kept inside the state
    for synchronization porposes.

The state is stored as a immutablejs map. Here's a sample showed as a simple JSON object

```
    state = {
        // product being edited
        editing: {
            localId: 'myamazingproduct',
            general: {
                localId: 'myamazingproduct-general',
                id: 123,
                title: 'Awesome product',
                description: 'Let me show how this product is amazing...'
            },
            pages: [
                {
                    id: 1,
                    localId: 'page1',
                    title: 'My first page',
                    content: 'Lorem Ipsum lorem'
                },
                {
                    id: 2,
                    localId: 'page2',
                    title: 'My second page',
                    content: 'Lorem Ipsum lorem',
                    pages: [
                        {
                            id: 21,
                            localId: 'page21',
                            title: 'First child of my second page',
                            content: 'Lorem Ipsum lorem'
                        },
                        {
                            id: 22,
                            localId: 'page22',
                            title: 'Second child of my second page',
                            content: 'Lorem Ipsum lorem'
                        }
                    ]
                }
            ]
        }
    }

```