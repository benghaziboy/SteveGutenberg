/* global _ window */

/**
 * Register BlockType
 */
(function (editor, blocks, components, i18n) {
  const {
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    MediaUpload,
    RichText,
  } = editor;

  const { Button } = components;

  blocks.registerBlockType('steve-blocks/steve-block', {
    title: i18n.__('Steve'),
    icon: 'info',
    category: 'common',
    attributes: {
      alignment: {
        type: 'string',
        default: 'center',
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
      title: {
        type: 'array',
        source: 'children',
        selector: '.steveblocks-title-1',
      },
    },

    edit(props) {
      const {
        alignment, attributes, className, focus,
      } = props;
      const focusedEditable = focus ? focus.editable || 'title' : null;

      const onChangeAlignment = (newAlignment) => {
        props.setAttributes({ alignment: newAlignment });
      };

      const onChangeTitle = (newTitle) => {
        props.setAttributes({ title: newTitle });
      };

      const onFocusTitle = (_focus) => {
        props.setFocus(_.extend({}, _focus, { editable: 'title' }));
      };

      const onSelectImageOne = image => props.setAttributes({
        mediaURLOne: image.url,
        mediaIDOne: image.id,
      });

      const blockControls = (
        <BlockControls>
          <AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
        </BlockControls>
      );

      const inspectorControls = (
        <InspectorControls key="inspector">
          <div className="componenets-block-description">
            <p>{i18n.__('Feature block options.')}</p>
          </div>
          <h3>{i18n.__('Layout')}</h3>
        </InspectorControls>
      );

      const imageClassName = attributes.mediaIDOne ? 'steveblocks-feature-image steveblocks-image-button image-active' : 'steveblocks-feature-image steveblocks-feature-image-1 image-inactive';
      const uploadButtonClassName = attributes.mediaIDOne ? 'image-button-1' : 'components-button button button-large button-one';
      const imageBlock = (
        <div className={className}>
          <div className="steveblocks-block steveblocks-block-1">
            <div className={imageClassName}>
              <MediaUpload
                onSelect={onSelectImageOne}
                type="image"
                value={attributes.mediaIDOne}
                render={({ open }) => (
                  <Button className={uploadButtonClassName} onClick={open}>
                    {(attributes.mediaIDOne)
                      ? <img src={attributes.mediaURLOne} alt="" />
                      : 'Upload Image'
                    }
                  </Button>
                )}
              />
            </div>
          </div>
        </div>
      );

      const textBlock = (
        <div className="steveblocks-feature-content steveblocks-feature-content-1">
          <RichText
            tagName="h3"
            className="steveblocks-title-1"
            inline
            placeholder={i18n.__('Say something nice about Steve Gutenberg...')}
            value={attributes.title}
            onChange={onChangeTitle}
            focus={focusedEditable === 'title' ? focus : null}
            onFocus={onFocusTitle}
          />
        </div>
      );

      return [blockControls, inspectorControls, imageBlock, textBlock];
    },

    save(props) {
      const { attributes } = props;

      const imageBlock = (
        attributes.mediaURLOne ? (
          <div className="steveblocks-feature-image steveblocks-feature-image-1">
            <img src={attributes.mediaURLOne} alt="" />
          </div>
        ) : null
      );

      const textBlock = (
        <div className="steveblocks-feature-content steveblocks-feature-content-1">
          <h3 className="steveblocks-title-1">{attributes.title}</h3>
        </div>
      );

      return (
        <div>
          {imageBlock}
          {textBlock}
        </div>
      );
    },
  });
}(
  window.wp.editor,
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
));
