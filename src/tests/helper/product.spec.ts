var chai = require('chai');

var chaiImmutable = require('chai-immutable');
chai.use(chaiImmutable);

import * as productHelper  from '../../helper/productHelper'
import {  generateState } from './assets/generateState'

import { QuickLevelMove } from '../../components/constants'

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

            let parentLocalId = productHelper.findParentPage(state, dataItem.refLocalId)

            expect(parentLocalId).to.equal(dataItem.parentLocalId)
        } )
    } )



    it('Append a page to a node as child', () => {
        // Future parent node. New page will be inserted as its child
        let parentNodeLocalId = 'pagina1b'

        // create a new page
        let pageToInsertLocalId = 'my_new_page'
        let newPageNode = productHelper.createPageNode(
            {
                localId: pageToInsertLocalId,
                title: pageToInsertLocalId
            }
        )

        // append the new page into the parent
        const newState = productHelper.addChildToPage(state, parentNodeLocalId, newPageNode)

        // checks if the new page was correctly placed
        let parentAfter = productHelper.findParentPage(newState, pageToInsertLocalId )
        expect(parentAfter).to.equal(parentNodeLocalId)
    })



    /*
         ---> QLM (Quick level move)
     */
    it('Quick Level Move (QLM)', () => {
        let data = [
            // {
            //     'refLocalId': 'pagina2ab',
            //     'direction': QuickLevelMove.DIRECTION_DOWN,
            //     'parentAfterMoveLocalId': 'pagina2aa',
            //     'predecessorAfterMoveLocalId': null
            // },
            {
                'refLocalId': 'pagina1b',
                'direction': QuickLevelMove.DIRECTION_UP,
                'parentAfterMoveLocalId': 'novoproduto',
                'predecessorAfterMoveLocalId': 'pagina1'
            },
        ];

        data.map( (dataItem) => {
            let {
                      direction, refLocalId,
                      predecessorAfterMoveLocalId,
                      parentAfterMoveLocalId
                } = dataItem

            // do the move
            const newState = productHelper.quickLevelMove(state, direction, refLocalId )

            let predecessorAfter = productHelper.findPagePredecessor(newState, refLocalId )
            expect(predecessorAfter).to.equal(predecessorAfterMoveLocalId)

            let parentAfter = productHelper.findParentPage(newState, refLocalId )
           expect(parentAfter).to.equal(parentAfterMoveLocalId)
        } )
    })

})

