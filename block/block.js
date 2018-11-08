/* global _ window wp */

/**
 * Register BlockType
 */
(function (blocks, i18n, element) {
  const el = element.createElement;

  blocks.registerBlockType('steve-blocks/steve-block', {
    title: i18n.__('Steve'),
    icon: 'info',
    category: 'common',
    attributes: {
      titleOne: {
        type: 'array',
        source: 'children',
        selector: '.steveblocks-title-1',
      },
      mediaIDOne: {
        type: 'number',
      },
      mediaURLOne: {
        type: 'string',
        source: 'attribute',
        selector: '.steveblocks-feature-image-1 img',
        attribute: 'src',
      },
      alignment: {
        type: 'string',
        default: 'center',
      },
    },
    edit(props) {
      const { alignment, attributes, focus } = props;
      const focusedEditable = focus ? focus.editable || 'titleOne' : null;

      const onSelectImageOne = function (media) {
        return props.setAttributes({
          mediaURLOne: media.url,
          mediaIDOne: media.id,
        });
      };

      function onChangeAlignment(newAlignment) {
        props.setAttributes({ alignment: newAlignment });
      }

      const blockControls = el(
        wp.element.Fragment,
        null,
        el(
          wp.editor.BlockControls,
          null,
          el(
            wp.editor.AlignmentToolbar,
            {
              value: alignment,
              onChange: onChangeAlignment,
            },
          ),
        ),
      );

      const inspectorControls = !!focus && el(
        wp.editor.InspectorControls,
        { key: 'inspector' },
        el('div', { className: 'components-block-description' }, el('p', {}, i18n.__('Feature block options.'))),
        el('h3', {}, i18n.__('Layout')),
      );

      const imageBlock = el(
        'div',
        { className: `${props.className}` },
        el(
          'div',
          { className: 'steveblocks-block steveblocks-block-1' },
          el(
            'div',
            {
              className: attributes.mediaIDOne ? 'steveblocks-feature-image steveblocks-image-button image-active' : 'steveblocks-feature-image steveblocks-feature-image-1 image-inactive',
            },
            el(
              wp.editor.MediaUpload, {
                onSelect: onSelectImageOne,
                type: 'image',
                value: attributes.mediaIDOne,
                render(obj) {
                  return el(wp.components.Button, {
                    className: attributes.mediaIDOne ? 'image-button-1' : 'components-button button button-large button-one',
                    onClick: obj.open,
                  },
                  attributes.mediaIDOne ? el('img', { src: attributes.mediaURLOne }) : i18n.__('Upload Image'));
                },
              },
            ),
          ),
        ),
      );

      const textBlock = el(
        'div',
        {
          className: 'steveblocks-feature-content steveblocks-feature-content-1',
          style: { textAlign: alignment },
        },
        el(
          wp.editor.RichText,
          {
            tagName: 'h3',
            className: 'steveblocks-title-1',
            inline: true,
            placeholder: i18n.__('Say something nice about Steve Gutenberg...'),
            value: attributes.titleOne,
            onChange(newTitle) { props.setAttributes({ titleOne: newTitle }); },
            focus: focusedEditable === 'titleOne' ? focus : null,
            onFocus(_focus) {
              props.setFocus(_.extend({}, _focus, { editable: 'titleOne' }));
            },
          },
        ),
      );

      return [
        blockControls,
        inspectorControls,
        imageBlock,
        textBlock,
      ];
    },

    save(props) {
      const { attributes } = props;

      return (
        el(
          'div',
          { className: `${props.className}` },
          attributes.mediaURLOne && el(
            'div',
            { className: 'steveblocks-feature-image steveblocks-feature-image-1', style: {} },
            el('img', { src: attributes.mediaURLOne }),
          ),
          el(
            'div',
            {
              className: 'steveblocks-feature-content steveblocks-feature-content-1',
              style: { textAlign: attributes.alignment },
            },
            el('h3', { className: 'steveblocks-title-1' }, attributes.titleOne),
          ),
        )
      );
    },
  });
}(
  window.wp.blocks,
  window.wp.i18n,
  window.wp.element,
));
