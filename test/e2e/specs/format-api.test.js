/**
 * Internal dependencies
 */
import {
	clickBlockAppender,
	newPost,
} from '../support/utils';
import { activatePlugin, deactivatePlugin } from '../support/plugins';

describe( 'Using Format API', () => {
	beforeAll( async () => {
		await activatePlugin( 'gutenberg-test-format-api' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'gutenberg-test-format-api' );
	} );

	beforeEach( async () => {
		await newPost();
	} );

	it( 'Format toolbar is present in a paragraph block', async () => {
		await clickBlockAppender();
		await page.keyboard.type( 'First paragraph' );
		await page.mouse.move( 200, 300, { steps: 10 } );
		expect( await page.$( '.editor-format-toolbar' ) ).not.toBeNull();
	} );

	it( 'Clicking the control wraps the selected text properly with HTML code', async () => {
		await clickBlockAppender();
		await page.keyboard.type( 'First paragraph' );
		await page.click( '.wp-block-paragraph', { clickCount: 3 } );
		await page.mouse.move( 200, 300, { steps: 10 } );
		await page.click( '.dashicons-editor-bold' );
		const paragraphContent = await page.$eval( 'div[data-type="core/paragraph"] p', ( element ) => element.innerHTML );
		expect( paragraphContent ).toEqual( '<strong data-mce-selected=\"inline-boundary\">First paragraph</strong>' );
	} );
} );
