/**
 * Product being edited
 * @type {{general: {id: number, title: string}, pages: {id: number, title: string, pages: {id: number, title: string}[]}|{id: number, title: string, pages: {id: number, title: string}|{id: number, title: string, body: string}[]}|{id: number, title: string}[]}}
 */
export const editingProduct = {
        general: {
            id: 123,
            title: 'Sample product'
        },
        pages: [
            {
                id: 1,
                title: 'Page One',
                pages: [
                    {id: 11,
                        title: 'Page One One'
                    },
                    {
                        id: 12,
                        title: 'Page One Two'
                    },
                ]
            },
            {
                id: 2,
                title: 'Page Two',
                pages: [
                    {id: 21,
                        title: 'Page Two A'
                    },
                    {
                        id: 22,
                        title: 'Page Two B',
                        body: 'Lorem Ipsum Yeah',
                        pages: [
                            {id: 221,
                                title: 'Page Two B One'
                            },
                            {
                                id: 222,
                                title: 'Page Two B Two'
                            }
                        ]
                    },
                    {
                        id: 23,
                        title: 'Página 2c'
                    }
                ]
            },
            {
                id: 3,
                title: 'Page Three'
            }
        ]
    }
