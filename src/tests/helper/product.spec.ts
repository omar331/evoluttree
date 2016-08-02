var chai = require('chai');

var chaiImmutable = require('chai-immutable');
chai.use(chaiImmutable);

import * as productHelper  from '../../helper/productHelper'
import {  generateState } from './assets/generateState'

let { expect } = chai

let data

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

    it('Gets page keypath for page localId = ' + TEST_FIND_PAGE_KEYPATH_LOCAL_ID, () => {
        let pageKeyPath = productHelper.searchPageKeyPath(state.get('editing'), TEST_FIND_PAGE_KEYPATH_LOCAL_ID )
        expect( pageKeyPath )
            .that.is.an('array')
            .deep.equal( TEST_FIND_PAGE_KEYPATH_EXPECTED )
    })



    it('Finds a page node by its localId = ' + TEST_FIND_PAGE_LOCAL_ID, () => {
        let page = productHelper.getPageByLocalId(state, TEST_FIND_PAGE_LOCAL_ID )

        expect( page )
            .to.include.keys('title')

        expect( page.get('title') ).to.equal( TEST_FIND_PAGE_TITLE )
        expect( page.get('id') ).to.equal( TEST_FIND_PAGE_ID )
    })





    /*
        ---> finds the page predecessor
     */
    it('Finds a page\' predecessor', () => {
        let data = [
            {'refLocalId': 'pagina2ac', 'predecessorLocalId': 'pagina2ab'},
            {'refLocalId': 'pagina1b', 'predecessorLocalId': 'pagina1a'},
            {'refLocalId': 'pagina1', 'predecessorLocalId': null},
        ];

        data.map( (dataItem) => {

            let predecessorLocalId = productHelper.findPagePredecessor(state, dataItem.refLocalId)

            expect(predecessorLocalId).to.equal(dataItem.predecessorLocalId)
        } )
    } )



    /*
        ---> finds the page's parent
     */
    it('Finds a page\'s parent', () => {
        let data = [
            {'refLocalId': 'pagina1', 'parentLocalId': 'novoproduto'},
            {'refLocalId': 'pagina2ac', 'parentLocalId': 'pagina2a'},
            {'refLocalId': 'pagina1b', 'parentLocalId': 'pagina1'},
        ];

        data.map( (dataItem) => {

            let parentLocalId = productHelper.findPageParent(state, dataItem.refLocalId)

            expect(parentLocalId).to.equal(dataItem.parentLocalId)
        } )
    } )


    
})

