/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { cleanForSlug } from '../../utils/url';

class PostPermalinkEditor extends Component {
	constructor( { permalinkParts, postTitle } ) {
		super( ...arguments );

		this.state = {
			editedPostName: permalinkParts.postName,
			postTitle,
		};

		this.onSavePermalink = this.onSavePermalink.bind( this );
	}

	onSavePermalink( event ) {
		const postName = cleanForSlug( this.state.editedPostName );
		const generatedSlug = postName || cleanForSlug( this.state.postTitle );

		event.preventDefault();

		this.props.onSave();

		if ( postName === this.props.postName ) {
			return;
		}

		this.props.editPost( {
			slug: postName,
			generated_slug: generatedSlug,
		} );

		this.setState( {
			editedPostName: postName,
		} );
	}

	render() {
		const { prefix, suffix } = this.props.permalinkParts;
		const { editedPostName } = this.state;

		/* eslint-disable jsx-a11y/no-autofocus */
		// Autofocus is allowed here, as this mini-UI is only loaded when the user clicks to open it.
		return (
			<form
				className="editor-post-permalink-editor"
				onSubmit={ this.onSavePermalink }
			>
				<span className="editor-post-permalink__editor-container">
					<span className="editor-post-permalink-editor__prefix">
						{ prefix }
					</span>
					<input
						className="editor-post-permalink-editor__edit"
						aria-label={ __( 'Edit post permalink' ) }
						value={ editedPostName }
						onChange={ ( event ) => this.setState( { editedPostName: event.target.value } ) }
						type="text"
						autoFocus
					/>
					<span className="editor-post-permalink-editor__suffix">
						{ suffix }
					</span>
					&lrm;
				</span>
				<Button
					className="editor-post-permalink-editor__save"
					isLarge
					onClick={ this.onSavePermalink }
				>
					{ __( 'Save' ) }
				</Button>
			</form>
		);
		/* eslint-enable jsx-a11y/no-autofocus */
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getPermalinkParts, getEditedPostAttribute } = select( 'core/editor' );
		return {
			permalinkParts: getPermalinkParts(),
			postTitle: getEditedPostAttribute( 'title' ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost } = dispatch( 'core/editor' );
		return { editPost };
	} ),
] )( PostPermalinkEditor );

