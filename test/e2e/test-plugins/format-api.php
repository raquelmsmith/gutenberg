<?php
/**
 * Plugin Name: Gutenberg Test Format API
 * Plugin URI: https://github.com/WordPress/gutenberg
 * Author: Gutenberg Team
 *
 * @package gutenberg-test-format-api
 */
wp_enqueue_script(
	'gutenberg-test-format-api',
	plugins_url( 'format-api/index.js', __FILE__ ),
	array(
		'wp-blocks',
		'wp-components',
		'wp-element',
		'wp-editor',
		'wp-richText',
		'wp-i18n',
	),
	filemtime( plugin_dir_path( __FILE__ ) . 'format-api/index.js' ),
	true
);
