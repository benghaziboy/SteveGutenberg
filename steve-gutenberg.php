<?php
/**
 * Plugin Name: Steve Gutenberg Block
 * Description: All Gutenberg. All the time.
 * Author: Cammy (Very handsome)
 * Version 0.0.1
 *
 * package SteveGutenberg_Feature_Block
 */

defined('ABSPATH') || exit;

/**
 * editor assets
 * 
 * since @0.0.1
 */
function steve_enqueue_block_editor_assets() {
  wp_enqueue_script(
    'steve-block',
    plugin_dir_url( __FILE__ ) . 'js/block.build.js',
    array( 'wp-editor', 'wp-blocks', 'wp-i18n' ),
    filemtime( plugin_dir_path( __FILE__ ) . 'js/block.build.js' )
  );
}
add_action( 'enqueue_block_editor_assets', 'steve_enqueue_block_editor_assets' );

/**
 * frontend assets
 *
 * since @0.0.1
 */
function steve_enqueue_block_assets() {
  wp_enqueue_style(
    'steve-frontend',
    plugin_dir_url( __FILE__ ) . 'assets/css/steve.css',
    array( 'wp-blocks' ),
    filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/steve.css' )
  );
}
add_action( 'enqueue_block_assets', 'steve_enqueue_block_assets' );
