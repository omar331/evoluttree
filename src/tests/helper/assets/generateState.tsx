import { fromJS } from 'immutable';

export const generateState = () => {
    return fromJS({
        editing: {
            localId: 'novoproduto',
            general: {
                localId: 'general',
                id: 123,
                title: 'Novo produto'
            },
            pages: [
                {
                    id: 1,
                    localId: 'pagina1',
                    title: 'Página 1',
                    pages: [
                        {
                            id: 11,
                            localId: 'pagina1a',
                            title: 'Página 1a'
                        },
                        {
                            id: 12,
                            localId: 'pagina1b',
                            title: 'Página 1b'
                        },
                        {
                            id: 13,
                            localId: 'pagina1c',
                            title: 'Página 1c'
                        }
                    ]
                },
                {
                    id: 2, localId: 'pagina2',
                    title: 'Página 2',
                    pages: [
                        {id: 21, localId: 'pagina2a', title: 'Página 2a'},
                        {
                            id: 22,
                            localId: 'pagina2a',
                            title: 'Página 2a',
                            pages: [
                                {
                                    id: 11,
                                    localId: 'pagina2aa',
                                    title: 'Página 2aa'
                                },
                                {
                                    id: 12,
                                    localId: 'pagina2ab',
                                    title: 'Página 2ab'
                                },
                                {id: 13,
                                    localId: 'pagina2ac',
                                    title: 'Página 2ac'
                                }
                            ],
                            collapsed: true
                        },
                        {
                            id: 23,
                            localId: 'pagina2c',
                            title: 'Página 2c'
                        }
                    ]
                },
                {
                    id: 3,
                    localId: 'pagina3a',
                    title: 'Página 3'
                }
            ]
        }
    })
}

