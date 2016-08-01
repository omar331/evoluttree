var chai = require('chai');

var chaiImmutable = require('chai-immutable');
chai.use(chaiImmutable);

import * as productHelper  from '../../helper/productHelper'
import {  generateState } from './assets/generateState'

let { expect } = chai

const TEST_FIND_PAGE_KEYPATH_LOCAL_ID = 'pagina2a'
const TEST_FIND_PAGE_KEYPATH_EXPECTED = [ 'pages', 1, 'pages', 0 ]

const TEST_FIND_PAGE_LOCAL_ID = 'pagina1b'
const TEST_FIND_PAGE_TITLE = 'Página 1b'
const TEST_FIND_PAGE_ID = 12

describe('ProductHelper', () => {
    let state

    beforeEach( () => {
        state = generateState()
    })

    afterEach( () => {
    })

    describe('Find a certain page by its localId', () => {
        it('getting page keypath for page localId = ' + TEST_FIND_PAGE_KEYPATH_LOCAL_ID, () => {
            let pageKeyPath = productHelper.searchPageKeyPath(state.get('editing'), TEST_FIND_PAGE_KEYPATH_LOCAL_ID )
            expect( pageKeyPath )
                .that.is.an('array')
                .deep.equal( TEST_FIND_PAGE_KEYPATH_EXPECTED )
        })
    })


    describe('Find a certain page by its localId', () => {
        it('finding a page node by its localId ' + TEST_FIND_PAGE_LOCAL_ID, () => {
            let page = productHelper.getPageByLocalId(state, TEST_FIND_PAGE_LOCAL_ID )

            expect( page )
                .to.include.keys('title')

            expect( page.get('title') ).to.equal( TEST_FIND_PAGE_TITLE )
            expect( page.get('id') ).to.equal( TEST_FIND_PAGE_ID )
        })
    })


})

